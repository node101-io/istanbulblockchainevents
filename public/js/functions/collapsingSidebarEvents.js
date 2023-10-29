let displayStateList = ['none', 'flex'];
dateSelectionInputDisplayState = 0;
typeSelectionInputDisplayState = 0;

window.addEventListener('load', () => {
  const dateBar = document.getElementById('date-bar');
  const dateBarExtension = document.querySelector('.bar-extension-date-selection');

  const typeBar = document.getElementById('type-bar');
  const typeBarExtension = document.querySelector('.bar-extension-type-selection');

  document.addEventListener('click', event => {
    if (event.target.closest('#date-bar')) {
      dateBarExtension.classList.toggle('sidebar-extension-show');
      dateBar.querySelector('.list-tray-icon').classList.toggle('rotate-icon');
      document.getElementById('date-selection-input-wrapper').style.display = displayStateList[(++dateSelectionInputDisplayState) % displayStateList.length];
    };

    if (event.target.closest('#type-bar')) {
      typeBarExtension.classList.toggle('sidebar-extension-show');
      typeBar.querySelector('.list-tray-icon').classList.toggle('rotate-icon');
      document.getElementById('type-selection-input-wrapper').style.display = displayStateList[(++typeSelectionInputDisplayState) % displayStateList.length];
    };
  });
});