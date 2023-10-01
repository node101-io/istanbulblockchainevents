let displayStateList = ['none', 'flex'];
dateSelectionInputDisplayState = 0;
typeSelectionInputDisplayState = 0;

window.addEventListener('load', () => {
  const dateBar = document.querySelectorAll('body .all-content .bottom-content .sidebar .bar')[1];
  const typeBar = document.querySelectorAll('body .all-content .bottom-content .sidebar .bar')[2];
  const dateCheckboxes = document.querySelectorAll('#date-checkbox');
  const typeCheckboxes = document.querySelectorAll('#type-checkbox');

  const selectAllDates = document.querySelector('.select-all-dates');
  const selectAllTypes = document.querySelector('.select-all-types');
  let allDatesSelected = false;
  let allTypesSelected = false;

  selectAllDates.addEventListener('click', () => {
    allDatesSelected = !allDatesSelected;

    dateCheckboxes.forEach(checkbox => {
      checkbox.setAttribute('data-checked', allDatesSelected ? 'true' : 'false');
      checkbox.querySelector('.checkbox-icon').style.display = allDatesSelected ? 'none' : 'block';
      checkbox.querySelector('.checkbox-icon-active').style.display = allDatesSelected ? 'block' : 'none';
    });
  });

  dateBar.addEventListener('click', () => {
    dateBar.parentNode.querySelector('.bar-extension-date-selection').classList.toggle('sidebar-extension-show');
    dateBar.querySelector('.list-tray-icon').classList.toggle('rotate-icon');
    document.getElementById('date-selection-input-wrapper').style.display = displayStateList[(++dateSelectionInputDisplayState) % displayStateList.length];
  });

  selectAllTypes.addEventListener('click', () => {
    allTypesSelected = !allTypesSelected;

    typeCheckboxes.forEach(checkbox => {
      checkbox.setAttribute('data-checked', allTypesSelected ? 'true' : 'false');
      checkbox.querySelector('.checkbox-icon').style.display = allTypesSelected ? 'none' : 'block';
      checkbox.querySelector('.checkbox-icon-active').style.display = allTypesSelected ? 'block' : 'none';
    });
  });

  typeBar.addEventListener('click', () => {
    typeBar.parentNode.querySelector('.bar-extension-type-selection').classList.toggle('sidebar-extension-show');
    typeBar.querySelector('.list-tray-icon').classList.toggle('rotate-icon');
    document.getElementById('type-selection-input-wrapper').style.display = displayStateList[(++typeSelectionInputDisplayState) % displayStateList.length];
  });
});