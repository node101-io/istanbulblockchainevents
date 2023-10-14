let displayStateList = ['none', 'flex'];
dateSelectionInputDisplayState = 0;
typeSelectionInputDisplayState = 0;

window.addEventListener('load', () => {
  const dateBar = document.getElementById('date-bar');
  const dateBarExtension = document.querySelector('.bar-extension-date-selection');
  const dateCheckboxes = document.querySelectorAll('#date-checkbox');

  const typeBar = document.getElementById('type-bar');
  const typeBarExtension = document.querySelector('.bar-extension-type-selection');
  const typeCheckboxes = document.querySelectorAll('#type-checkbox');

  let allDatesSelected = false;
  let allTypesSelected = false;

  document.addEventListener('click', event => {
    if (event.target.closest('#date-bar')) {
      dateBarExtension.classList.toggle('sidebar-extension-show');
      dateBar.querySelector('.list-tray-icon').classList.toggle('rotate-icon');
      document.getElementById('date-selection-input-wrapper').style.display = displayStateList[(++dateSelectionInputDisplayState) % displayStateList.length];
    };

    if (event.target.closest('.select-all-dates')) {
      allDatesSelected = !allDatesSelected;

      dateCheckboxes.forEach(checkbox => {
        checkbox.setAttribute('data-checked', allDatesSelected ? 'true' : 'false');
        checkbox.querySelector('.checkbox-icon').style.display = allDatesSelected ? 'none' : 'block';
        checkbox.querySelector('.checkbox-icon-active').style.display = allDatesSelected ? 'block' : 'none';
      });
    };

    if (event.target.closest('#date-checkbox')) {
      const monthIndex = Number(event.target.closest('#date-checkbox').getAttribute('data-month-index'));
      const current = new Date();

      let dateAfter;
      let dateBefore;

      if (current.getMonth() >= monthIndex) {
        dateAfter = `${current.getFullYear()}-${monthIndex + 1}-01`;
        dateBefore = `${current.getFullYear()}-${monthIndex + 2}-01`;
      } else {
        dateAfter = `${current.getFullYear() - 1}-${monthIndex + 1}-01`;
        dateBefore = `${current.getFullYear()}-${monthIndex + 1}-01`;
      }

      serverRequest('/filter', 'POST', {
        date_after: dateAfter,
        date_before: dateBefore
      }, res => {
        if (!res.success || res.error) return alert(res.error);

        for (let i = 0; i < res.events.length; i++)
          if (new Date(dateAfter) <= new Date(res.events[i].start_date) && new Date(res.events[i].date) < new Date(dateBefore))
            console.log(res.events[i]);

          // console.log(res.events[i]);
      })
    };

    if (event.target.closest('#type-bar')) {
      typeBarExtension.classList.toggle('sidebar-extension-show');
      typeBar.querySelector('.list-tray-icon').classList.toggle('rotate-icon');
      document.getElementById('type-selection-input-wrapper').style.display = displayStateList[(++typeSelectionInputDisplayState) % displayStateList.length];
    };

    if (event.target.closest('.select-all-types')) {
      allTypesSelected = !allTypesSelected;

      typeCheckboxes.forEach(checkbox => {
        checkbox.setAttribute('data-checked', allTypesSelected ? 'true' : 'false');
        checkbox.querySelector('.checkbox-icon').style.display = allTypesSelected ? 'none' : 'block';
        checkbox.querySelector('.checkbox-icon-active').style.display = allTypesSelected ? 'block' : 'none';
      });
    }
  });
});