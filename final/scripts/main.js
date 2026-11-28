/**
 * Initializes shared UI behavior: responsive hamburger menu,
 * active navigation wayfinding, and dynamic footer dates.
 */
export function initSharedUI() {
  const navButton = document.querySelector('#nav-button');
  const navBar = document.querySelector('#nav-bar');

  if (navButton && navBar) {
    navButton.addEventListener('click', () => {
      const isOpen = navBar.classList.toggle('open');
      navButton.classList.toggle('open', isOpen);
      navButton.setAttribute('aria-expanded', String(isOpen));
    });
  }

  highlightCurrentNav();
  populateFooterDates();
}

function highlightCurrentNav() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('#nav-bar a');

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute('href');
    const isMatch = linkHref === currentFile;
    link.parentElement?.classList.toggle('current', isMatch);

    if (isMatch) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function populateFooterDates() {
  const yearEl = document.querySelector('#currentyear');
  const modifiedEl = document.querySelector('#lastModified');

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (modifiedEl) {
    modifiedEl.textContent = `Last Modified: ${document.lastModified}`;
  }
}

document.addEventListener('DOMContentLoaded', initSharedUI);