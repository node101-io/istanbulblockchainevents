window.addEventListener('load', () => {
  const venuesSection = document.querySelector("body .all-content .venue-accom-bottom-content .main-content");
  const searchBar = document.forms['search-bar'].querySelector('input');

  searchBar.addEventListener('keyup', (e) => {

    const term = e.target.value.toLowerCase();
    const venues = venuesSection.getElementsByClassName("venue-bar");

    Array.from(venues).forEach(venue => {

      const venueName = venue.querySelector(".venue-title");
      if(venueName.textContent.toLowerCase().indexOf(term) != -1) {
        venue.style.display = 'flex';
      } else {
        venue.style.display = 'none';
      };

    });
  });

  const customCapacityCheckboxes = document.querySelectorAll('.bar-extension-capacity-selection .bar-extension-checkboxes div');
  const venuesArea = document.querySelector("body .all-content .venue-accom-bottom-content .main-content");

  customCapacityCheckboxes.forEach(checkbox => {
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
      };

    });
  });

  customCapacityCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const selectedCapacity = checkbox.lastChild.textContent;
      const venues = venuesArea.getElementsByClassName("venue-bar");

      Array.from(venues).forEach(venue => {

        const venueCapacity = venue.querySelector(".bar-information .venue-capacity");
        if(venueCapacity.textContent.toLowerCase().includes(selectedCapacity) != -1) {
          venue.style.display = 'flex';
        } else {
          venue.style.display = 'none';
        };
      });
    });
  });

  const customLocationCheckboxes = document.querySelectorAll('.bar-extension-location-selection .bar-extension-checkboxes div');

  customLocationCheckboxes.forEach(checkbox => {
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
      };

    });
  });

  customLocationCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const selectedLocation = checkbox.lastChild.textContent;
      const venues = venuesArea.getElementsByClassName("venue-bar");

      Array.from(venues).forEach(venue => {

        const venueLocation = venue.querySelector(".bar-information .venue-location");
        if(venueLocation.textContent.toLowerCase().includes(selectedLocation) != -1) {
          venue.style.display = 'flex';
        } else {
          venue.style.display = 'none';
        };
      });
    });
  });
});