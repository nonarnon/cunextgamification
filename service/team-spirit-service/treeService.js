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

module.exports.getSelfTree = async (userID) => {
  try {
    const player = await knex('players')
      .select()
      .where('user_id', userID)
      .first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    const tree = await knex('trees')
      .select()
      .where('player_id', player.player_id)
      .first();

    return tree;
  } catch (error) {
    console.error('Something went wrong: Service => getSelfTree', error);
    throw new Error(error);
  }
};

module.exports.getFriendTree = async (userID, { player_name }) => {
  try {
    const player = await knex('players')
      .select()
      .where('user_id', userID)
      .first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    // find friend
    const friend = await knex('players')
      .select()
      .where('player_name', player_name)
      .first();
    if (!friend) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    const tree = await knex('trees')
      .select()
      .where('player_id', friend.player_id)
      .first();

    return tree;
  } catch (error) {
    console.error('Something went wrong: Service => getFriendTree', error);
    throw new Error(error);
  }
};

module.exports.getHelpHistory = async (userID) => {
  try {
    const player = await knex('players')
      .select()
      .where('user_id', userID)
      .first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    const tree = await knex('trees')
      .select()
      .where('player_id', player.player_id)
      .first();

    const history = await knex('water')
      .select()
      .where('tree_id', tree.tree_id)
      .where('water_type_id', 2);

    return history;
  } catch (error) {
    console.error('Something went wrong: Service => getHelpHistory', error);
    throw new Error(error);
  }
};
