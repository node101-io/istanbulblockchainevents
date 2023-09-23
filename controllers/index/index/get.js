const EVENT_COUNT = 7;
const SLIDER_EVENT_COUNT = 4;

const Event = require('../../../models/event/Event');

module.exports = (req, res) => {
  Event.findEventsByFilters({
    limit: SLIDER_EVENT_COUNT,
    is_slider: true
  }, (err, slider_data) => {
    if (err) return res.redirect('/error?message=' + err);

    Event.findEventsByFilters({
      limit: EVENT_COUNT
    }, (err, events_data) => {
      if (err) return res.redirect('/error?message=' + err);

      return res.render('index/index', {
        page: 'index/index',
        title: 'İstanbul Blockchain Events',
        includes: {
          external: {
            css: ['general', 'header', 'page'],
            js: ['ancestorWithClassName', 'collapsingSideBar', 'event', 'filterEvents', 'header', 'page', 'serverRequest', 'toggleBarContent']
          },
          meta:{
            title: 'İstanbul Blockchain Events',
            description: 'All blockchain events in Istanbul',
            image: '/img/meta/header.png',
            twitter: true
          }
        },
        url: '/',
        slider: slider_data.events,
        events: events_data.events,
        events_search: events_data.events_search
      });
    });
  });
};
