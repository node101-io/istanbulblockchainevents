const NEW_EVENT_LOAD_SCROLL_DISTANCE = 400;
const NEW_VENUE_LOAD_SCROLL_DISTANCE = 400;

document.addEventListener('DOMContentLoaded', (event) => {
  const links = document.querySelectorAll('.footer-page-link');

  links.forEach((link) => {
    if (window.location.pathname === link.getAttribute('href')) {
      link.classList.add('footer-link-active');
    } else {
      link.classList.remove('footer-link-active');
    };
  });
});