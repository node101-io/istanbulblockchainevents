let displayStateList = ['none', 'flex'];
capacitySelectionInputDisplayState = 0;
locationSelectionInputDisplayState = 0;

window.addEventListener('load', () => {
  const capacityBar = document.getElementById('capacity-bar');
  const capacityBarExtension = document.querySelector('.bar-extension-capacity-selection');
  const capacityCheckboxes = document.querySelectorAll('#capacity-checkbox');

  const locationBar = document.getElementById('location-bar');
  const locationBarExtension = document.querySelector('.bar-extension-location-selection');
  const locationCheckboxes = document.querySelectorAll('#location-checkbox');

  document.addEventListener('click', event => {
    if (event.target.closest('#capacity-bar')) {
      capacityBarExtension.classList.toggle('sidebar-extension-show');
      capacityBar.querySelector('.list-tray-icon').classList.toggle('rotate-icon');
      document.getElementById('capacity-selection-input-wrapper').style.display = displayStateList[(++capacitySelectionInputDisplayState) % displayStateList.length];
    };

    if (event.target.closest('#location-bar')) {
      locationBarExtension.classList.toggle('sidebar-extension-show');
      locationBar.querySelector('.list-tray-icon').classList.toggle('rotate-icon');
      document.getElementById('location-selection-input-wrapper').style.display = displayStateList[(++locationSelectionInputDisplayState) % displayStateList.length];
    }
  });
})