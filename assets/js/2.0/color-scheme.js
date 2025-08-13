document.addEventListener('DOMContentLoaded', setColorMode)
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', setColorMode);

function setColorMode() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
    document.documentElement.setAttribute('data-color-mode', 'light');
    /*let matched = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (matched) {
      // Dark mode
      document.documentElement.setAttribute('data-color-mode', 'dark');
    } else {
      // Light mode
      document.documentElement.setAttribute('data-color-mode', 'light');
    }*/
  } else {
    // Color scheme not support (use light mode)
    document.documentElement.setAttribute('data-color-mode', 'light');
  }  
}