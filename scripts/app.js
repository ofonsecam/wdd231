// --- SITE HEADER & NAVIGATION ---
const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
  const isOpen = navButton.classList.toggle('show');
  
  navButton.setAttribute('aria-expanded', isOpen);
  
  navBar.classList.toggle('show');
});


// --- SITE FOOTER & JS REVIEW ---
const currentYearElement = document.querySelector('#currentyear');
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

const lastModifiedElement = document.querySelector('#lastModified');
if (lastModifiedElement) {
  lastModifiedElement.textContent = `Última modificación: ${document.lastModified}`;
}