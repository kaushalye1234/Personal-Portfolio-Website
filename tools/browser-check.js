async page => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const base = 'http://127.0.0.1:8768/Personal-Portfolio-Website/';
  const paths = ['', 'projects/fashion-shaa.html', 'projects/agriassist.html', 'projects/campusfind.html', 'cv.html'];
  for (const path of paths) {
    await page.goto(base + path);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error(path + ' overflow ' + width);
    }
    await page.locator('img[src]').evaluateAll(async imgs => { for (const img of imgs) { img.loading = 'eager'; await img.decode(); } });
    for (const href of await page.locator('a[href]').evaluateAll(links => links.map(a => a.href).filter(h => h.startsWith(location.origin)))) {
      if (!(await page.request.get(href)).ok()) throw Error('Broken link: ' + href);
    }
  }
  await page.goto(base + 'projects/fashion-shaa.html');
  await page.locator('[data-gallery-item]').first().click();
  if (!await page.locator('dialog').evaluate(d => d.open)) throw Error('Gallery closed');
  await page.keyboard.press('ArrowRight');
  if (await page.locator('#gallery-count').textContent() !== '2 / 2') throw Error('Next failed');
  await page.getByRole('button', { name: 'Show screenshot 1', exact: true }).click();
  if (await page.locator('#gallery-count').textContent() !== '1 / 2') throw Error('Thumbnail failed');
  await page.keyboard.press('Escape');
  if (!await page.locator('[data-gallery-item]').first().evaluate(el => el === document.activeElement)) throw Error('Focus not restored');
  await page.getByRole('button', { name: 'Use light theme' }).click();
  await page.reload();
  if (!await page.locator('body').evaluate(el => el.classList.contains('light'))) throw Error('Theme persistence');
  await page.screenshot({ path: 'review-project-light.png', fullPage: true });
  await page.getByRole('button', { name: 'Use dark theme' }).click();
  for (const path of ['projects/agriassist.html', 'projects/campusfind.html']) {
    await page.goto(base + path);
    await page.locator('[data-gallery-item]').first().click();
    if (!await page.locator('#gallery-prev').isDisabled() || !await page.locator('#gallery-next').isDisabled()) throw Error('Single image controls');
    await page.getByRole('button', { name: 'Close ×' }).click();
  }
  await page.goto(base + 'cv.html');
  await page.pdf({ path: 'assets/Chamindu-Kaushalye-CV.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
  const [download] = await Promise.all([page.waitForEvent('download'), page.locator('.cv-toolbar a[download]').click()]);
  if (download.suggestedFilename() !== 'Chamindu-Kaushalye-CV.pdf') throw Error('Download filename');
  await page.goto(base);
  await page.locator('img[src]').evaluateAll(async imgs => { for (const img of imgs) { img.loading = 'eager'; await img.decode(); } });
  await page.screenshot({ path: 'review-workbench-desktop.png', fullPage: true, animations: 'disabled' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'review-mobile-top.png', animations: 'disabled' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  if (await page.locator('.bench-front').evaluate(el => getComputedStyle(el).animationName) !== 'none') throw Error('Reduced motion');
  await page.locator('.featured h3 a').click();
  await page.reload();
  await page.goBack();
  if (!page.url().endsWith('/Personal-Portfolio-Website/')) throw Error('Back navigation');
  const nojs = await page.context().browser().newContext({ javaScriptEnabled: false });
  const fallback = await nojs.newPage();
  await fallback.goto(base);
  await fallback.locator('.featured h3 a').click();
  await fallback.locator('[data-gallery-item]').first().click();
  if (!fallback.url().endsWith('pos-checkout.png')) throw Error('No JS image fallback');
  await nojs.close();
  if (errors.length) throw Error(errors.join(';'));
  return { pages: 5, viewportWidths: [320, 390, 768, 1024, 1440], gallery: 'passed', theme: 'passed', reducedMotion: 'passed', download: 'passed', noJavaScript: 'passed', errors };
}

