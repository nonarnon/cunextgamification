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

const playerService = require('../playerService');

module.exports.getLevel = async (userID) => {
  try {
    const player = await knex('players').where('user_id', userID).first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    const levels = await knex('running_game_level').select();

    return levels;
  } catch (error) {
    console.error('Something went wrong: Service => getLevel', error);
    throw new Error(error);
  }
};

module.exports.gameOver = async (userID, { level_id }) => {
  try {
    const player = await knex('players')
      .select()
      .where('user_id', userID)
      .first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    const reward = await knex('running_game_level')
      .select('level_reward')
      .where('level_id', level_id)
      .first();

    // update scores
    const remainScores = player.player_score + reward.level_reward;
    playerService.updatePlayerData(userID, { player_score: remainScores });

    return { nowScore: remainScores };
  } catch (error) {
    console.error('Something went wrong: Service => gameOver', error);
    throw new Error(error);
  }
};
