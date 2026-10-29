(() => {
  'use strict';

  const news = document.querySelector('.news-list');
  const newsToggle = document.querySelector('.news-toggle');
  if (news && newsToggle) {
    news.querySelectorAll('li').forEach(item => {
      const date = item.querySelector('em');
      if (!date) return;
      date.remove();
      if (item.firstChild && item.firstChild.nodeType === Node.TEXT_NODE) {
        item.firstChild.textContent = item.firstChild.textContent.replace(/^\s*:\s*/, '');
      }
      const copy = document.createElement('span');
      while (item.firstChild) copy.append(item.firstChild);
      item.append(date, copy);
    });
    news.classList.add('is-enhanced', 'is-collapsed');
    newsToggle.hidden = news.querySelectorAll('li').length <= 5;
    newsToggle.addEventListener('click', () => {
      const collapsed = news.classList.toggle('is-collapsed');
      newsToggle.setAttribute('aria-expanded', String(!collapsed));
      newsToggle.textContent = collapsed ? 'Show all updates ↓' : 'Show latest updates ↑';
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const previews = [...document.querySelectorAll('video[data-preview]')];
  const states = new WeakMap();
  const pauseAutomatically = video => {
    const state = states.get(video);
    if (!video.paused) { state.automaticPause = true; video.pause(); }
  };
  const loadVideo = video => {
    if (!video.hasAttribute('src')) { video.src = video.dataset.preview; video.load(); }
  };
  previews.forEach(video => {
    states.set(video, { visible: false, userPaused: false, automaticPause: false });
    video.addEventListener('pause', () => {
      const state = states.get(video);
      if (state.automaticPause) state.automaticPause = false;
      else if (state.visible) state.userPaused = true;
    });
    video.addEventListener('play', () => { states.get(video).userPaused = false; });
    video.addEventListener('pointerdown', () => loadVideo(video), { once: true });
    video.addEventListener('keydown', () => loadVideo(video), { once: true });
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target;
        const state = states.get(video);
        state.visible = entry.isIntersecting;
        if (entry.isIntersecting && !navigator.connection?.saveData) {
          loadVideo(video);
          if (!reducedMotion.matches && !state.userPaused && !document.hidden) video.play().catch(() => {});
        } else if (!entry.isIntersecting) pauseAutomatically(video);
      });
    }, { threshold: .35 });
    previews.forEach(video => observer.observe(video));
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) previews.forEach(pauseAutomatically);
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) previews.forEach(pauseAutomatically);
  });

  const dialog = document.querySelector('.figure-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-figure]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const source = link.querySelector('img');
        const image = dialog.querySelector('img');
        image.src = link.href;
        image.alt = source.alt;
        dialog.querySelector('#figure-caption').textContent = source.alt;
        dialog.showModal();
      });
    });
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  }

  const isPublishedHomepage = location.hostname === 'ngchikit.github.io' && (location.pathname === '/' || location.pathname === '/index.html');
  const statistics = document.querySelector('[data-visitor-map]');
  if (!statistics) return;
  const map = statistics.querySelector('#visitor-map');
  const status = map.querySelector('[role="status"]');
  const widgetId = statistics.dataset.widgetId;
  // Local previews must not create production visits or show invented numbers.
  if (!isPublishedHomepage) {
    status.textContent = 'Preview · the visitor map and page views load on the published homepage.';
    return;
  }
  if (!widgetId) {
    status.textContent = 'Visitor statistics are being configured.';
    return;
  }

  let received = false;
  const unavailable = () => {
    if (received) return;
    map.classList.add('is-unavailable');
    status.classList.add('is-unavailable');
    status.textContent = 'Map unavailable. Open daily statistics below.';
  };
  const timeout = window.setTimeout(unavailable, 15000);
  const observer = new MutationObserver(() => {
    const widget = map.querySelector('#mapmyvisitors-widget');
    const count = map.querySelector('.mapmyvisitors-visitors');
    if (!widget || !count || !/\d/.test(count.textContent)) return;
    received = true;
    window.clearTimeout(timeout);
    map.classList.remove('is-unavailable');
    status.hidden = true;
    widget.href = widget.href.replace(/^http:\/\/mapmyvisitors\.com\//, 'https://mapmyvisitors.com/');
    widget.target = '_blank';
    widget.rel = 'noopener noreferrer';
    widget.setAttribute('aria-label', 'Visitor map and page views. Open daily statistics.');
    observer.disconnect();
    // The provider fixes its width when loaded. Fit later viewport changes
    // without reloading the widget and recording an extra visit.
    const fitMap = () => {
      if (widget.offsetWidth) widget.style.transform = `scale(${Math.min(1, map.clientWidth / widget.offsetWidth)})`;
    };
    fitMap();
    if ('ResizeObserver' in window) new ResizeObserver(fitMap).observe(map);
  });
  observer.observe(map, { subtree: true, childList: true, characterData: true });
  const script = document.createElement('script');
  script.id = 'mapmyvisitors';
  script.src = `https://mapmyvisitors.com/map.js?${new URLSearchParams({ d: widgetId, cl: 'ffffff', co: '2d78ad', w: 'a' })}`;
  script.async = true;
  script.onerror = unavailable;
  // One provider embed per page load; never refresh tracking calls on a timer.
  map.append(script);
})();
