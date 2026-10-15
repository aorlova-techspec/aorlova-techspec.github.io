/* Движущаяся сетка — фоновая подложка на canvas */
(function () {
  'use strict';

  var canvas = document.getElementById('grid-bg');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobile = window.matchMedia('(max-width: 768px)').matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;
  var STEP = mobile ? 96 : 64;
  var GLOW_RADIUS = 190;
  var MAX_SCROLL_PARALLAX = 40000;

  var mouse = { x: -9999, y: -9999, active: false };
  var scrollY = 0;
  var rafId = null;
  var lastDraw = 0;
  var autoStarted = false;

  var COLOR_A = { r: 0, g: 224, b: 198 };   /* teal */
  var COLOR_B = { r: 79, g: 124, b: 255 };  /* blue */

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rgba(c, a) {
    return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + a.toFixed(3) + ')';
  }

  function draw(t) {
    var time = t * 0.001;
    ctx.clearRect(0, 0, W, H);

    /* параллакс: сетка отстаёт от скролла, зациклено по шагу */
    var par = (scrollY * 0.15);
    var offY = -(par % STEP);
    var worldOff = par;

    var cols = Math.ceil(W / STEP) + 2;
    var rows = Math.ceil(H / STEP) + 2;

    var glowOn = !mobile && mouse.active && !reduced;

    /* --- линии --- */
    for (var i = -1; i < cols; i++) {
      var x = i * STEP;
      var phase = i * 0.7;
      var wave = 0.5 + 0.5 * Math.sin(phase + time * 0.7);
      var base = 0.035 + wave * 0.035;
      var glowV = 0;
      if (glowOn) glowV = Math.max(0, 1 - Math.abs(x - mouse.x) / GLOW_RADIUS);

      var y0 = offY - STEP, y1 = H - offY + STEP;
      var alphaV = Math.min(0.5, base + glowV * 0.32);
      if (alphaV < 0.02) continue;

      var col = (i % 2 === 0) ? COLOR_A : COLOR_B;
      if (glowOn) {
        /* вертикальный градиент — только при активном свечении курсора */
        var grad = ctx.createLinearGradient(x, y0, x, y1);
        grad.addColorStop(0, rgba(col, base + glowV * 0.1));
        grad.addColorStop(0.5, rgba(col, alphaV));
        grad.addColorStop(1, rgba(col, base + glowV * 0.1));
        ctx.strokeStyle = grad;
      } else {
        ctx.strokeStyle = rgba(col, alphaV);
      }
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y0);
      ctx.lineTo(x, y1);
      ctx.stroke();
    }

    for (var j = -1; j < rows; j++) {
      var y2 = j * STEP + offY;
      var phase2 = j * 0.9 + 2;
      var wave2 = 0.5 + 0.5 * Math.sin(phase2 + time * 0.55);
      var base2 = 0.035 + wave2 * 0.035;
      var glowH = 0;
      if (glowOn) glowH = Math.max(0, 1 - Math.abs(y2 - mouse.y) / GLOW_RADIUS);
      if (base2 + glowH * 0.28 < 0.02) continue;

      var colH = (j % 2 === 0) ? COLOR_B : COLOR_A;
      ctx.strokeStyle = rgba(colH, Math.min(0.5, base2 + glowH * 0.32));
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-STEP, y2);
      ctx.lineTo(W + STEP, y2);
      ctx.stroke();
    }

    /* --- узлы на пересечениях --- */
    var nodeR = mobile ? 1.4 : 1.8;
    for (var ni = -1; ni < cols; ni++) {
      var nx = ni * STEP;
      for (var nj = -1; nj < rows; nj++) {
        var ny = nj * STEP + offY;
        if (ny < -STEP || ny > H + STEP) continue;

        /* дрейф узла */
        var worldY = ny + worldOff;
        var dx = Math.sin(time * 0.6 + ni * 1.3 + nj * 0.8) * 4;
        var dy = Math.cos(time * 0.5 + ni * 0.9 + nj * 1.7) * 4;
        var px = nx + dx, py = ny + dy;

        var pulse = 0.5 + 0.5 * Math.sin(time * 1.6 + ni * 2.1 + nj * 1.4 + worldY * 0.002);
        var a = 0.10 + pulse * 0.16;

        if (glowOn) {
          var dg = Math.sqrt((px - mouse.x) * (px - mouse.x) + (py - mouse.y) * (py - mouse.y));
          if (dg < GLOW_RADIUS) {
            var k = 1 - dg / GLOW_RADIUS;
            a += k * k * 0.75;
            if (k > 0.55) {
              ctx.beginPath();
              ctx.fillStyle = rgba(COLOR_A, k * 0.08);
              ctx.arc(px, py, 14 * k, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        if (a < 0.03) continue;
        var colN = ((ni + nj) % 2 === 0) ? COLOR_A : COLOR_B;
        ctx.fillStyle = rgba(colN, Math.min(a, 0.85));
        ctx.beginPath();
        ctx.arc(px, py, nodeR + (a > 0.5 ? 0.7 : 0), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* мягкий виньеточный градиент поверх — глубина */
    var vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.25, W / 2, H / 2, Math.max(W, H) * 0.75);
    vg.addColorStop(0, 'rgba(10,15,28,0)');
    vg.addColorStop(1, 'rgba(10,15,28,0.55)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);
  }

  function loop(t) {
    if (document.hidden) { rafId = null; return; }
    /* кап ~30fps — вдвое меньше работы главного потока, глазом не отличить */
    if (t - lastDraw >= 33) {
      draw(t);
      lastDraw = t;
    }
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (reduced) { draw(0); return; }
    if (rafId === null) rafId = requestAnimationFrame(loop);
  }

  function stop() {
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
  }

  window.addEventListener('resize', function () {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    mobile = window.matchMedia('(max-width: 768px)').matches;
    STEP = mobile ? 96 : 64;
    resize();
    if (reduced) draw(0);
  }, { passive: true });

  window.addEventListener('scroll', function () {
    scrollY = Math.min(window.scrollY || 0, MAX_SCROLL_PARALLAX);
  }, { passive: true });

  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('pointerleave', function () { mouse.active = false; });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else if (autoStarted) start();
  });

  resize();
  scrollY = window.scrollY || 0;
  draw(0); /* статичный первый кадр — сразу, без нагрузки на critical path */

  if (!reduced) {
    /* анимация стартует после полной загрузки страницы */
    var kick = function () {
      if (autoStarted) return;
      autoStarted = true;
      start();
    };
    if (document.readyState === 'complete') setTimeout(kick, 150);
    else window.addEventListener('load', function () { setTimeout(kick, 150); });
  }
})();
