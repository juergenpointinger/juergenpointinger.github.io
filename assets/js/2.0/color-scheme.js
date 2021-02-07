document.addEventListener('DOMContentLoaded', setColorMode)
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', setColorMode);

function setColorMode() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
    let matched = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    if (matched) {
      // Light mode
      document.documentElement.setAttribute('data-color-mode', 'light');
    } else {
      // Dark mode
      document.documentElement.setAttribute('data-color-mode', 'dark');
    }
  } else {
    // Color scheme not support (use dark mode)
    document.documentElement.setAttribute('data-color-mode', 'dark');
  }  
}