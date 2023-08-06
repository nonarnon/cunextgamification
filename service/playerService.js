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

const waterService = require('./team-spirit-service/waterService');

module.exports.register = async (userID, playerData) => {
  try {
    // Check if the userID is registered
    const user = await knex('users').where('user_id', userID).first();
    if (!user) {
      throw new Error('Invalid user ID.');
    }

    // Check if the user has already registered as a player
    const existingPlayer = await knex('players')
      .where('user_id', userID)
      .first();
    if (existingPlayer) {
      throw new Error('You have already registered as a player');
    }

    // Check if the player name already exists
    const player = await knex('players')
      .where('player_name', playerData.player_name)
      .first();
    if (player) {
      throw new Error(constants.playerMessage.PLAYER_EXISTED);
    }

    const playerNameRegex = /^[a-zA-Z0-9.\-_!@#$%^&*()+=?<>{}[\]:;"'|]{8,}$/;
    if (!playerNameRegex.test(playerData.player_name)) {
      throw new Error(constants.playerMessage.PLAYER_NAME_INVALID);
    }

    // insert player's profile
    playerData.player_id = translator.generate();
    playerData.user_id = userID;
    await knex('players').insert(playerData);
    const registeredPlayer = await knex('players').where(
      'player_id',
      playerData.player_id
    );
    console.log('Registered Player: ', registeredPlayer);

    // insert player's tree
    const newTree = {
      tree_id: translator.generate(),
      player_id: playerData.player_id,
    };
    console.log('New Tree:', newTree);
    await knex('trees').insert(newTree);
    console.log(constants.treeMessage.TREE_CREATED);

    // insert player's water
    const waterAmount = 5;
    let waterType = 1;
    waterService.createWater(userID, waterAmount, waterType);
    console.log('Self Water Created Successfully');

    // and insert water for friends
    waterType = 2;
    waterService.createWater(userID, waterAmount, waterType);
    console.log('Help Water Created Successfully');

    return registeredPlayer;
  } catch (error) {
    console.error('Something went wrong: Service => register', error);
    throw new Error(error);
  }
};

module.exports.getAllPlayers = async ({ skip = 0, limit = 10 }) => {
  try {
    const players = await knex('players')
      .select()
      .offset(parseInt(skip))
      .limit(parseInt(limit));
    return players;
  } catch (error) {
    console.error('Something went wrong: Service => getAllPlayers', error);
    throw new Error(error);
  }
};

module.exports.getPlayerByID = async (userID) => {
  try {
    const player = await knex('players')
      .select(
        'players.*',
        'character_name',
        'character_front',
        'character_back'
      )
      .join('character', 'character.character_id', 'players.player_character')
      .where('user_id', userID)
      .first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }
    return player;
  } catch (error) {
    console.error('Something went wrong: Service => getPlayerByID', error);
    throw new Error(error);
  }
};

module.exports.rankOrderByScore = async ({ skip, limit }) => {
  try {
    const rank = await knex('players')
      .select('player_name', 'player_score')
      .orderBy('player_score', 'desc')
      .offset(parseInt(skip))
      .limit(parseInt(limit));

    return rank;
  } catch (error) {
    console.error('Something went wrong: Service => getPlayerByID', error);
    throw new Error(error);
  }
};

module.exports.calculatePlayerRank = async (userID) => {
  try {
    // Get the user's score and player name
    const player = await knex('players')
      .where('user_id', userID)
      .select('player_name', 'player_score')
      .first();

    // Calculate the user's rank
    const allRank = await knex('players')
      .select('player_name', 'player_score')
      .orderBy('player_score', 'desc');
    const myRank =
      allRank.findIndex(
        (players) => players.player_score === player.player_score
      ) + 1;

    // Create the myRank object with user's player name, score, and rank
    const myRankObject = {
      ...player,
      rank: myRank,
    };

    return myRankObject;
  } catch (error) {
    console.error(
      'Something went wrong: Service => calculatePlayerRank',
      error
    );
    throw new Error(error);
  }
};

module.exports.updatePlayer = async (userID, updateData) => {
  try {
    // Check if the player exists
    const player = await knex('players').where('user_id', userID).first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    // Check if the player name already exists
    const playerName = await knex('players')
      .where('player_name', updateData.player_name)
      .whereNot('user_id', userID)
      .first();
    if (playerName) {
      throw new Error(constants.playerMessage.PLAYER_EXISTED);
    }

    // Update the player information
    const updatedPlayer = await knex('players')
      .where('user_id', userID)
      .update(updateData);
    if (!updatedPlayer) {
      throw new Error(constants.playerMessage.PLAYER_NOT_UPDATE);
    }

    // Fetch and return the updated player
    const updatedPlayerData = await knex('players')
      .where('user_id', userID)
      .first();
    return updatedPlayerData;
  } catch (error) {
    console.error('Something went wrong: Service => updatePlayer', error);
    throw new Error(error);
  }
};

module.exports.updatePlayerData = async (userID, dataToUpdate) => {
  try {
    // Check if the player exists
    const player = await knex('players').where('user_id', userID).first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    // Update the specific data field based on input
    const updateData = {};
    if (dataToUpdate.hasOwnProperty('player_star')) {
      updateData.player_star = dataToUpdate.player_star;
    }
    if (dataToUpdate.hasOwnProperty('player_coin')) {
      updateData.player_coin = dataToUpdate.player_coin;
    }
    if (dataToUpdate.hasOwnProperty('player_score')) {
      updateData.player_score = dataToUpdate.player_score;
    }
    await knex('players').where('user_id', userID).update(updateData);

    // Fetch and return the updated player
    const updatedPlayer = await knex('players')
      .where('user_id', userID)
      .first();
    return updatedPlayer;
  } catch (error) {
    console.error('Something went wrong: Service => updatePlayerData', error);
    throw new Error(error);
  }
};

module.exports.deletePlayer = async (userID) => {
  try {
    // Check if the player exists
    const player = await knex('players').where('user_id', userID).first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    // Delete the player
    const deletedPlayer = await knex('players').where('user_id', userID).del();
    if (!deletedPlayer) {
      throw new Error(constants.playerMessage.PLAYER_NOT_DELETE);
    }

    // Return the deleted player information if needed
    return player; // Optional: Return the deleted player information
  } catch (error) {
    console.error('Something went wrong: Service => deletePlayer', error);
    throw new Error(error);
  }
};
