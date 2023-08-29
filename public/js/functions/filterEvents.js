const eventsSection = document.querySelector("body .all-content .bottom-content .main-content");
const searchBar = document.forms['search-bar'].querySelector('input');

searchBar.addEventListener('keyup', (e) => {

  const term = e.target.value.toLowerCase();
  const events = eventsSection.getElementsByClassName("event-bar");

  Array.from(events).forEach(event => {

    const eventName = event.querySelector(".event-title");
    if(eventName.textContent.toLowerCase().indexOf(term) != -1) {
      event.style.display = 'flex';
    } else {
      event.style.display = 'none';
    }

  });

});