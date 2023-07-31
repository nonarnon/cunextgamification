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

const playerService = require('../playerService');
const waterService = require('./waterService');

module.exports.createProduct = async (userID, productData) => {
  try {
    // Check if the userID is registered
    const user = await knex('users').where('user_id', userID).first();
    if (!user) {
      throw new Error('Invalid user ID.');
    }

    // Check if the product name already exists
    const product = await knex('products')
      .where('product_name', productData.product_name)
      .first();
    if (product) {
      throw new Error(constants.shopMessage.PRODUCT_EXISTED);
    }

    productData.product_id = translator.generate();
    await knex('products').insert(productData);
    const createdProduct = await knex('products').where(
      'product_id',
      productData.product_id
    );
    return createdProduct;
  } catch (error) {
    console.error('Something went wrong: Service => createProduct', error);
    throw new Error(error);
  }
};

module.exports.getAllProducts = async ({ skip = 0, limit = 10 }) => {
  try {
    const products = await knex('products')
      .select()
      .offset(parseInt(skip))
      .limit(parseInt(limit));
    return products;
  } catch (error) {
    console.error('Something went wrong: Service => getAllProducts', error);
    throw new Error(error);
  }
};

module.exports.purchaseProduct = async (userID, productData) => {
  try {
    // get the player's star
    const stars = await knex('players')
      .select('player_star')
      .where('user_id', userID)
      .first();

    // get the product
    const product = await knex('products')
      .select()
      .where('product_id', productData.product_id)
      .first();

    // check the remaining stars
    if (product.product_price > stars.player_star) {
      throw new Error(constants.shopMessage.PRODUCT_NOT_PURCHASED);
    }

    // update stars
    console.log('stars: ', stars.player_star);
    console.log('product_price: ', product.product_price);
    const remainStars = stars.player_star - product.product_price;
    console.log('Remaining stars: ', remainStars);
    playerService.updateStars(userID, remainStars);

    // update water
    const waterAmount = product.product_amount;
    const waterType = 1;
    waterService.createWater(userID, waterAmount, waterType);

    return product;
  } catch (error) {
    console.error('Something went wrong: Service => purchaseProduct', error);
    throw new Error(error);
  }
};
