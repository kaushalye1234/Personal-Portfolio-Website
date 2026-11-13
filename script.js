(() => {
  const button = document.querySelector('.theme-toggle');
  let preference;
  try { preference = localStorage.getItem('theme'); } catch {}
  const setTheme = light => {
    document.body.classList.toggle('light', light);
    if (button) { button.textContent = light ? 'Dark theme' : 'Light theme'; button.setAttribute('aria-label', light ? 'Use dark theme' : 'Use light theme'); }
  };
  setTheme(preference === 'light');
  if (button) {
    button.hidden = false;
    button.addEventListener('click', () => {
      const light = !document.body.classList.contains('light');
      setTheme(light);
      try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch {}
    });
  }
  const dialog = document.getElementById('project-gallery');
  const links = [...document.querySelectorAll('[data-gallery-item]')];
  if (!dialog || !links.length || typeof dialog.showModal !== 'function') return;
  const image = document.getElementById('gallery-image');
  const caption = document.getElementById('gallery-caption');
  const previous = document.getElementById('gallery-prev');
  const next = document.getElementById('gallery-next');
  const thumbs = document.getElementById('gallery-thumbs');
  let index = 0, trigger;
  const render = () => {
    const source = links[index].querySelector('img');
    image.src = links[index].href;
    image.alt = source.alt;
    caption.textContent = source.alt;
    document.getElementById('gallery-count').textContent = `${index + 1} / ${links.length}`;
    document.getElementById('gallery-original').href = links[index].href;
    previous.disabled = index === 0;
    next.disabled = index === links.length - 1;
    [...thumbs.children].forEach((thumb, i) => thumb.setAttribute('aria-current', String(i === index)));
  };
  links.forEach((link, i) => {
    const thumb = document.createElement('button');
    thumb.type = 'button';
    thumb.setAttribute('aria-label', `Show screenshot ${i + 1}`);
    const preview = document.createElement('img');
    preview.src = link.querySelector('img').src; preview.alt = '';
    thumb.append(preview);
    thumb.addEventListener('click', () => { index = i; render(); });
    thumbs.append(thumb);
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); trigger = link; index = i; render();
      document.getElementById('gallery-title').textContent = document.querySelector('h1').textContent + ' screenshots';
      dialog.showModal(); document.body.classList.add('gallery-open');
    });
  });
  previous.addEventListener('click', () => { if (index > 0) { index--; render(); } });
  next.addEventListener('click', () => { if (index < links.length - 1) { index++; render(); } });
  document.getElementById('gallery-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' && index < links.length - 1) { event.preventDefault(); index++; render(); }
    if (event.key === 'ArrowLeft' && index > 0) { event.preventDefault(); index--; render(); }
  });
  dialog.addEventListener('close', () => { document.body.classList.remove('gallery-open'); trigger?.focus(); });
})();
