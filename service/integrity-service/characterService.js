const constants = require('../../constants');
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  },
});

module.exports.getCharacter = async (userID) => {
  try {
    const player = await knex('players')
      .select()
      .where('user_id', userID)
      .first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    const character = await knex('character')
      .select()
      .where('character_id', player.player_character)
      .first();

    return character;
  } catch (error) {
    console.error('Something went wrong: Service => getItems', error);
    throw new Error(error);
  }
};
