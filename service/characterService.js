const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  },
});

module.exports.getAllCharacters = async (userID) => {
  try {
    // Check if the userID is registered
    const user = await knex('users').where('user_id', userID).first();
    if (!user) {
      throw new Error('Invalid user ID.');
    }

    const characters = await knex('character').select(
      'character_id',
      'character_name',
      'character_front'
    );
    return characters;
  } catch (error) {
    console.error('Something went wrong: Service => getAllCharacters', error);
    throw new Error(error);
  }
};

module.exports.getAllAppearances = async (userID) => {
  try {
    // Check if the userID is registered
    const user = await knex('users').where('user_id', userID).first();
    if (!user) {
      throw new Error('Invalid user ID.');
    }
    const appearances = await knex('appearance')
      .select('appearance_type_name', 'appearance_name', 'appearance_image')
      .join(
        'appearance_type',
        'appearance_type.appearance_type_id',
        'appearance.appearance_type_id'
      );
    return appearances;
  } catch (error) {
    console.error('Something went wrong: Service => getAllAppearances', error);
    throw new Error(error);
  }
};
