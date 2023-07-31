const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const tokenValidation = require('../middleware/tokenValidation');
const userSchema = require('../apiSchema/userSchema');

// create user
router.post(
  '/create',
  tokenValidation.validateToken,
  joiSchemaValidation.validationBody(userSchema.createUserSchema),
  userController.createUser
);

// login
router.post(
  '/login',
  joiSchemaValidation.validationBody(userSchema.loginSchema),
  userController.login
);

// select all users
router.get(
  '/all',
  tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(userSchema.getAllUserSchema),
  userController.getAllUsers
);

// search user by ID
router.get(
  '/profile',
  tokenValidation.validateToken,
  userController.getUserByID
);

// update user information by ID
router.put(
  '/update',
  tokenValidation.validateToken,
  joiSchemaValidation.validationBody(userSchema.updateUserSchema),
  userController.updateUser
);

// delete user by ID
router.delete('/', tokenValidation.validateToken, userController.deleteUser);

module.exports = router;
