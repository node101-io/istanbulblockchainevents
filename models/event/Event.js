const async = require('async');
const mongoose = require('mongoose');
const validator = require('validator');

const getEvent = require('./functions/getEvent');
const getEventByLanguage = require('./functions/getEventByLanguage');

const DEFAULT_DOCUMENT_COUNT_PER_QUERY = 20;
const MAX_DATABASE_LONG_TEXT_FIELD_LENGTH = 1e5;
const MAX_DATABASE_TEXT_FIELD_LENGTH = 1e4;
const MAX_DOCUMENT_COUNT_PER_QUERY = 1e2;
const EVENT_TYPES = [ 'summit', 'party', 'conference', 'hackathon', 'meetup', 'workshop', 'dinner', 'brunch', 'co_living', 'co_work', 'nfts', 'tour', 'other' ]

const Schema = mongoose.Schema;

const EventSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
	},
  description: {
		type: String,
		default: null,
		trim: true,
		maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
	},
  category: {
    type: String,
    default: '',
    trim: true,
    minlength: 0,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  event_type: {
    type: String,
    default: null,
    trim: true,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  start_date: {
    type: Date,
    trim: true,
    default: null,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  end_date: {
    type: Date,
    trim: true,
    default: null,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  logo: {
		type: String,
		default: null,
		minlength: 1,
		maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
	},
  label: {
    type: String,
    default: null,
    trim: true,
    minlength: 0,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  location: {
		type: String,
		default: null,
		trim: true,
		maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
	},
	register_url: {
		type: String,
		default: null,
		trim: true,
		maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
	},
  social_media_accounts: {
		type: Object,
		default: {}
	},
  translations: {
		type: Object,
		default: {}
	},
  is_completed: {
		type: Boolean,
		default: false
	},
	search_name: { // Shadow search fields used for search queries. Includes translated values as well as real field, seperated by a space.
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: MAX_DATABASE_LONG_TEXT_FIELD_LENGTH
  },
  search_description: { // Shadow search fields used for search queries. Includes translated values as well as real field, seperated by a space.
    type: String,
    default: null,
    trim: true,
    maxlength: MAX_DATABASE_LONG_TEXT_FIELD_LENGTH
  },
	created_at: {
		type: Date,
		required: true
	},
	is_deleted: {
		type: Boolean,
		default: false
	},
  is_slider: {
    type: Boolean,
    default: false
  },
  is_side: {
    type: Boolean,
    default: false
  }
});

EventSchema.statics.findEventById = function (id, callback) {
  const Event = this;

  if (!id || !validator.isMongoId(id.toString()))
    return callback('bad_request');
  
  Event.findById(mongoose.Types.ObjectId(id.toString()), (err, event) => {
    if (err) return callback('database_error');
    if (!event) return callback('document_not_found');

    return callback(null, event);
  });
};

EventSchema.statics.findEventByIdAndFormat = function (id, callback) {
	const Event = this;

	Event.findEventById(id, (err, event) => {
		if (err) return callback(err);

		getEvent(event, (err, event) => {
			if (err) return callback(err);

			return callback(null, event);
		});
	});
};

EventSchema.statics.findEventByIdAndFormatByLanguage = function (id, language, callback) {
  const Event = this;

  if (!language || !validator.isISO31661Alpha2(language.toString()))
    return callback('bad_request');

  Event.findEventById(id, (err, event) => {
    if (err) return callback(err);

    if (!event.is_completed)
      return callback('not_authenticated_request')

    getEventByLanguage(event, language, (err, event) => {
      if (err) return callback(err);

      return callback(null, event)
    });
  });
};

EventSchema.statics.findEventsByFilters = function (data, callback) {
  const Event = this;

  if (!data || typeof data != 'object')
    return callback('bad_request');

  const filters = {
    is_completed: true,
    is_deleted: false,
    $or: [
      { start_date: { $gte: new Date('2023-12-1') } },
      { end_date: { $lte: new Date() } }
    ]
  };

  const limit = data.limit && !isNaN(parseInt(data.limit)) && parseInt(data.limit) > 0 && parseInt(data.limit) < MAX_DOCUMENT_COUNT_PER_QUERY ? parseInt(data.limit) : DEFAULT_DOCUMENT_COUNT_PER_QUERY;
  const page = data.page && !isNaN(parseInt(data.page)) && parseInt(data.page) > 0 ? parseInt(data.page) : 0;
  const skip = page * limit;

  if ('is_deleted' in data)
    filters.is_deleted = data.is_deleted ? true : false;

  if ('is_slider' in data)
    filters.is_slider = data.is_slider ? true : false;

  if ('is_side' in data)
    filters.is_side = data.is_side ? true : false;

  if (data.name && typeof data.name == 'string' && data.name.trim().length && data.name.trim().length < MAX_DATABASE_TEXT_FIELD_LENGTH)
    filters.name = { $regex: data.name.trim(), $options: 'i' };

  if (data.event_type && typeof data.event_type == 'string' && EVENT_TYPES.includes(data.event_type))
    filters.event_type = data.event_type;

  if (data.date_after && typeof data.date_after == 'string' && !isNaN(new Date(data.date_after)))
    filters.start_date = { $gte: new Date(data.date_after) };

  if (data.date_before && typeof data.date_before == 'string' && !isNaN(new Date(data.date_before)))
    filters.start_date = { $lte: new Date(data.date_before) };

  if (data.location && typeof data.location == 'string' && data.location.trim().length && data.location.trim().length < MAX_DATABASE_TEXT_FIELD_LENGTH)
    filters.location = { $regex: data.location.trim(), $options: 'i' };

  if (!data.search || typeof data.search != 'string' || !data.search.trim().length) {
    Event
      .find(filters)
      .sort({
        start_date: 1,
        end_date: -1,
        name: 1
      })
      .limit(limit)
      .skip(skip)
      .then(events => async.timesSeries(
        events.length,
        (time, next) => Event.findEventByIdAndFormat(events[time]._id, (err, event) => next(err, event)),
        (err, events) => {
          if (err) return callback(err);

          return callback(null, {
            search: null,
            limit,
            page,
            events
          });
        })
      )
      .catch(err => callback(0, err));
  } else {
    filters.$text = { $search: data.search.trim() };

    Event
      .find(filters)
      .sort({
        start_date: 1,
        end_date: -1,
        name: 1
      })
      .limit(limit)
      .skip(skip)
      .then(events => async.timesSeries(
        events.length,
        (time, next) => Event.findEventByIdAndFormat(events[ time ]._id, (err, event) => next(err, event)),
        (err, events) => {
          if (err) return callback(err);

          return callback(null, {
            search: data.search.trim(),
            limit,
            page,
            events
          });
        })
      )
      .catch(err => callback(1, err));
  };
};

EventSchema.statics.findEventCountByFilters = function (data, callback) {
	const Event = this;

	if (!data || typeof data != 'object')
    return callback('bad_request');

  const filters = {
    is_completed: true,
    is_deleted: false
  };

  if ('is_deleted' in data)
    filters.is_deleted = data.is_deleted ? true : false;

  if (data.name && typeof data.name == 'string' && data.name.trim().length && data.name.trim().length < MAX_DATABASE_TEXT_FIELD_LENGTH)
    filters.name = { $regex: data.name.trim(), $options: 'i'};

  if (data.event_type && typeof data.event_type == 'string' && data.event_type.trim().length && data.event_type.trim().length < MAX_DATABASE_TEXT_FIELD_LENGTH)
    filters.event_type = { $regex: data.event_type.trim(), $options: 'i' };

  if (data.date_after && typeof data.date_after == 'string' && !isNaN(new Date(data.date_after)))
    filters.start_date = { $gte: new Date(data.date_after) };

  if (data.date_before && typeof data.date_before == 'string' && !isNaN(new Date(data.date_before)))
    filters.start_date = { $lte: new Date(data.date_before) };

  if (data.location && typeof data.location == 'string' && data.location.trim().length && data.location.trim().length < MAX_DATABASE_TEXT_FIELD_LENGTH)
    filters.location = { $regex: data.location.trim(), $options: 'i' };

  if (!data.search || typeof data.search != 'string' || !data.search.trim().length) {
    Event
      .find(filters)
      .countDocuments()
      .then(count => callback(null, count))
      .catch(_ => callback('database_error'));
  } else {
    filters.$text = { $search: data.search.trim() }

    Event
      .find(filters)
      .countDocuments()
      .then(count => callback(null, count))
      .catch(_ => callback('database_error'));
  };
};

module.exports = mongoose.model('Event', EventSchema);