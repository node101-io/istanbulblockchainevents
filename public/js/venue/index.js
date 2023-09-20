let isVenueEndReached = false;
let isVenuesLoading = false;
let venuesPageCount = 1;

function loadNewVenues() {
  if (isVenuesLoading) return;

  isVenuesLoading = true;

  serverRequest('venue/filter', 'POST', {
    page: venuesPageCount
  }, res => {
    if (!res.success || res.error) return alert(res.error);

    venuesPageCount++;

    let isLastVenueInArray = true;
    
    const lastTenVenues = res.venues.slice(venues.length - 10);

    for (let i = 0; i < res.venues.length; i++)
      if (!isLastVenueInArray || !lastTenVenues.find(any => any._id.toString() == res.venues[i]._id.toString())) {
        isLastVenueInArray = false;
        createVenue(res.venues[i])
      }
    
    if (!res.venues.length) {
      isVenueEndReached = true;
      if (document.getElementById('venues-loading-icon'))
        document.getElementById('venues-loading-icon').style.display = 'none';
    }

    isVenuesLoading = false;
  });
};

window.addEventListener('load', () => {
  venues = JSON.parse(document.getElementById('venues-json').value);

  const allWrapper = document.querySelector('.all-wrapper');
  const allFooterHeight = document.querySelector('footer.all-footer').offsetHeight;

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