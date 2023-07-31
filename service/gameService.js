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

module.exports.createGameType = async (gameTypeData) => {
  try {
    await knex('game_type').insert(gameTypeData);

    // Fetch and return the game type
    const gameTypes = await knex('game_type')
      .where('game_type_id', gameTypeData.game_type_id)
      .first();
    return gameTypes;
  } catch (error) {
    console.error('Something went wrong: Service => createGameType', error);
    throw new Error(error);
  }
};

module.exports.createGame = async (gameData) => {
  try {
    gameData.game_id = translator.generate();
    await knex('games').insert(gameData);

    // Fetch and return the game type
    const games = await knex('games')
      .where('game_id', gameData.game_id)
      .first();
    return games;
  } catch (error) {
    console.error('Something went wrong: Service => createGame', error);
    throw new Error(error);
  }
};

module.exports.getAllGames = async ({ skip = 0, limit = 10 }) => {
  try {
    const games = await knex('games')
      .select()
      .orderBy('game_type_id', 'asc')
      .offset(parseInt(skip))
      .limit(parseInt(limit));
    return games;
  } catch (error) {
    console.error('Something went wrong: Service => getAllGames', error);
    throw new Error(error);
  }
};
