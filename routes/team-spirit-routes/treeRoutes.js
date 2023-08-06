const express = require('express');
const router = express.Router();
const treeController = require('../../controller/team-spirit-controller/treeController');
const joiSchemaValidation = require('../../middleware/joiSchemaValidation');
const tokenValidation = require('../../middleware/tokenValidation');
const playerSchema = require('../../apiSchema/playerSchema');

// get self tree
router.get(
  '/self',
  tokenValidation.validateToken,
  treeController.getSelfTreeData
);

// get friend's tree
router.get(
  '/friend',
  tokenValidation.validateToken,
  joiSchemaValidation.validationBody(playerSchema.getPlayerNameSchema),
  treeController.getFriendTreeData
);

// get tree's help history
router.get(
  '/history',
  tokenValidation.validateToken,
  treeController.getHelpHistory
);

// harvest coins, update coins, delete used water
router.put(
  '/harvest',
  tokenValidation.validateToken,
  treeController.harvestCoins
);

module.exports = router;
