const EVENT_COUNT = 5;

const Event = require('../../../models/event/Event');

module.exports = (req, res) => {
  req.body.limit = EVENT_COUNT;

  Event.findEventsByFilters(req.body, (err, events_data) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({
      success: true,
      search: events_data.search,
      limit: events_data.limit,
      page: events_data.page,
      events: events_data.events
    });
  });
};