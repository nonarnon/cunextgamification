const express = require('express');
const router = express.Router();
const levelController = require('../../controller/integrity-controller/levelController');
const joiSchemaValidation = require('../../middleware/joiSchemaValidation');
const tokenValidation = require('../../middleware/tokenValidation');
const levelSchema = require('../../apiSchema/integrity-schema/levelSchema');

router.get('/', tokenValidation.validateToken, levelController.getLevel);

router.get(
  '/gameover',
  tokenValidation.validateToken,
  joiSchemaValidation.validationBody(levelSchema.getLevelIDSchema),
  levelController.gameOver
);

module.exports = router;
