const express = require('express');
const router = express.Router();
const treeController = require('../../controller/team-spirit-controller/treeController');
const joiSchemaValidation = require('../../middleware/joiSchemaValidation');
const tokenValidation = require('../../middleware/tokenValidation');
const playerSchema = require('../../apiSchema/playerSchema');

router.get('/self', tokenValidation.validateToken, treeController.getSelfTree);

router.get(
  '/friend',
  tokenValidation.validateToken,
  joiSchemaValidation.validationBody(playerSchema.getPlayerNameSchema),
  treeController.getFriendTree
);

router.get(
  '/history',
  tokenValidation.validateToken,
  treeController.getHelpHistory
);

module.exports = router;
