// Auto "Match Again" clicker (personal use)
const SELECTOR = '.matching-panel-failed button.matching-primary-action';
const DELAY_MIN = 1000; // ms
const DELAY_MAX = 2500; // ms

let pending = false;

function getButton() {
  const btn = document.querySelector(SELECTOR);
  if (!btn || btn.disabled || btn.offsetParent === null) return null;
  if (!/match again/i.test(btn.textContent)) return null;
  return btn;
}

function check() {
  if (pending || !getButton()) return;
  pending = true;
  const delay = DELAY_MIN + Math.random() * (DELAY_MAX - DELAY_MIN);
  setTimeout(() => {
    pending = false;
    const btn = getButton(); // re-check: only click if it is still the failed screen
    if (btn) btn.click();
  }, delay);
}

new MutationObserver(check).observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
});
setInterval(check, 1000);
