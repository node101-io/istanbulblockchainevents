const bars = document.querySelectorAll('body .all-content .bottom-content .main-content .event-bar');

bars.forEach(bar => {
  bar.addEventListener('click', () => {
      bar.classList.toggle('clicked');
      bar.querySelector('.about-the-event').classList.toggle('show');
  });
});