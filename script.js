const themeButton = document.getElementById('theme-toggle');
let savedTheme;
try { savedTheme = localStorage.getItem('theme'); } catch {}
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
function applyTheme(dark) {
  document.body.classList.toggle('dark-theme', dark);
  themeButton.textContent = dark ? 'Light theme' : 'Dark theme';
  themeButton.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
}
applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
themeButton.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark-theme');
  applyTheme(dark);
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
});
document.getElementById('year').textContent = new Date().getFullYear();
