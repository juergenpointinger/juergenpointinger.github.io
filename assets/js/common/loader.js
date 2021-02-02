document.addEventListener('DOMContentLoaded', loaderFadeOut);
// document.addEventListener('turbolinks:load', loaderFadeOut);

function loaderFadeOut(){
    let overlay = document.querySelector('#loader');
    setTimeout(() => overlay.setAttribute('style', 'display: none;'), 1000);
}