const SHORT_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const EVENT_TYPES = [
  "Summit", "Party", "Conference", "Hackathon", "Meetup", "Workshop",
  "Dinner", "Brunch", "Co-living", "Co-work", "NFTs", "Tour", "Other"
];

function createEvent(event) {
  const mainContent = document.querySelector('.main-content');

  const eventBar = document.createElement('div');
  eventBar.classList.add('event-bar');

  const barInformation = document.createElement('div');
  barInformation.classList.add('bar-information');

  const eventTitle = document.createElement('div');
  eventTitle.classList.add('event-title');
  eventTitle.classList.add(event.is_side ? 'side-events' : 'main-events');
  eventTitle.innerText = event.name;

  const eventDate = document.createElement('div');
  eventDate.classList.add('event-date');
  
  let startDate = typeof event.start_date === 'string' ? new Date(event.start_date) : event.start_date;
  let endDate = event.end_date ? (typeof event.end_date === 'string' ? new Date(event.end_date) : event.end_date) : null;
  
  const endDateStr = endDate && startDate.getMonth() === endDate.getMonth() ? ' - ' + endDate.getDate() : '';
  
  eventDate.innerText = `${SHORT_MONTHS[startDate.getMonth()]} ${startDate.getDate()}${endDateStr}`;  

  const eventType = document.createElement('div');
  eventType.classList.add('event-type');
  eventType.innerText = EVENT_TYPES[['summit', 'party', 'conference', 'hackathon', 'meetup', 'workshop', 'dinner', 'brunch', 'co_living', 'co_work', 'nfts', 'tour', 'other'].indexOf(event.event_type)];

  barInformation.append(eventTitle, eventDate, eventType);
  eventBar.appendChild(barInformation);

  const aboutEventMobile = document.createElement('div');
  aboutEventMobile.classList.add('about-the-event-mobile-version');

  const eventImageMobile = document.createElement('img');
  eventImageMobile.classList.add('about-the-event-image');
  eventImageMobile.src = event.logo;
  eventImageMobile.alt = '';

  const eventDescriptionMobile = document.createElement('p');
  eventDescriptionMobile.innerText = event.description;

  const buttonsMobile = document.createElement('div');
  buttonsMobile.classList.add('about-the-event-buttons');

  const linkButtonMobile = document.createElement('div');
  linkButtonMobile.classList.add('link-to-event-button');
  linkButtonMobile.innerText = 'Link to Event';

  const calendarButtonMobile = document.createElement('div');
  calendarButtonMobile.classList.add('add-to-calendar-button');
  calendarButtonMobile.classList.add('calendar-button');
  calendarButtonMobile.innerText = 'Add to Calendar';

  buttonsMobile.append(linkButtonMobile, calendarButtonMobile);

  const eventLocationMobile = document.createElement('div');
  eventLocationMobile.classList.add('event-location');
  eventLocationMobile.innerHTML = `
    <svg class="location-icon" width="9" height="24" viewBox="0 0 9 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.81322 17.6047C0.596992 12.9421 0 12.4636 0 10.75C0 8.40278 1.90278 6.5 4.25 6.5C6.59722 6.5 8.5 8.40278 8.5 10.75C8.5 12.4636 7.90301 12.9421 4.68678 17.6047C4.47571 17.9096 4.02426 17.9095 3.81322 17.6047ZM4.25 12.5208C5.22801 12.5208 6.02083 11.728 6.02083 10.75C6.02083 9.77199 5.22801 8.97917 4.25 8.97917C3.27199 8.97917 2.47917 9.77199 2.47917 10.75C2.47917 11.728 3.27199 12.5208 4.25 12.5208Z" fill="#999999"></path>
    </svg>
    <p>${event.location}</p>
  `;

  aboutEventMobile.append(eventImageMobile, eventDescriptionMobile, buttonsMobile, eventLocationMobile);
  eventBar.appendChild(aboutEventMobile);

  const aboutEvent = document.createElement('div');
  aboutEvent.classList.add('about-the-event');

  const eventImage = document.createElement('img');
  eventImage.classList.add('about-the-event-image');
  eventImage.src = event.logo;
  eventImage.alt = '';

  const eventDescription = document.createElement('p');
  eventDescription.innerText = event.description;

  const buttons = document.createElement('div');
  buttons.classList.add('about-the-event-buttons');

  const linkButton = document.createElement('div');
  linkButton.classList.add('link-to-event-button');
  linkButton.innerText = 'Link to Event';

  const calendarButton = document.createElement('div');
  calendarButton.classList.add('add-to-calendar-button');
  calendarButton.classList.add('calendar-button');
  calendarButton.innerText = 'Add to Calendar';

  buttons.append(linkButton, calendarButton);

  const eventLocation = document.createElement('div');
  eventLocation.classList.add('event-location');
  eventLocation.innerHTML = `
    <svg class="location-icon" width="9" height="24" viewBox="0 0 9 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.81322 17.6047C0.596992 12.9421 0 12.4636 0 10.75C0 8.40278 1.90278 6.5 4.25 6.5C6.59722 6.5 8.5 8.40278 8.5 10.75C8.5 12.4636 7.90301 12.9421 4.68678 17.6047C4.47571 17.9096 4.02426 17.9095 3.81322 17.6047ZM4.25 12.5208C5.22801 12.5208 6.02083 11.728 6.02083 10.75C6.02083 9.77199 5.22801 8.97917 4.25 8.97917C3.27199 8.97917 2.47917 9.77199 2.47917 10.75C2.47917 11.728 3.27199 12.5208 4.25 12.5208Z" fill="#999999"></path>
    </svg>
    <p>${event.location}</p>
  `;

  aboutEvent.append(eventImage, eventDescription, buttons, eventLocation);
  eventBar.appendChild(aboutEvent);

  mainContent.appendChild(eventBar);
}

window.addEventListener('load', () => {
  document.addEventListener('click', event => {

  });

  document.addEventListener('mouseover', event => {
    
  });
});