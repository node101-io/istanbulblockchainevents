let isVenueEndReached = false;
let isVenuesLoading = false;
let venuesPageCount = 1;

const DISTRICT_LIST = [ 'fatih', 'beyoglu', 'halic', 'sisli', 'besiktas', 'sariyer', 'kadikoy', 'uskudar', 'beykoz', 'adalar' ];

let filters = {};

function loadNewVenues() {
  if (isVenuesLoading) return;

  isVenuesLoading = true;

  serverRequest('venue/filter', 'POST', {
    page: venuesPageCount,
    ...filters
  }, res => {
    if (!res.success || res.error) return alert(res.error);

    venuesPageCount++;

    let isLastVenueInArray = true;
    const lastOneVenue = res.venues.slice(venues.length - 1);

    for (let i = 0; i < res.venues.length; i++)
      if (!isLastVenueInArray || !lastOneVenue.find(any => any._id.toString() == res.venues[i]._id.toString())) {
        isLastVenueInArray = false;
        createVenue(res.venues[i])
      };
    
    let isVenueEndReached = false;
    if (!res.venues.length) {
      isVenueEndReached = true;
      if (document.getElementById('venues-loading-icon'))
        document.getElementById('venues-loading-icon').style.display = 'none';
    };

    isVenuesLoading = false;
  });
};

window.addEventListener('load', () => {
  venues = JSON.parse(document.getElementById('venues-json').value);

  const allWrapper = document.querySelector('.all-wrapper');
  const allFooterHeight = document.querySelector('footer.all-footer').offsetHeight;

  document.addEventListener('click', event => {
    if (event.target.closest('#capacity-checkbox')) {
      const capacityCheckbox = document.querySelectorAll('#capacity-checkbox');
      const capacitySelected = [];

      for (let i = 0; i < capacityCheckbox.length; i++) {
        if (capacityCheckbox[i].getAttribute('data-checked') == 'true') {
          capacitySelected.push(capacityCheckbox[i].querySelector('span').innerText);
        };
      };
      console.log(capacitySelected);
    };

    if (event.target.closest('#location-checkbox')) {
      const locationCheckbox = document.querySelectorAll('#location-checkbox');
      const locationSelected = [];

      for (let i = 0; i < locationCheckbox.length; i++) {
        if (locationCheckbox[i].getAttribute('data-checked') == 'true') {
          locationSelected.push(DISTRICT_LIST[i]);
        };
      };
      
      venuesPageCount = 0;

      document.querySelector('.main-content').innerHTML = '';

      if (locationSelected.length) {
        filters = {
          districts: locationSelected
        };
      } else {
        filters = {};
      };

      loadNewVenues(filters);
    };

    if (event.target.closest('.unselect-all-locations')) {
      const selectedLocationCheckboxes = document.querySelectorAll('#location-checkbox[data-checked="true"]');

      if (selectedLocationCheckboxes.length) {
        selectedLocationCheckboxes.forEach(checkbox => {
          checkbox.setAttribute('data-checked', 'false');
          checkbox.querySelector('.checkbox-icon-active').style.display = 'none';
          checkbox.querySelector('.checkbox-icon').style.display = 'block';
        });

        venuesPageCount = 0;

        document.querySelector('.main-content').innerHTML = '';

        filters = {};

        loadNewVenues(filters);
      };
    };

    if (event.target.closest('.venue-bar')) {
      const venueBar = event.target.closest('.venue-bar');
      const oldOpenVenueBar = document.querySelector('.venue-bar-open');

      if (oldOpenVenueBar && oldOpenVenueBar != venueBar)
        oldOpenVenueBar.classList.remove('venue-bar-open');
      
      venueBar.classList.add('venue-bar-open');
    };

  });

  allWrapper.addEventListener('scroll', () => {
    if (
      !isVenueEndReached &&
      !isVenuesLoading &&
      (allWrapper.scrollHeight - (allWrapper.scrollTop + window.document.body.offsetHeight + allFooterHeight)) < NEW_EVENT_LOAD_SCROLL_DISTANCE
    ) {
      loadNewVenues();
    }  
  });
});