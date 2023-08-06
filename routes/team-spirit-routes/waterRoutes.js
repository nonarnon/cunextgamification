const express = require('express');
const router = express.Router();
const waterController = require('../../controller/team-spirit-controller/waterController');
const joiSchemaValidation = require('../../middleware/joiSchemaValidation');
const tokenValidation = require('../../middleware/tokenValidation');
const treeSchema = require('../../apiSchema/team-spirit-schema/treeSchema');
const playerSchema = require('../../apiSchema/playerSchema');

// get all water for selfs
router.get(
  '/self',
  tokenValidation.validateToken,
  waterController.getSelfWater
);

// get all water for friends
router.get(
  '/help',
  tokenValidation.validateToken,
  waterController.getHelpWater
);

// update water when watering
router.put(
  '/water-tree',
  tokenValidation.validateToken,
  joiSchemaValidation.validationBody(treeSchema.getTreeIDSchema),
  waterController.waterTree
);

router.post('/generate', waterController.generateDailyWater);

router.delete('/delete', waterController.deleteOldWater);

module.exports = router;
