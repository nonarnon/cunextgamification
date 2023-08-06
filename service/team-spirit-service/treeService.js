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

module.exports.getSelfTreeData = async (userID) => {
  try {
    const player = await knex('players')
      .select()
      .where('user_id', userID)
      .first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    const tree = await knex('trees')
      .select('trees.tree_id', 'trees.player_id', 'player_name', 'player_level')
      .count('water.tree_id as acc_water')
      .join('players', 'trees.player_id', 'players.player_id')
      .leftJoin('water', 'trees.tree_id', 'water.tree_id')
      .where('players.player_id', player.player_id)
      .first();

    return tree;
  } catch (error) {
    console.error('Something went wrong: Service => getSelfTreeData', error);
    throw new Error(error);
  }
};

module.exports.getFriendTreeData = async (userID, { player_name }) => {
  try {
    const player = await knex('players')
      .select()
      .where('user_id', userID)
      .first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    const tree = await knex('trees')
      .select('trees.tree_id', 'trees.player_id', 'player_name', 'player_level')
      .count('water.tree_id as acc_water')
      .join('players', 'trees.player_id', 'players.player_id')
      .join('water', 'trees.tree_id', 'water.tree_id')
      .where('players.player_name', player_name)
      .first();

    return tree;
  } catch (error) {
    console.error('Something went wrong: Service => getFriendTreeData', error);
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

    const history = await knex('trees')
      .select('player_name', 'used_at')
      .join('players', 'trees.player_id', 'players.player_id')
      .join('water', 'trees.tree_id', 'water.tree_id')
      .where('players.player_id', player.player_id)
      .where('water.water_type_id', 2);

    return history;
  } catch (error) {
    console.error('Something went wrong: Service => getHelpHistory', error);
    throw new Error(error);
  }
};

module.exports.harvestCoins = async (userID) => {
  try {
    const player = await knex('players')
      .select()
      .where('user_id', userID)
      .first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    // update coins
    let receivedCoins = 5;
    const remainCoins = player.player_coin + receivedCoins;
    playerService.updatePlayerData(userID, { player_coin: remainCoins });

    const tree = await knex('trees')
      .select()
      .where('player_id', player.player_id)
      .first();

    await knex('water').where('tree_id', tree.tree_id).del();
    console.log(constants.waterMessage.WATER_DELETED);

    return { nowStar: remainCoins };
  } catch (error) {
    console.error('Something went wrong: Service => harvestCoins', error);
    throw new Error(error);
  }
};
