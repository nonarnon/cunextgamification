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

const playerService = require('../../service/playerService');

module.exports.getItems = async (userID) => {
  try {
    const player = await knex('players').where('user_id', userID).first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    const items = await knex('running_game_items').select();

    return items;
  } catch (error) {
    console.error('Something went wrong: Service => getItems', error);
    throw new Error(error);
  }
};

module.exports.collectItem = async (userID, { item_id }) => {
  try {
    const player = await knex('players')
      .select()
      .where('user_id', userID)
      .first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }
    const item = await knex('running_game_items')
      .select()
      .where('item_id', item_id)
      .first();

    // update stars
    if (item.item_value === 0) {
      return constants.itemMessage.ITEM_BOMB;
    }

    console.log('stars: ', player.player_star);
    console.log('item_value: ', item.item_value);
    const remainStars = player.player_star + item.item_value;
    console.log('Remaining stars: ', remainStars);
    playerService.updateStars(userID, remainStars);

    return item;
  } catch (error) {
    console.error('Something went wrong: Service => collectItem', error);
    throw new Error(error);
  }
};
