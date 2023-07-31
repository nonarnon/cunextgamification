const express = require('express');
const router = express.Router();
const gameController = require('../controller/gameController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const tokenValidation = require('../middleware/tokenValidation');
const gameSchema = require('../apiSchema/gameSchema');

// create game
router.post(
  '/create',
  tokenValidation.validateToken,
  joiSchemaValidation.validationBody(gameSchema.createGameSchema),
  gameController.createGame
);

// create game type
router.post(
  '/createType',
  tokenValidation.validateToken,
  joiSchemaValidation.validationBody(gameSchema.createGameTypeSchema),
  gameController.createGameType
);

// select all games
router.get(
  '/all',
  tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(gameSchema.getAllGameSchema),
  gameController.getAllGames
);

module.exports = router;
