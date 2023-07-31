const shopService = require('../../service/team-spirit-service/shopService');
const constants = require('../../constants');

module.exports.createProduct = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await shopService.createProduct(
      req.headers.userID,
      req.body
    );
    response.status = 200;
    response.message = constants.shopMessage.PRODUCT_CREATED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => createProduct', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getAllProducts = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await shopService.getAllProducts(req.query);
    response.status = 200;
    response.message = constants.shopMessage.PRODUCT_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getAllProducts', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.purchaseProduct = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await shopService.purchaseProduct(
      req.headers.userID,
      req.body
    );
    response.status = 200;
    response.message = constants.shopMessage.PRODUCT_PURCHASED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => purchaseProduct', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
