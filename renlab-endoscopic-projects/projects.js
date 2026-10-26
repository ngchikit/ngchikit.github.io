(() => {
  'use strict';

  const filterBar = document.querySelector('.project-filters');
  if (filterBar) {
    const cards = [...document.querySelectorAll('.research-card')];
    const count = document.querySelector('.project-count');
    filterBar.hidden = false;
    filterBar.addEventListener('click', event => {
      const button = event.target.closest('button[data-filter]');
      if (!button) return;
      filterBar.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      let visible = 0;
      cards.forEach(card => {
        card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
        if (!card.hidden) visible += 1;
      });
      count.textContent = `${String(visible).padStart(2, '0')} ${visible === 1 ? 'project' : 'projects'}`;
    });
  }

  const video = document.querySelector('[data-autoplay-preview]');
  if (video) {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let userPaused = false;
    let automaticPause = false;
    const load = () => { if (!video.hasAttribute('src')) { video.src = video.dataset.autoplayPreview; video.load(); } };
    const pause = () => { if (!video.paused) { automaticPause = true; video.pause(); } };
    video.addEventListener('pause', () => { if (automaticPause) automaticPause = false; else userPaused = true; });
    video.addEventListener('play', () => { userPaused = false; });
    video.addEventListener('pointerdown', load, { once: true });
    video.addEventListener('keydown', load, { once: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        if (visible && !document.hidden && !navigator.connection?.saveData) {
          load();
          if (!reducedMotion.matches && !userPaused) video.play().catch(() => {});
        } else pause();
      }, { threshold: .35 }).observe(video);
    }
    document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
    reducedMotion.addEventListener('change', event => { if (event.matches) pause(); });
  }

  const dialog = document.querySelector('.figure-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-figure]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const source = link.querySelector('img');
        const target = dialog.querySelector('img');
        target.src = link.href;
        target.alt = source.alt;
        dialog.querySelector('p').textContent = source.alt;
        dialog.showModal();
      });
    });
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
  }

  const copyButton = document.querySelector('[data-copy-target]');
  if (copyButton && navigator.clipboard?.writeText) {
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      const status = document.querySelector('.copy-status');
      try {
        await navigator.clipboard.writeText(document.getElementById(copyButton.dataset.copyTarget).textContent);
        status.textContent = 'BibTeX copied to clipboard.';
        copyButton.textContent = 'Copied ✓';
        setTimeout(() => { copyButton.textContent = 'Copy BibTeX ↗'; }, 2500);
      } catch {
        status.textContent = 'Select the citation below to copy it manually.';
      }
    });
  }
})();
