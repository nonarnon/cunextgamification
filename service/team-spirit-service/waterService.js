const constants = require('../../constants');
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

module.exports.createWater = async (userID, waterAmount, waterType) => {
  try {
    // Check if the userID is registered
    const user = await knex('users').where('user_id', userID).first();
    if (!user) {
      throw new Error('Invalid user ID.');
    }

    const player = await knex('players')
      .select()
      .where('user_id', userID)
      .first();

    console.log('waterAmount:', waterAmount);
    console.log('waterType:', waterType);
    for (let i = 0; i < waterAmount; i++) {
      const newWater = {
        water_id: translator.generate(),
        player_id: player.player_id,
        water_type_id: waterType,
      };
      console.log('newWater:', newWater);
      await knex('water').insert(newWater);
    }

    const createdWater = await knex('water').where(
      'player_id',
      player.player_id
    );
    return createdWater;
  } catch (error) {
    console.error('Something went wrong: Service => createWater', error);
    throw new Error(error);
  }
};

module.exports.getSelfWater = async (userID) => {
  try {
    const player = await knex('players')
      .select()
      .where('user_id', userID)
      .first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    const selfWater = await knex('water')
      .count('* as water')
      .where('player_id', player.player_id)
      .where('water_type_id', 1)
      .whereNull('tree_id')
      .first();

    return selfWater;
  } catch (error) {
    console.error('Something went wrong: Service => getSelfWater', error);
    throw new Error(error);
  }
};

module.exports.getHelpWater = async (userID) => {
  try {
    const player = await knex('players')
      .select()
      .where('user_id', userID)
      .first();
    if (!player) {
      throw new Error(constants.playerMessage.PLAYER_NOT_FOUND);
    }

    const helpWater = await knex('water')
      .count('* as water')
      .where('player_id', player.player_id)
      .andWhere('water_type_id', 2)
      .whereNull('tree_id')
      .first();

    return helpWater;
  } catch (error) {
    console.error('Something went wrong: Service => getHelpWater', error);
    throw new Error(error);
  }
};

module.exports.waterTree = async (userID, { tree_id }) => {
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

    const updateWater = {
      tree_id: tree_id,
      used_at: knex.raw('CURRENT_TIMESTAMP'),
    };

    let waterType = 1; // Water type for player's water

    // Check if the tree_id is different from the player's current tree_id
    if (tree.tree_id !== tree_id) {
      waterType = 2; // Water type for help water

      // Check if water_type_id is 2 and it has been updated today
      const lastUpdateDate = await knex('water')
        .select('used_at')
        .where('player_id', player.player_id)
        .where('water_type_id', 2)
        .where('tree_id', tree_id)
        .orderBy('used_at', 'desc')
        .first();

      // Get the current date in YYYY-MM-DD format
      const currentDate = new Date().toISOString().slice(0, 10);

      // Check if the last update was made on the current date
      if (
        lastUpdateDate &&
        lastUpdateDate.used_at.toISOString().slice(0, 10) === currentDate
      ) {
        return 'This Tree Have Already Watered';
      }
    }

    // Find the row to be updated based on waterType, player_id, and tree_id conditions
    const rowToUpdate = await knex('water')
      .where('player_id', player.player_id)
      .where('water_type_id', waterType)
      .whereNull('tree_id')
      .first();

    // If there is no row to update, return a specific message
    if (!rowToUpdate) {
      return 'Not Enough Water';
    }

    // Perform the update and get the affected rows count
    await knex('water')
      .where('water_id', rowToUpdate.water_id)
      .update(updateWater);

    // Fetch the updated row using the updated water_id
    const updatedWater = await knex('water')
      .select()
      .where('water_id', rowToUpdate.water_id)
      .first();

    return updatedWater;
  } catch (error) {
    console.error('Something went wrong: Service => waterTree', error);
    throw new Error(error);
  }
};

module.exports.getSelfAccWater = async (userID) => {
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

    const selfAccWater = await knex('water')
      .count('* as acc_water')
      .where('tree_id', tree.tree_id)
      .first();

    return selfAccWater;
  } catch (error) {
    console.error('Something went wrong: Service => getSelfAccWater', error);
    throw new Error(error);
  }
};

module.exports.getFriendAccWater = async (userID, { player_name }) => {
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

    const friendAccWater = await knex('water')
      .count('* as acc_water')
      .where('tree_id', tree.tree_id)
      .first();

    return friendAccWater;
  } catch (error) {
    console.error('Something went wrong: Service => getFriendAccWater', error);
    throw new Error(error);
  }
};

module.exports.generateDailyWater = async () => {
  try {
    const players = await knex('players').select();
    const waterAmount = 5;

    for (const player of players) {
      for (let i = 0; i < waterAmount; i++) {
        const generatedWater = {
          water_id: translator.generate(),
          player_id: player.player_id,
          water_type_id: 2,
        };
        await knex('water').insert(generatedWater);
      }
    }

    return constants.waterMessage.WATER_CREATED;
  } catch (error) {
    console.error('Something went wrong: Service => generateDailyWater', error);
    throw new Error(error);
  }
};

module.exports.deleteOldWater = async () => {
  try {
    await knex('water')
      .whereNull('tree_id')
      .andWhere('water_type_id', 2)
      .andWhere('created_at', '<', knex.raw('CURRENT_TIMESTAMP'))
      .del();

    return constants.waterMessage.WATER_DELETED;
  } catch (error) {
    console.error('Something went wrong: Service => deleteOldWater', error);
    throw new Error(error);
  }
};
