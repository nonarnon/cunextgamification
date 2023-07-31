const itemService = require('../../service/integrity-service/itemService');
const constants = require('../../constants');

module.exports.getItems = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await itemService.getItems(req.headers.userID);
    response.status = 200;
    response.message = constants.itemMessage.ITEM_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getItems', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.collectItem = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await itemService.collectItem(
      req.headers.userID,
      req.body
    );
    response.status = 200;
    response.message = constants.itemMessage.ITEM_COLLETED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => collectItem', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
