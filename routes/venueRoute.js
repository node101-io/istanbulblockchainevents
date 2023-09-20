const express = require('express');

const router = express.Router();

const generateConstantData = require('../middleware/generateConstantData');

const venueGetController = require('../controllers/venue/index/get');

const filterPostController = require('../controllers/venue/filter/post');

router.get(
  '/',
    generateConstantData,
    venueGetController
);

router.post(
  '/filter',
    generateConstantData,
    filterPostController
);

module.exports = router;
