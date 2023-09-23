const express = require('express');

const router = express.Router();

const generateConstantData = require('../middleware/generateConstantData');

const guideGetController = require('../controllers/guide/get');

router.get(
  '/',
    generateConstantData,
    guideGetController
);

module.exports = router;
