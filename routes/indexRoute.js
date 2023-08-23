const express = require('express');

const router = express.Router();

const generateConstantData = require('../middleware/generateConstantData');

const guideGetController = require('../controllers/index/guide/get');
const indexGetController = require('../controllers/index/index/get');
const venueGetController = require('../controllers/index/venue/get');

router.get(
  '/',
    generateConstantData,
    indexGetController
);
router.get(
  '/guide',
    generateConstantData,
    guideGetController
);
router.get(
  '/venue',
    generateConstantData,
    venueGetController
);

module.exports = router;
