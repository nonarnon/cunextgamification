const express = require('express');
const router = express.Router();
const levelController = require('../../controller/integrity-controller/levelController');
const tokenValidation = require('../../middleware/tokenValidation');

router.get('/', tokenValidation.validateToken, levelController.getLevel);

module.exports = router;
