const DEFAULTTHRESHOLD = 0.01

for (const number of document.querySelectorAll('.js-animate-number')) {
  number.dataset.targetValue = number.textContent;
}

function animateNumber(element, currentValue, targetValue) {
  currentValue += isFloat(targetValue) ? Math.max(0.1, targetValue/20) : Math.max(1, parseInt(targetValue/35));
  currentValue = Number(currentValue.toFixed(1));
  if (currentValue > targetValue) currentValue = targetValue;

  const decimals = isFloat(targetValue) ? 1 : 0;
  const newLabel = `${'0'.repeat(targetValue.toFixed(decimals).replace('.', '').length - currentValue.toFixed(decimals).replace('.', '').length)}${currentValue.toFixed(decimals)}`
  element.textContent = newLabel;
  if (currentValue > targetValue) return;
  window.requestAnimationFrame(() => animateNumber(element, currentValue, targetValue));
}

function animateNumbers(entries) {
  for (const entry of entries) {
    for (const element of entry.target.querySelectorAll('.js-animate-number')) {
      const targetValue = Number(element.dataset.targetValue);
      if (!entry.isIntersecting) {       
        element.textContent = '0'.repeat(targetValue.toString().replace('.', '').length);
      } else {
        setTimeout(animateNumber(element, 0, targetValue), 30);
      }
    }
  }
}

const defaultObserver = new IntersectionObserver(animateNumbers, {
  threshold: DEFAULTTHRESHOLD
});

const triggers = document.querySelectorAll('.js-animate-number-trigger');
for (const element of triggers) {
  defaultObserver.observe(element);
}

function isFloat(n) { return Number(n) === n && n % 1 !== 0 }
