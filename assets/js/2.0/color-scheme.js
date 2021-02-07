document.addEventListener('DOMContentLoaded', setColorMode)
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', setColorMode);

function setColorMode() {
  let matched = window.matchMedia('(prefers-color-scheme: light)').matches;
  if (matched) {
    // light mode
    document.documentElement.setAttribute('data-color-mode', 'light');
  } else {
    // dark mode
    document.documentElement.setAttribute('data-color-mode', 'dark');
  }
}