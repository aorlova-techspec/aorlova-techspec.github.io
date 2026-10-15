/* Интернационализация: RU / EN */
(function () {
  'use strict';

  var RU = {
    'logo.aria': 'Алена Орлова — наверх',
    'logo.name': 'Алена Орлова',
    'nav.aria': 'Основная навигация',
    'nav.services': 'Что я делаю',
    'nav.cases': 'Кейсы',
    'nav.about': 'Обо мне',
    'nav.stack': 'Стек',
    'nav.contact': 'Контакты',
    'burger.aria': 'Открыть меню',
    'scroll.aria': 'Прокрутить вниз',

    'cta.short': 'Обсудить задачу',
    'cta.main': 'Обсудить задачу',
    'cta.main2': 'Обсудить проект',

    'hero.eyebrow': 'AI Automation / n8n / CRM / Integrations',
    'hero.title': 'АЛЕНА ОРЛОВА',
    'hero.sub1': 'Автоматизирую бизнес-процессы с помощью AI, n8n, CRM и интеграций.',
    'hero.sub2': 'Связываю сервисы, создаю AI-ассистентов и превращаю ручные процессы в работающие автоматизированные системы.',
    'hero.secondary': 'Смотреть кейсы',
    'hero.badge': 'лет в IT',
    'hero.scroll': 'SCROLL',

    'services.title': 'Что я делаю',
    'services.s1.title': 'AI-ассистенты и AI-автоматизация',
    'services.s1.text': 'Создаю AI-ассистентов для бизнеса: ответы по базе знаний, квалификация лидов, сбор данных, передача заявок менеджеру, интеграция с CRM и другими сервисами.',
    'services.s2.title': 'n8n и интеграции',
    'services.s2.text': 'Настраиваю автоматические сценарии и связываю между собой CRM, формы, мессенджеры, AI, таблицы, базы данных и внешние API.',
    'services.s3.title': 'amoCRM / Kommo',
    'services.s3.text': 'Настраиваю воронки, автоматизации, роботов, поля, интеграции, webhooks, маршрутизацию заявок и бизнес-процессы.',
    'services.s4.title': 'Автоматизация бизнес-процессов',
    'services.s4.text': 'Разбираю текущий процесс, нахожу ручные и слабые места и проектирую более удобную автоматизированную схему работы.',

    'benefits.title': 'Чем я могу быть полезна',
    'benefits.b1': 'убрать ручную работу и повторяющиеся действия;',
    'benefits.b2': 'ускорить обработку заявок;',
    'benefits.b3': 'снизить риск потери клиентов;',
    'benefits.b4': 'связать разрозненные сервисы в единую систему;',
    'benefits.b5': 'внедрить AI-ассистента в поддержку или продажи;',
    'benefits.b6': 'автоматизировать работу CRM;',
    'benefits.b7': 'настроить передачу данных через API и webhooks;',
    'benefits.b8': 'собрать рабочий MVP или внутренний сервис с помощью AI-assisted development.',

    'trust.title': 'Почему мне можно доверять',
    'trust.stat1': 'лет в IT',
    'trust.stat2': 'лет Oracle DBA',
    'trust.stat3': 'кейсов в портфолио',
    'trust.t1': 'Более 25 лет в IT.',
    'trust.t2': 'Более 15 лет работала Oracle DBA, поэтому хорошо понимаю данные, структуру систем, надежность и интеграционную логику.',
    'trust.t3': 'Большой практический опыт с amoCRM, GetCourse, ботами, webhooks и автоматизацией.',
    'trust.t4': 'Умею смотреть на задачу не как на отдельный сервис, а как на весь процесс: заявка → CRM → коммуникация → продажа → оплата → сопровождение → аналитика.',
    'trust.t5': 'Самостоятельно разбираюсь в новых инструментах, тестирую решения и довожу их до рабочего результата.',

    'cases.title': 'Кейсы',
    'case1.title': 'AI-ассистент для бизнеса',
    'case1.desc': 'AI-ассистент отвечает на частые вопросы по базе знаний, собирает данные клиента, квалифицирует обращение и передает заявку менеджеру.',
    'case1.n1': 'База знаний',
    'case1.n3': 'Квалификация',
    'case1.n4': 'Менеджер',
    'case1.aria': 'Схема: база знаний → AI → квалификация → менеджер',

    'case2.title': 'Интеграция Tilda → GetCourse → Vakas Tools → amoCRM',
    'case2.desc': 'Автоматическая передача регистраций и заказов между сервисами с маршрутизацией данных в нужную воронку CRM.',
    'case2.aria': 'Схема интеграции: Tilda → GetCourse → Vakas Tools → amoCRM',

    'case3.title': 'amoCRM / Kommo',
    'case3.desc': 'Настройка CRM-процессов, автоматизаций, роботов, виджетов, распределения заявок и интеграций с внешними сервисами.',
    'case3.n1': 'Заявка',
    'case3.n2': 'Роботы',
    'case3.n3': 'Воронка',
    'case3.n4': 'Менеджер',
    'case3.aria': 'Схема: заявка → роботы → воронка → менеджер',

    'case4.title': 'n8n Automation',
    'case4.desc': 'Автоматические сценарии обработки заявок, передачи данных, уведомлений, AI-обработки и работы с внешними API.',
    'case4.n1': 'Триггер',
    'case4.n3': 'Уведомления',
    'case4.aria': 'Схема: триггер → n8n → API, уведомления, AI',

    'case5.title': 'Vibe Coding / AI-assisted development',
    'case5.desc': 'Разработка небольших веб-приложений, трекеров, калькуляторов, лендингов и MVP с помощью AI-инструментов.',
    'case5.n1': 'Идея',
    'case5.n2': 'AI-код',
    'case5.aria': 'Схема: идея → AI-код → MVP',

    'about.title': 'Обо мне',
    'about.p1': 'Я инженер-системотехник с более чем 25-летним опытом в IT.',
    'about.p2': 'Раньше много лет работала с базами данных и корпоративными системами, позже — с CRM, онлайн-сервисами, интеграцияями и автоматизацией.',
    'about.quote': 'Сейчас мой основной вектор — AI Automation, AI Agents, n8n, API-интеграции и AI-assisted development.',
    'about.p3': 'При этом мой опыт amoCRM, GetCourse и бизнес-процессов помогает мне создавать решения, которые работают не только технически, но и полезны бизнесу.',

    'stack.title': 'Основной стек',
    'projects.title': 'Проекты и ссылки',

    'contact.title': 'Есть ручной процесс, который хочется автоматизировать?',
    'contact.text': 'Опишите задачу — разберу текущую схему и предложу, как можно сократить ручную работу, связать сервисы или внедрить AI.',
    'contact.note': 'Ответ в Telegram в течение рабочего дня',

    'footer.copy': 'Алена Орлова · AI Automation / Integration Expert',

    meta_title: 'Алена Орлова — AI Automation / Integration Expert | Автоматизация бизнес-процессов',
    meta_desc: 'Автоматизирую бизнес-процессы с помощью AI, n8n, CRM и интеграций. AI-ассистенты, amoCRM/Kommo, webhooks, API. Более 25 лет в IT.'
  };

  var EN = {
    'logo.aria': 'Alena Orlova — to top',
    'logo.name': 'Alena Orlova',
    'nav.aria': 'Main navigation',
    'nav.services': 'What I do',
    'nav.cases': 'Cases',
    'nav.about': 'About',
    'nav.stack': 'Stack',
    'nav.contact': 'Contact',
    'burger.aria': 'Open menu',
    'scroll.aria': 'Scroll down',

    'cta.short': 'Discuss a task',
    'cta.main': 'Discuss a task',
    'cta.main2': 'Discuss a project',

    'hero.eyebrow': 'AI Automation / n8n / CRM / Integrations',
    'hero.title': 'ALENA ORLOVA',
    'hero.sub1': 'I automate business processes with AI, n8n, CRM and integrations.',
    'hero.sub2': 'I connect services, build AI assistants and turn manual processes into working automated systems.',
    'hero.secondary': 'View cases',
    'hero.badge': 'years in IT',
    'hero.scroll': 'SCROLL',

    'services.title': 'What I do',
    'services.s1.title': 'AI assistants & AI automation',
    'services.s1.text': 'I build AI assistants for business: answers from a knowledge base, lead qualification, data collection, passing requests to a manager, integration with CRM and other services.',
    'services.s2.title': 'n8n & integrations',
    'services.s2.text': 'I set up automated scenarios and connect CRM, forms, messengers, AI, tables, databases and external APIs.',
    'services.s3.title': 'amoCRM / Kommo',
    'services.s3.text': 'I configure pipelines, automations, robots, fields, integrations, webhooks, lead routing and business processes.',
    'services.s4.title': 'Business process automation',
    'services.s4.text': 'I map the current process, find manual and weak spots and design a cleaner automated workflow.',

    'benefits.title': 'How I can help',
    'benefits.b1': 'remove manual and repetitive work;',
    'benefits.b2': 'speed up request processing;',
    'benefits.b3': 'reduce the risk of losing clients;',
    'benefits.b4': 'connect scattered services into a single system;',
    'benefits.b5': 'deploy an AI assistant in support or sales;',
    'benefits.b6': 'automate CRM operations;',
    'benefits.b7': 'set up data transfer via API and webhooks;',
    'benefits.b8': 'build a working MVP or internal service with AI-assisted development.',

    'trust.title': 'Why you can trust me',
    'trust.stat1': 'years in IT',
    'trust.stat2': 'years as Oracle DBA',
    'trust.stat3': 'cases in portfolio',
    'trust.t1': 'More than 25 years in IT.',
    'trust.t2': 'Over 15 years as an Oracle DBA, so I deeply understand data, system structure, reliability and integration logic.',
    'trust.t3': 'Hands-on experience with amoCRM, GetCourse, bots, webhooks and automation.',
    'trust.t4': 'I look at a task not as a separate service, but as a whole process: request → CRM → communication → sale → payment → support → analytics.',
    'trust.t5': 'I learn new tools independently, test solutions and see them through to a working result.',

    'cases.title': 'Cases',
    'case1.title': 'AI assistant for business',
    'case1.desc': 'The AI assistant answers frequent questions from the knowledge base, collects client data, qualifies the inquiry and passes the request to a manager.',
    'case1.n1': 'Knowledge base',
    'case1.n3': 'Qualification',
    'case1.n4': 'Manager',
    'case1.aria': 'Scheme: knowledge base → AI → qualification → manager',

    'case2.title': 'Integration: Tilda → GetCourse → Vakas Tools → amoCRM',
    'case2.desc': 'Automatic transfer of registrations and orders between services with data routed to the right CRM pipeline.',
    'case2.aria': 'Integration scheme: Tilda → GetCourse → Vakas Tools → amoCRM',

    'case3.title': 'amoCRM / Kommo',
    'case3.desc': 'Setup of CRM processes, automations, robots, widgets, lead distribution and integrations with external services.',
    'case3.n1': 'Lead',
    'case3.n2': 'Robots',
    'case3.n3': 'Pipeline',
    'case3.n4': 'Manager',
    'case3.aria': 'Scheme: lead → robots → pipeline → manager',

    'case4.title': 'n8n Automation',
    'case4.desc': 'Automated scenarios for request processing, data transfer, notifications, AI processing and external API work.',
    'case4.n1': 'Trigger',
    'case4.n3': 'Notifications',
    'case4.aria': 'Scheme: trigger → n8n → API, notifications, AI',

    'case5.title': 'Vibe Coding / AI-assisted development',
    'case5.desc': 'Development of small web apps, trackers, calculators, landing pages and MVPs using AI tools.',
    'case5.n1': 'Idea',
    'case5.n2': 'AI code',
    'case5.aria': 'Scheme: idea → AI code → MVP',

    'about.title': 'About me',
    'about.p1': 'I am a systems engineer with more than 25 years of IT experience.',
    'about.p2': 'For many years I worked with databases and enterprise systems, and later — with CRMs, online services, integrations and automation.',
    'about.quote': 'Today my main focus is AI Automation, AI Agents, n8n, API integrations and AI-assisted development.',
    'about.p3': 'At the same time, my experience with amoCRM, GetCourse and business processes helps me create solutions that work not only technically, but are genuinely useful for business.',

    'stack.title': 'Core stack',
    'projects.title': 'Projects & links',

    'contact.title': 'Got a manual process you would like to automate?',
    'contact.text': 'Describe your task — I will map the current scheme and suggest how to cut manual work, connect services or introduce AI.',
    'contact.note': 'Reply on Telegram within a business day',

    'footer.copy': 'Alena Orlova · AI Automation / Integration Expert',

    meta_title: 'Alena Orlova — AI Automation / Integration Expert | Business Process Automation',
    meta_desc: 'I automate business processes with AI, n8n, CRM and integrations. AI assistants, amoCRM/Kommo, webhooks, API. 25+ years in IT.'
  };

  var I18N = { ru: RU, en: EN };

  function applyLang(lang) {
    if (!I18N[lang]) lang = 'ru';
    var dict = I18N[lang];

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
    });

    document.documentElement.setAttribute('lang', lang);
    if (dict.meta_title) document.title = dict.meta_title;
    var md = document.querySelector('meta[name="description"]');
    if (md && dict.meta_desc) md.setAttribute('content', dict.meta_desc);

    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-lang') === lang);
    });

    try { localStorage.setItem('site-lang', lang); } catch (e) {}
    window.__lang = lang;
  }

  window.I18N = I18N;
  window.applyLang = applyLang;

  var saved = 'ru';
  try { saved = localStorage.getItem('site-lang') || 'ru'; } catch (e) {}

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { applyLang(saved); });
  } else {
    applyLang(saved);
  }
})();
