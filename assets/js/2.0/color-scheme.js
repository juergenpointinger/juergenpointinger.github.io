document.addEventListener('DOMContentLoaded', setColorMode)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setColorMode);

function setColorMode() {
  let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (matched) {
    //dark mode
    document.documentElement.setAttribute('data-color-mode', 'dark');
  } else {
    //light mode
    document.documentElement.setAttribute('data-color-mode', 'light');
  }
}