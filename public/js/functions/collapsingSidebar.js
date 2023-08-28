const dateBar = document.querySelectorAll('body .all-content .bottom-content .sidebar .bar')[1];
const typeBar = document.querySelectorAll('body .all-content .bottom-content .sidebar .bar')[2];

dateBar.addEventListener('click', () => {
  dateBar.parentNode.querySelector('.bar-extension-date-selection').classList.toggle('sidebar-extension-show');
  dateBar.querySelector('.list-tray-icon').classList.toggle('rotate-icon');
});

typeBar.addEventListener('click', () => {
  typeBar.parentNode.querySelector('.bar-extension-type-selection').classList.toggle('sidebar-extension-show');
  typeBar.querySelector('.list-tray-icon').classList.toggle('rotate-icon');
});