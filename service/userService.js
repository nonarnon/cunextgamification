const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const constants = require('../constants');
const shortUUID = require('short-uuid');
const translator = shortUUID();
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  },
});

module.exports.createUser = async (userData) => {
  try {
    userData.user_id = translator.generate();
    userData.password = await bcrypt.hash(userData.password, 12);
    await knex('users').insert(userData);
    const user = { ...userData, password: undefined };
    return user;
  } catch (error) {
    console.error('Something went wrong: Service => createUser', error);
    throw new Error(error);
  }
};

module.exports.getAllUsers = async ({ skip = 0, limit = 10 }) => {
  try {
    const users = await knex('users')
      .select()
      .offset(parseInt(skip))
      .limit(parseInt(limit));
    return users;
  } catch (error) {
    console.error('Something went wrong: Service => getAllUsers', error);
    throw new Error(error);
  }
};

module.exports.getUserByID = async (userID) => {
  try {
    const user = await knex('users')
      .select('user_id', 'username', 'email', 'status')
      .where('user_id', userID)
      .first();
    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }
    return user;
  } catch (error) {
    console.error('Something went wrong: Service => getUserByID', error);
    throw new Error(error);
  }
};

module.exports.updateUser = async (userID, updateData) => {
  try {
    // Check if the user exists
    const user = await knex('users').where('user_id', userID).first();
    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }

    // Update the user information
    updateData.password = await bcrypt.hash(updateData.password, 12);
    const updatedUser = await knex('users')
      .where('user_id', userID)
      .update(updateData);
    if (!updatedUser) {
      throw new Error(constants.userMessage.USER_NOT_UPDATE);
    }

    // Fetch and return the updated user
    const updatedUserData = await knex('users')
      .where('user_id', userID)
      .first();
    return updatedUserData;
  } catch (error) {
    console.error('Something went wrong: Service => updateUser', error);
    throw new Error(error);
  }
};

module.exports.deleteUser = async (userID) => {
  try {
    // Check if the user exists
    const user = await knex('users').where('user_id', userID).first();
    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }

    // Delete the user
    const deletedUser = await knex('users').where('user_id', userID).del();
    if (!deletedUser) {
      throw new Error(constants.userMessage.USER_NOT_DELETE);
    }

    // Return the deleted user information if needed
    return user; // Optional: Return the deleted user information
  } catch (error) {
    console.error('Something went wrong: Service => deleteUser', error);
    throw new Error(error);
  }
};

module.exports.login = async ({ username, password }) => {
  try {
    // Check if the user exists
    const user = await knex('users').where('username', username).first();
    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }

    // Compare the provided password with the hashed password from the database
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new Error(constants.userMessage.INVALID_PASSWORD);
    }

    const token = jwt.sign(
      { id: user.user_id },
      process.env.SECRET_KEY || 'my-secret-key',
      { expiresIn: '1d' }
    );
    return { token };
  } catch (error) {
    console.error('Something went wrong: Service => register', error);
    throw new Error(error);
  }
};
