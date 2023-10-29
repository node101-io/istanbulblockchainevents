const async = require('async');
const mongoose = require('mongoose');
const validator = require('validator');

const getVenue = require('./functions/getVenue');
const getVenueByLanguage = require('./functions/getVenueByLanguage');

const DEFAULT_DOCUMENT_COUNT_PER_QUERY = 20;
const MAX_DATABASE_LONG_TEXT_FIELD_LENGTH = 1e5;
const MAX_DATABASE_TEXT_FIELD_LENGTH = 1e4;
const MAX_DOCUMENT_COUNT_PER_QUERY = 1e2;
const DISTRICT_LIST = [ 'fatih', 'beyoglu', 'halic', 'sisli', 'besiktas', 'sariyer', 'kadikoy', 'uskudar', 'beykoz', 'adalar' ];

const Schema = mongoose.Schema;

const VenueSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 1,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  description: {
    type: String,
    default: null,
    trim: true,
    maxlength: MAX_DATABASE_LONG_TEXT_FIELD_LENGTH
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
  image: {
    type: String,
    default: null,
    minlength: 1,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  address: {
    type: String,
    default: null,
    trim: true,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  district: {
    type: String,
    default: null,
    trim: true,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  seated_capacity: {
    type: Number,
    default: null,
    minlength: 0
  },
  standing_capacity: {
    type: Number,
    default: null,
    minlength: 0
  },
  contact_number: {
    type: String,
    default: null,
    trim: true,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  contact_email: {
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
  created_at: {
		type: Date,
		required: true
	},
	is_deleted: {
		type: Boolean,
		default: false
	},
  order: {
    type: Number,
    required: true
  }
});

VenueSchema.statics.findVenueById = function (id, callback) {
  const Venue = this;

  if (!id || !validator.isMongoId(id.toString()))
    return callback('bad_request');

  Venue.findById(mongoose.Types.ObjectId(id.toString()), (err, venue) => {
    if (err) return callback('database_error');
    if (!venue) return callback('document_not_found');

    return callback(null, venue);
  })
};

VenueSchema.statics.findVenueByIdAndFormat = function (id, callback) {
  const Venue = this;

  Venue.findVenueById(id, (err, venue) => {
    if (err) return callback(err);

    getVenue(venue, (err, venue) => {
      if (err) return callback(err);

      return callback(null, venue);
    });
  });
};

VenueSchema.statics.findVenueByIdAndFormatByLanguage = function (id, language, callback) {
  const Venue = this;

  if (!language || !validator.isISO639Alpha2(language.toString()))
    return callback('bad_request');

  Venue.findVenueById(id, (err, venue) => {
    if (err) return callback(err);

    if (!venue.is_completed)
      return callback('not_authenticated_request');

    getVenueByLanguage(venue, language, (err, venue) => {
      if (err) return callback(err);

      return callback(null, venue);
    });
  });
};

VenueSchema.statics.findVenuesByFilters = function (data, callback) {
  const Venue = this;

  if (!data || typeof data != 'object')
    return callback('bad_request');

  const filters = {
    is_completed: true,
    is_deleted: false
  };

  const limit = data.limit && !isNaN(parseInt(data.limit)) && parseInt(data.limit) > 0 && parseInt(data.limit) < MAX_DOCUMENT_COUNT_PER_QUERY ? parseInt(data.limit) : DEFAULT_DOCUMENT_COUNT_PER_QUERY;
  const page = data.page && !isNaN(parseInt(data.page)) && parseInt(data.page) > 0 ? parseInt(data.page) : 0;
  const skip = page * limit;

  if ('is_deleted' in data)
    filters.is_deleted = data.is_deleted ? true : false;

  if (data.name && typeof data.name == 'string' && data.name.trim().length && data.name.trim().length < MAX_DATABASE_TEXT_FIELD_LENGTH)
    filters.name = { $regex: data.name.trim(), $options: 'i' };

  if (data.district && typeof data.district == 'string' && DISTRICT_LIST.includes(data.district))
    filters.district = data.district;

  if (data.districts && Array.isArray(data.districts) && data.districts.length && data.districts.length < MAX_DOCUMENT_COUNT_PER_QUERY)
    filters.district = { $in: data.districts };

  if (data.more_seated_capacity && !isNaN(parseInt(data.more_seated_capacity)) && parseInt(data.more_seated_capacity) > 0)
    filters.seated_capacity = { $gte: parseInt(data.more_seated_capacity) };

  if (data.less_seated_capacity && !isNaN(parseInt(data.less_seated_capacity)) && parseInt(data.less_seated_capacity) > 0)
    filters.seated_capacity = { $lte: parseInt(data.less_seated_capacity) };

  if (data.more_standing_capacity && !isNaN(parseInt(data.more_standing_capacity)) && parseInt(data.more_standing_capacity) > 0)
    filters.standing_capacity = { $gte: parseInt(data.more_standing_capacity) };

  if (data.less_standing_capacity && !isNaN(parseInt(data.less_standing_capacity)) && parseInt(data.less_standing_capacity) > 0)
    filters.standing_capacity = { $lte: parseInt(data.less_standing_capacity) };

  if (!data.search || typeof data.search != 'string' || !data.search.trim().length) {
    Venue
      .find(filters)
      .sort({ order: -1 })
      .limit(limit)
      .skip(skip)
      .then(venues => async.timesSeries(
        venues.length,
        (time, next) => Venue.findVenueByIdAndFormat(venues[time]._id, (err, venue) => next(err, venue)),
        (err, venues) => {
          if (err) return callback(err);

          return callback(null, {
            search: null,
            limit,
            page,
            venues
          });
        })
      )
      .catch(_ => callback('database_error'));
  } else {
    filters.$text = { $search: data.search.trim() };
    
    Venue
      .find(filters)
      .sort({ 
        score: { $meta: 'textScore' },
        order: -1
      })
      .limit(limit)
      .skip(skip)
      .then(venues => async.timesSeries(
        venues.length,
        (time, next) => Venue.findVenueByIdAndFormat(venues[time]._id, (err, venue) => next(err, venue)),
        (err, venues) => {
          if (err) return callback(err);

          return callback(null, {
            search: data.search.trim(),
            limit,
            page,
            venues
          });
        })
      )
      .catch(_ => callback('database_error'));
  };
}; 

VenueSchema.statics.findVenueCountByFilters = function (data, callback) {
  const Venue = this;

  if (!data || typeof data != 'object')
    return callback('bad_request');

  const filters = {
    is_completed: true,
    is_deleted: false
  };

  if ('is_deleted' in data)
    filters.is_deleted = data.is_deleted ? true : false;

  if (data.name && typeof data.name == 'string' && data.name.trim().length && data.name.trim().length < MAX_DATABASE_TEXT_FIELD_LENGTH)
    filters.name = { $regex: data.name.trim(), $options: 'i' };

  if (data.district && typeof data.district == 'string' && DISTRICT_LIST.includes(data.district))
    filters.district = data.district;

  if (data.districts && Array.isArray(data.districts) && data.districts.length && data.districts.length < MAX_DOCUMENT_COUNT_PER_QUERY)
    filters.district = { $in: data.districts };

  if (data.more_seated_capacity && !isNaN(parseInt(data.more_seated_capacity)) && parseInt(data.more_seated_capacity) > 0)
    filters.seated_capacity = { $gte: parseInt(data.more_seated_capacity) };

  if (data.less_seated_capacity && !isNaN(parseInt(data.less_seated_capacity)) && parseInt(data.less_seated_capacity) > 0)
    filters.seated_capacity = { $lte: parseInt(data.less_seated_capacity) };

  if (data.more_standing_capacity && !isNaN(parseInt(data.more_standing_capacity)) && parseInt(data.more_standing_capacity) > 0)
    filters.standing_capacity = { $gte: parseInt(data.more_standing_capacity) };

  if (data.less_standing_capacity && !isNaN(parseInt(data.less_standing_capacity)) && parseInt(data.less_standing_capacity) > 0)
    filters.standing_capacity = { $lte: parseInt(data.less_standing_capacity) };

  if (!data.search || typeof data.search != 'string' || !data.search.trim().length) {
    Venue
      .find(filters)
      .countDocuments()
      .then(count => callback(null, count))
      .catch(_ => callback('database_error'));
  } else {
    filters.$text = { $search: data.search.trim() };
    Venue
      .find(filters)
      .countDocuments()
      .then(count => callback(null, count))
      .catch(_ => callback('database_error'));
  }
};

module.exports = mongoose.model('Venue', VenueSchema);