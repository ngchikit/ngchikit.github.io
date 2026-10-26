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
    newsToggle.hidden = news.querySelectorAll('li').length <= 4;
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
  const visitorMap = document.querySelector('[data-visitor-map]');
  if (visitorMap) {
    const image = visitorMap.querySelector('[data-visitor-map-image]');
    const status = visitorMap.querySelector('#visitor-map-status');
    if (isPublishedHomepage) {
      const previewSource = image.getAttribute('src');
      let complete = false;
      let timeout;
      const unavailable = () => {
        if (complete) return;
        complete = true;
        window.clearTimeout(timeout);
        image.onload = null;
        image.onerror = null;
        image.src = previewSource;
        image.alt = 'World map; live visitor locations are temporarily unavailable';
        status.textContent = 'Map temporarily unavailable. Try the country statistics link above.';
      };
      image.onload = () => {
        // Some blocked requests return a transparent tracking pixel instead of a map.
        if (image.naturalWidth < 100) { unavailable(); return; }
        complete = true;
        window.clearTimeout(timeout);
        image.alt = 'World map with flags marking visitors’ countries and regions';
        status.textContent = 'Live visitor origins · map updates may take about five minutes.';
      };
      image.onerror = unavailable;
      status.textContent = 'Loading visitor locations…';
      timeout = window.setTimeout(unavailable, 12000);
      // Load once per page visit, even when the footer is off screen. Refreshing the
      // image on a timer would add artificial pageviews to the geographic counter.
      image.src = image.dataset.liveSrc;
    } else {
      image.alt = 'Preview of the visitor map, with no visits recorded';
      status.textContent = 'Preview · visitor locations will appear after publication.';
    }
  }

  const views = document.querySelector('[data-pageviews]');
  if (views) {
    const status = document.querySelector('#pageviews-status');
    const total = document.querySelector('#busuanzi_page_pv');
    const today = document.querySelector('#busuanzi_today_pv');
    let received = false;
    const observer = new MutationObserver(() => {
      if (!received && /^\d[\d,]*$/.test(total.textContent.trim()) && /^\d[\d,]*$/.test(today.textContent.trim())) {
        received = true;
        observer.disconnect();
        status.textContent = 'Live counts · since 27 October 2026.';
      }
    });
    observer.observe(views, { subtree: true, childList: true, characterData: true });
    // Count public homepage visits only; preview traffic must not inflate statistics.
    if (isPublishedHomepage) {
      const script = document.createElement('script');
      script.src = 'https://cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js';
      script.defer = true;
      script.onerror = () => { status.textContent = 'View counts are temporarily unavailable.'; };
      document.head.append(script);
      window.setTimeout(() => { if (!received) status.textContent = 'View counts are temporarily unavailable.'; }, 12000);
    } else {
      status.textContent = 'Live counting is enabled on the published homepage.';
    }
  }
})();
