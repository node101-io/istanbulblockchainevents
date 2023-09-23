let isEventEndReached = false;
let isEventsLoading = false;
let eventsPageCount = 1;

function loadNewEvents() {
  if (isEventsLoading) return;

  isEventsLoading = true;

  serverRequest('/filter', 'POST', {
    page: eventsPageCount
  }, res => {
    if (!res.success || res.error) return alert(res.error);

    eventsPageCount++;

    let isLastEventInArray = true;
    const lastTenEvents = res.events.slice(events.length - 10);

    for (let i = 0; i < res.events.length; i++)
      if (!isLastEventInArray || !lastTenEvents.find(any => any._id.toString() == res.events[i]._id.toString())) {
        isLastEventInArray = false;
        createEvent(res.events[i])
      }
    
    if (!res.events.length) {
      isEventEndReached = true;
      if (document.getElementById('events-loading-icon'))
        document.getElementById('events-loading-icon').style.display = 'none';
    }

    isEventsLoading = false;
  });
};

window.addEventListener('load', () => {
  events = JSON.parse(document.getElementById('events-json').value);

  const allWrapper = document.querySelector('.all-wrapper');
  const allFooterHeight = document.querySelector('footer.all-footer').offsetHeight;

  allWrapper.addEventListener('scroll', () => {
    if (
      !isEventEndReached &&
      !isEventsLoading &&
      (allWrapper.scrollHeight - (allWrapper.scrollTop + window.document.body.offsetHeight + allFooterHeight)) < NEW_EVENT_LOAD_SCROLL_DISTANCE
    ) {
      loadNewEvents();
    }  
  });

  document.addEventListener('click', event => {
    if (event.target.closest('.event-bar')) {
      const eventBar = event.target.closest('.event-bar');
      const oldOpenEventBar = document.querySelector('.event-bar-open');

      if (oldOpenEventBar && oldOpenEventBar != eventBar)
        oldOpenEventBar.classList.remove('event-bar-open');

      eventBar.classList.add('event-bar-open');
    }
  })
});