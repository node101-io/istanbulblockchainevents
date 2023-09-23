const VENUE_COUNT = 7;

const Venue = require('../../../models/venue/Venue');

module.exports = (req, res) => {
  req.query.limit = VENUE_COUNT;

  Venue.findVenueCountByFilters(req.query, (err, count) => {
    if (err) return res.redirect('/')

    Venue.findVenuesByFilters(req.query, (err, data) => {
      if (err) return res.redirect('/')

      res.render('venue/index', {
        page: 'venue/index',
        title: 'İstanbul Blockchain Events',
        includes: {
          external: {
            css: ['general', 'header', 'page'],
            js: ['ancestorWithClassName', 'collapsingSideBar', 'header', 'page', 'serverRequest', 'venue', 'toggleBarContent']
          },
          meta:{
            title: 'İstanbul Blockchain Events',
            description: 'All blockchain events in Istanbul',
            image: '/img/meta/header.png',
            twitter: true
          }
        },
        url: '/venue',
        count,
        venues: data.venues,
        venues_limit: data.limit,
        venues_page: data.page
      });
    });
  });
};
