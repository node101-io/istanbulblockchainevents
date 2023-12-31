const express = require('express');

const router = express.Router();

const generateConstantData = require('../middleware/generateConstantData');

const indexGetController = require('../controllers/index/index/get');

const filterPostController = require('../controllers/index/filter/post');

router.get(
  '/',
    generateConstantData,
    indexGetController
);

router.post(
  '/filter',
    generateConstantData,
    filterPostController
);

module.exports = router;
