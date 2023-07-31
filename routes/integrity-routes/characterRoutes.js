const express = require('express');
const router = express.Router();
const characterController = require('../../controller/integrity-controller/characterController');
const tokenValidation = require('../../middleware/tokenValidation');

// get player's character
router.get(
  '/',
  tokenValidation.validateToken,
  characterController.getCharacter
);

module.exports = router;
