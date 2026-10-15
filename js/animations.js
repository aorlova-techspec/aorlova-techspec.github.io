/* Анимации: hero, reveal, счётчики, tilt, магнит, SVG-схемы с пакетами данных */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  var hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ---------------- Typing-эффект в hero ---------------- */
  var ROLE = 'AI Automation / Integration Expert';
  var typedEl = document.getElementById('typed-role');

  function initTyping() {
    if (!typedEl) return;
    if (reduced) { typedEl.textContent = ROLE; return; }
    var i = 0;
    typedEl.textContent = '';
    setTimeout(function tick() {
      typedEl.textContent = ROLE.slice(0, ++i);
      if (i < ROLE.length) setTimeout(tick, 42);
    }, 650);
  }

  /* ---------------- Счётчики ---------------- */
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count-to'), 10) || 0;
    if (reduced) { el.textContent = String(target); return; }
    var dur = 1200, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = String(Math.round(easeOutCubic(p) * target));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll('.js-count');
    if (!('IntersectionObserver' in window) || reduced) {
      counters.forEach(function (el) { el.textContent = el.getAttribute('data-count-to'); });
      return;
    }
    counters.forEach(function (el) { el.textContent = '0'; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          animateCounter(en.target);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Терминал: появление строк ---------------- */
  function initTerminal() {
    var term = document.querySelector('.terminal');
    if (!term) return;
    if (reduced || !('IntersectionObserver' in window)) { term.classList.add('is-shown'); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { term.classList.add('is-shown'); io.disconnect(); }
      });
    }, { threshold: 0.35 });
    io.observe(term);
  }

  /* ---------------- SVG-схемы: отрисовка + пакеты данных ---------------- */
  var schemes = [];

  function flashNode(node) {
    if (!node || !hasGsap || reduced) return;
    var rect = node.querySelector('rect');
    if (!rect) return;
    var isHl = node.classList.contains('scheme-node-hl');
    var endStroke = isHl ? 'rgba(0, 224, 198, .55)' : '#1F2A3D';
    gsap.fromTo(rect,
      { stroke: '#00E0C6', strokeWidth: 2.4 },
      {
        stroke: endStroke, strokeWidth: 1, duration: 1, ease: 'power2.out',
        onComplete: function () { gsap.set(rect, { clearProps: 'stroke,strokeWidth' }); }
      });
  }

  function initSchemes() {
    var svgList = document.querySelectorAll('.scheme');
    if (!svgList.length) return;

    var SVG_NS = 'http://www.w3.org/2000/svg';

    svgList.forEach(function (svg) {
      var lines = Array.prototype.slice.call(svg.querySelectorAll('.scheme-line'));
      var nodes = Array.prototype.slice.call(svg.querySelectorAll('.scheme-node'));
      if (!lines.length) return;

      lines.forEach(function (l) {
        var len = l.getTotalLength();
        l.__len = len;
        l.style.strokeDasharray = len + ' ' + len;
        l.style.strokeDashoffset = (reduced || !hasGsap) ? 0 : len;
      });

      var packets = [];
      if (!reduced) {
        packets = lines.map(function () {
          var c = document.createElementNS(SVG_NS, 'circle');
          c.setAttribute('r', '3.6');
          c.setAttribute('class', 'scheme-packet');
          c.style.opacity = '0';
          svg.appendChild(c);
          return c;
        });
      }

      var scheme = {
        svg: svg,
        lines: lines,
        nodes: nodes,
        packets: packets,
        prog: lines.map(function (_, i) { return i / lines.length; }),
        visible: false,
        inited: false
      };
      schemes.push(scheme);

      if (hasGsap && !reduced) {
        var card = svg.closest('.card') || svg;
        gsap.to(lines, {
          strokeDashoffset: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: card, start: 'top 82%', once: true }
        });
        gsap.from(nodes, {
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card, start: 'top 82%', once: true,
            onEnter: function () {
              nodes.forEach(function (n, i) {
                setTimeout(function () { flashNode(n); }, 400 + i * 260);
              });
            }
          }
        });
      }
    });

    if (reduced || !packetsRunning()) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var s = schemes.find(function (x) { return x.svg === en.target; });
          if (s) s.visible = en.isIntersecting;
        });
      }, { threshold: 0.15 });
      schemes.forEach(function (s) { io.observe(s.svg); });
    } else {
      schemes.forEach(function (s) { s.visible = true; });
    }

    var lastTs = 0;
    function tick(ts) {
      var dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 0.016;
      lastTs = ts;
      schemes.forEach(function (s) {
        if (!s.visible) return;
        s.lines.forEach(function (l, i) {
          var packet = s.packets[i];
          if (!packet) return;
          var dur = Math.max(0.5, l.__len / 150);
          s.prog[i] += dt / dur;
          if (s.prog[i] >= 1) {
            s.prog[i] -= 1;
            flashNode(s.nodes[Math.min(i + 1, s.nodes.length - 1)]);
          }
          var pt = l.getPointAtLength(s.prog[i] * l.__len);
          packet.setAttribute('cx', pt.x);
          packet.setAttribute('cy', pt.y);
          packet.style.opacity = '1';
        });
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    function packetsRunning() {
      return schemes.some(function (s) { return s.packets.length > 0; });
    }
  }

  /* ---------------- GSAP-сцены ---------------- */
  function initGsapScenes() {
    if (!hasGsap || reduced) return;

    /* Hero: заголовок и подзаголовки — только сдвиг (мгновенно видимы для LCP).
       fromTo с явными конечными значениями: CSS держит начальное состояние. */
    gsap.fromTo('[data-hero-el]',
      { y: 30 },
      { y: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out' });

    /* Hero: остальные элементы — fade + сдвиг */
    gsap.fromTo('[data-hero-fade]',
      { y: 18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.18 });

    /* Появление секций: fromTo с явными конечными значениями — ScrollTrigger.refresh()
       не может «перехватить» y=40 как конечное (иначе карточки застряли бы ниже).
       У .project-card есть CSS transition: transform — сдвиг в reveal с ней конфликтует,
       поэтому сетка проектов появляется только по прозрачности (ряд всегда ровный). */
    document.querySelectorAll('[data-reveal-stagger]').forEach(function (box) {
      var fadeOnly = box.classList.contains('projects-grid');
      gsap.fromTo(box.children,
        fadeOnly ? { autoAlpha: 0 } : { y: 40, autoAlpha: 0 },
        fadeOnly ? {
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: box, start: 'top 86%', once: true }
        } : {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: box, start: 'top 86%', once: true }
        });
    });

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      gsap.fromTo(el,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        });
    });

    /* Отрисовка галочек в benefits */
    document.querySelectorAll('.draw-path').forEach(function (p) {
      var len;
      try { len = p.getTotalLength(); } catch (e) { return; }
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(p, {
        strokeDashoffset: 0,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: { trigger: p.closest('.benefit') || p, start: 'top 92%', once: true }
      });
    });
  }

  /* ---------------- 3D-tilt карточек ---------------- */
  function initTilt() {
    if (coarse || reduced) return;
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      var maxX = 6, maxY = 6;
      if (hasGsap) {
        gsap.set(el, { transformPerspective: 700 });
        var qx = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power2.out' });
        var qy = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power2.out' });
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width;
          var py = (e.clientY - r.top) / r.height;
          qx((px - 0.5) * 2 * maxY * -1);
          qy((py - 0.5) * 2 * maxX);
          el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        });
        el.addEventListener('pointerleave', function () {
          qx(0);
          qy(0);
        });
      } else {
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width;
          var py = (e.clientY - r.top) / r.height;
          el.style.transform = 'rotateY(' + ((px - 0.5) * 2 * -maxY) + 'deg) rotateX(' + ((py - 0.5) * 2 * maxX) + 'deg)';
          el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        });
        el.addEventListener('pointerleave', function () { el.style.transform = ''; });
      }
    });
  }

  /* ---------------- Магнитные кнопки ---------------- */
  function initMagnetic() {
    if (coarse || reduced || !hasGsap) return;
    document.querySelectorAll('.js-magnetic').forEach(function (btn) {
      var strength = 0.32;
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        gsap.to(btn, { x: dx * strength, y: dy * strength, duration: 0.4, ease: 'power2.out' });
      });
      btn.addEventListener('pointerleave', function () {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  /* ---------------- Запуск ---------------- */
  function boot() {
    if (!hasGsap) document.documentElement.classList.remove('js');
    initTyping();
    initCounters();
    initTerminal();
    initSchemes();
    initGsapScenes();
    initTilt();
    initMagnetic();
    if (hasGsap && !reduced) ScrollTrigger.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
