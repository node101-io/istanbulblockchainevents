const SLIDE_CHANGE_DURATION_IN_MS = 5 * 1000;

let isEventEndReached = false;
let isEventsLoading = false;
let eventsPageCount = 1;

let currentSlide = 0;
let lastTimeOnSlide = 0;
let onSlide = false;
let slider = [];

const sliderObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentSlide = Number(entry.target.getAttribute('data-index'));
      const inactiveScrollButton = document.querySelectorAll('.pages-each-scroll-button');
      const activeScrollButton = document.querySelector('.pages-scroll-buttons-active');

      if (activeScrollButton) {
        activeScrollButton.classList.remove('pages-scroll-buttons-active');
      }

      inactiveScrollButton[currentSlide].classList.add('pages-scroll-buttons-active');
    }
  });
}, { threshold: 0.5 });

function changeSlide() {
  const sliderWrapper = document.querySelector('.top-intro-slider-wrapper');
  const mobileSliderWrapper = document.querySelector('.top-slider-section-mobile');

  setTimeout(() => {
    if (!onSlide && ((new Date).getTime() - lastTimeOnSlide) >= SLIDE_CHANGE_DURATION_IN_MS) {
      currentSlide = (Number(currentSlide) + 1) % slider.length;
      lastTimeOnSlide = (new Date).getTime();

      sliderWrapper.scrollTo({
        left: sliderWrapper.clientWidth * currentSlide, behavior: 'smooth'
      });
      mobileSliderWrapper.scrollTo({
        left: mobileSliderWrapper.clientWidth * currentSlide, behavior: 'smooth'
      });
    }
    changeSlide();
  }, ((new Date).getTime() - lastTimeOnSlide) >= SLIDE_CHANGE_DURATION_IN_MS ? SLIDE_CHANGE_DURATION_IN_MS : (SLIDE_CHANGE_DURATION_IN_MS - ((new Date).getTime() - lastTimeOnSlide)))
};

function loadNewEvents() {
  if (isEventsLoading) return;

  isEventsLoading = true;

  serverRequest('/filter', 'POST', {
    page: eventsPageCount++
  }, res => {
    if (!res.success || res.error) return alert(res.error);

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
  slider = JSON.parse(document.getElementById('slider-json').value);
  changeSlide();

  events = JSON.parse(document.getElementById('events-json').value);

  const allWrapper = document.querySelector('.all-wrapper');
  const allFooterHeight = document.querySelector('footer.all-footer').offsetHeight;

  const sliderWrapper = document.querySelector('.top-intro-slider-wrapper');
  const sliderWrappers = document.querySelectorAll('.top-intro-each-slide-wrapper');
  const mobileSliderWrapper = document.querySelector('.top-slider-section-mobile');

  sliderWrappers.forEach(each => {
    sliderObserver.observe(each);
  });

  document.addEventListener('mouseover', event => {
    if (event.target.closest('.top-intro-each-slide-wrapper')) {
      onSlide = true;
    } else if (onSlide) {
      onSlide = false;
    }
  });

  document.addEventListener('touchstart', event => {
    if (event.target.closest('.top-intro-each-slide-wrapper')) {
      onSlide = true;
    }
  });

  document.addEventListener('touchend', _ => {
    onSlide = false;
  });

  document.addEventListener('click', event => {
    if (event.target.closest('.event-bar')) {
      const eventBar = event.target.closest('.event-bar');
      const oldOpenEventBar = document.querySelector('.event-bar-open');

      if (oldOpenEventBar && oldOpenEventBar != eventBar)
        oldOpenEventBar.classList.remove('event-bar-open');

      eventBar.classList.add('event-bar-open');
    }

    if (event.target.classList.contains('pages-each-scroll-button') && !event.target.classList.contains('pages-scroll-buttons-active')) {
      currentSlide = Number(event.target.getAttribute('data-index'));
      sliderWrapper.scrollTo({ left: sliderWrapper.clientWidth * currentSlide, behavior: 'smooth' });
      mobileSliderWrapper.scrollTo({ left: mobileSliderWrapper.clientWidth * currentSlide, behavior: 'smooth' });
      document.querySelector('.pages-scroll-buttons-active').classList.remove('pages-scroll-buttons-active');
      event.target.classList.add('pages-scroll-buttons-active');

      lastTimeOnSlide = (new Date).getTime();
    }
  });

  allWrapper.addEventListener('scroll', () => {
    if (
      !isEventEndReached &&
      !isEventsLoading &&
      (allWrapper.scrollHeight - (allWrapper.scrollTop + window.document.body.offsetHeight + allFooterHeight)) < NEW_EVENT_LOAD_SCROLL_DISTANCE
    ) {
      loadNewEvents();
    }  
  });
});