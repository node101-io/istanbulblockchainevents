const SLIDE_CHANGE_DURATION_IN_MS = 5 * 1000;

let isEventEndReached = false;
let isEventsLoading = false;
let eventsPageCount = 1;

let currentSlide = 0;
let lastTimeOnSlide = 0;
let onSlide = false;
let slider = [];

let filters = {};

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
    page: eventsPageCount,
    ...filters
  }, res => {
    if (!res.success || res.error) return alert(res.error);

    eventsPageCount++;

    let isLastEventInArray = true;
    const lastOneEvent = res.events.slice(events.length - 5);

    for (let i = 0; i < res.events.length; i++)
      if (!isLastEventInArray || !lastOneEvent.find(any => any._id.toString() == res.events[i]._id.toString())) {
        isLastEventInArray = false;
        createEvent(res.events[i])
      }

    isEventEndReached = false;
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
    if (event.target.closest('#date-checkbox')) {
      const dateCheckbox = document.querySelectorAll('#date-checkbox');
      const dateAfter = [];
      const dateBefore = [];
  
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
  
      for (let i = 0; i < dateCheckbox.length; i++) {
        if (dateCheckbox[i].getAttribute('data-checked') == 'true') {
          const month = parseInt(dateCheckbox[i].getAttribute('data-month-index'), 10);
  
          const year = month <= currentMonth ? currentYear + 1 : currentYear;
  
          const AfterDate = new Date(year, month, 1);
          dateAfter.push(AfterDate);
  
          const beforeDate = new Date(year, month + 1, 1);
          dateBefore.push(beforeDate);
        };
      };
  
      eventsPageCount = 0;

      document.querySelector('.main-content').innerHTML = '';
  
      if (dateAfter.length) {
        filters = {
          date_after: dateAfter,
          date_before: dateBefore
        };
      } else {
          filters = {};
      };
  
      loadNewEvents(filters);
    };

    if (event.target.closest('.unselect-all-dates')) {
      const selectedDateCheckboxes = document.querySelectorAll('#date-checkbox[data-checked="true"]');

      if (selectedDateCheckboxes.length) {
        for (let i = 0; i < selectedDateCheckboxes.length; i++) {
          selectedDateCheckboxes[i].setAttribute('data-checked', 'false');
          selectedDateCheckboxes[i].querySelector('.checkbox-icon-active').style.display = 'none';
          selectedDateCheckboxes[i].querySelector('.checkbox-icon').style.display = 'block';
        };

        eventsPageCount = 0;

        document.querySelector('.main-content').innerHTML = '';

        filters = {};

        loadNewEvents(filters);
      };
    };

    if (event.target.closest('#type-checkbox')) {
      const typeCheckbox = document.querySelectorAll('#type-checkbox');
      const typeSelected = [];

      for (let i = 0; i < typeCheckbox.length; i++) {
        if (typeCheckbox[i].getAttribute('data-checked') == 'true') {
          typeSelected.push(typeCheckbox[i].querySelector('span').innerText.toLocaleLowerCase().replace(/-/g, '_'));
        };
      };

      eventsPageCount = 0;

      document.querySelector('.main-content').innerHTML = '';

      if (typeSelected.length) {
        filters = {
          event_types: typeSelected
        };
      } else {
        filters = {};
      };

      loadNewEvents(filters);
    };

    if (event.target.closest('.unselect-all-types')) {
      const selectedTypeCheckboxes = document.querySelectorAll('#type-checkbox[data-checked="true"]');
      
      if (selectedTypeCheckboxes.length) {
        for (let i = 0; i < selectedTypeCheckboxes.length; i++) {
          selectedTypeCheckboxes[i].setAttribute('data-checked', 'false');
          selectedTypeCheckboxes[i].querySelector('.checkbox-icon-active').style.display = 'none';
          selectedTypeCheckboxes[i].querySelector('.checkbox-icon').style.display = 'block';
        };

        eventsPageCount = 0;

        document.querySelector('.main-content').innerHTML = '';

        filters = {};

        loadNewEvents(filters);
      };
    };

    if (event.target.closest('.event-bar')) {
      const eventBar = event.target.closest('.event-bar');
      const oldOpenEventBar = document.querySelector('.event-bar-open');

      if (oldOpenEventBar && oldOpenEventBar != eventBar)
        oldOpenEventBar.classList.remove('event-bar-open');

      eventBar.classList.add('event-bar-open');
    };

    if (event.target.classList.contains('pages-each-scroll-button') && !event.target.classList.contains('pages-scroll-buttons-active')) {
      currentSlide = Number(event.target.getAttribute('data-index'));
      sliderWrapper.scrollTo({ left: sliderWrapper.clientWidth * currentSlide, behavior: 'smooth' });
      mobileSliderWrapper.scrollTo({ left: mobileSliderWrapper.clientWidth * currentSlide, behavior: 'smooth' });
      document.querySelector('.pages-scroll-buttons-active').classList.remove('pages-scroll-buttons-active');
      event.target.classList.add('pages-scroll-buttons-active');

      lastTimeOnSlide = (new Date).getTime();
    };
  });

  allWrapper.addEventListener('scroll', () => {
    if (
      !isEventEndReached &&
      !isEventsLoading &&
      (allWrapper.scrollHeight - (allWrapper.scrollTop + window.document.body.offsetHeight + allFooterHeight)) < NEW_EVENT_LOAD_SCROLL_DISTANCE
    ) {
      loadNewEvents(filters);
    }  
  });
});