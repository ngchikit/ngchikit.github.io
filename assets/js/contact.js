(() => {
  'use strict';

  const dialog = document.querySelector('#contact-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const address = dialog.querySelector('[data-contact-value]');
  const compose = dialog.querySelector('[data-contact-compose]');
  const copy = dialog.querySelector('[data-contact-copy]');
  const status = dialog.querySelector('[data-contact-status]');
  let opener;
  let generation = 0;

  document.querySelectorAll('[data-contact-open]').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.setAttribute('aria-controls', dialog.id);
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button) return;
      // Obfuscation only: keep the address and mailto link out of the initial DOM.
      // A determined crawler can still decode the client-side configuration.
      let decoded;
      try { decoded = window.atob(dialog.dataset.contactAddress); }
      catch { return; } // The ordinary LinkedIn link remains a usable fallback.
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(decoded)) return;
      event.preventDefault();
      opener = link;
      generation++;
      address.value = decoded;
      const subject = link.dataset.contactSubject;
      compose.href = `mailto:${decoded}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
      status.textContent = '';
      copy.textContent = 'Copy address';
      dialog.showModal();
      compose.focus();
    });
  });

  copy.addEventListener('click', async () => {
    const currentGeneration = generation;
    try {
      await navigator.clipboard.writeText(address.value);
      if (!dialog.open || currentGeneration !== generation) return;
      copy.textContent = 'Copied ✓';
      status.textContent = 'Email address copied.';
    } catch {
      if (!dialog.open || currentGeneration !== generation) return;
      address.focus();
      address.select();
      status.textContent = 'Address selected. Use your device’s copy command.';
    }
  });

  dialog.querySelector('[data-contact-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    generation++;
    address.value = '';
    compose.removeAttribute('href');
    status.textContent = '';
    copy.textContent = 'Copy address';
    opener?.focus({ preventScroll: true });
  });
})();
