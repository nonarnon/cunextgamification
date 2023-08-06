const express = require('express');
const router = express.Router();
const playerController = require('../controller/playerController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const tokenValidation = require('../middleware/tokenValidation');
const playerSchema = require('../apiSchema/playerSchema');

// register
router.post(
  '/register',
  tokenValidation.validateToken,
  joiSchemaValidation.validationBody(playerSchema.registerSchema),
  playerController.register
);

// select all players
router.get(
  '/all',
  tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(playerSchema.getAllPlayerSchema),
  playerController.getAllPlayers
);

// search player by ID
router.get(
  '/profile',
  tokenValidation.validateToken,
  playerController.getPlayerByID
);

// get rank: order by score
router.get(
  '/rank',
  joiSchemaValidation.validateQueryParams(playerSchema.getRankSchema),
  playerController.rankOrderByScore
);

// get my rank: order by score
router.get(
  '/myrank',
  tokenValidation.validateToken,
  playerController.calculatePlayerRank
);

// update player information by ID
router.put(
  '/update',
  tokenValidation.validateToken,
  joiSchemaValidation.validationBody(playerSchema.updatePlayerSchema),
  playerController.updatePlayer
);

// delete player by ID
router.delete(
  '/',
  tokenValidation.validateToken,
  playerController.deletePlayer
);

module.exports = router;
