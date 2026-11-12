const hamburgerBtn = document.querySelector('#hamburger-btn');
const primaryNav = document.querySelector('#primary-nav');

if (hamburgerBtn && primaryNav) {
  hamburgerBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    hamburgerBtn.textContent = primaryNav.classList.contains('open') ? '✕' : '☰';
  });
}

const currentYear = document.querySelector('#current-year');
const lastModified = document.querySelector('#last-modified');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = document.lastModified;
}