const customDateCheckboxes = document.querySelectorAll('.bar-extension-date-selection .bar-extension-checkboxes div');
const eventsArea = document.querySelector("body .all-content .bottom-content .main-content");

customDateCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('click', () => {
      const isChecked = checkbox.getAttribute('data-checked') === 'true';

      if (isChecked) {
          checkbox.setAttribute('data-checked', 'false');
          checkbox.querySelector('.checkbox-icon-active').style.display = 'none';
          checkbox.querySelector('.checkbox-icon').style.display = 'block';
      } else {
          checkbox.setAttribute('data-checked', 'true');
          checkbox.querySelector('.checkbox-icon-active').style.display = 'block';
          checkbox.querySelector('.checkbox-icon').style.display = 'none';
      }

  });

});

customDateCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
      const selectedMonth = checkbox.lastChild.textContent;
      const events = eventsArea.getElementsByClassName("event-bar");

      Array.from(events).forEach(event => {

        const eventDate = event.querySelector(".bar-information .event-date");
        if(eventDate.textContent.toLowerCase().includes(selectedMonth) != -1) {
          event.style.display = 'flex';
        } else {
          event.style.display = 'none';
        }
    
      });
  });
});

const customTypeCheckboxes = document.querySelectorAll('.bar-extension-type-selection .bar-extension-checkboxes div');

customTypeCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('click', () => {
      const isChecked = checkbox.getAttribute('data-checked') === 'true';

      if (isChecked) {
          checkbox.setAttribute('data-checked', 'false');
          checkbox.querySelector('.checkbox-icon-active').style.display = 'none';
          checkbox.querySelector('.checkbox-icon').style.display = 'block';
      } else {
          checkbox.setAttribute('data-checked', 'true');
          checkbox.querySelector('.checkbox-icon-active').style.display = 'block';
          checkbox.querySelector('.checkbox-icon').style.display = 'none';
      }

  });

});

customTypeCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
      const selectedType = checkbox.lastChild.textContent;
      const events = eventsArea.getElementsByClassName("event-bar");

      Array.from(events).forEach(event => {

        const eventType = event.querySelector(".bar-information .event-type");
        if(eventType.textContent.toLowerCase().includes(selectedType) != -1) {
          event.style.display = 'flex';
        } else {
          event.style.display = 'none';
        }
    
      });
  });
});