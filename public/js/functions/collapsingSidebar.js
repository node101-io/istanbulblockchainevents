let displayStateList = ['none', 'flex'];
dateSelectionInputDisplayState = 0;
typeSelectionInputDisplayState = 0;

window.addEventListener('load', () => {
  const dateBar = document.querySelectorAll('body .all-content .bottom-content .sidebar .bar')[1];
  const typeBar = document.querySelectorAll('body .all-content .bottom-content .sidebar .bar')[2];

  dateBar.addEventListener('click', () => {
    dateBar.parentNode.querySelector('.bar-extension-date-selection').classList.toggle('sidebar-extension-show');
    dateBar.querySelector('.list-tray-icon').classList.toggle('rotate-icon');
    document.getElementById('date-selection-input-wrapper').style.display = displayStateList[(++dateSelectionInputDisplayState) % displayStateList.length];
  });

  typeBar.addEventListener('click', () => {
    typeBar.parentNode.querySelector('.bar-extension-type-selection').classList.toggle('sidebar-extension-show');
    typeBar.querySelector('.list-tray-icon').classList.toggle('rotate-icon');
    document.getElementById('type-selection-input-wrapper').style.display = displayStateList[(++typeSelectionInputDisplayState) % displayStateList.length];
  });
});