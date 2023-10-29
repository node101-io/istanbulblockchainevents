const VENUE_COUNT = 7;

const Venue = require('../../../models/venue/Venue');

module.exports = (req, res) => {
  req.body.limit = VENUE_COUNT;

  Venue.findVenuesByFilters(req.body, (err, venues_data) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({
      success: true,
      search: venues_data.search,
      limit: venues_data.limit,
      page: venues_data.page,
      venues: venues_data.venues
    });
  });
};