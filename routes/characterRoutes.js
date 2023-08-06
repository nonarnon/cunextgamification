const express = require('express');
const router = express.Router();
const characterController = require('../controller/characterController');
const tokenValidation = require('../middleware/tokenValidation');

// get all characters
router.get(
  '/all',
  tokenValidation.validateToken,
  characterController.getAllCharacters
);

// get all characters' decoration
router.get(
  '/appearances',
  tokenValidation.validateToken,
  characterController.getAllAppearances
);

module.exports = router;
