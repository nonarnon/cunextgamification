const treeService = require('../../service/team-spirit-service/treeService');
const constants = require('../../constants');

module.exports.getSelfTreeData = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await treeService.getSelfTreeData(
      req.headers.userID
    );
    response.status = 200;
    response.message = constants.treeMessage.TREE_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getSelfTreeData', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getFriendTreeData = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await treeService.getFriendTreeData(
      req.headers.userID,
      req.body
    );
    response.status = 200;
    response.message = constants.treeMessage.TREE_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getFriendTreeData', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getHelpHistory = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await treeService.getHelpHistory(
      req.headers.userID
    );
    response.status = 200;
    response.message = constants.treeMessage.TREE_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getHelpHistory', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.harvestCoins = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await treeService.harvestCoins(
      req.headers.userID
    );
    response.status = 200;
    response.message = constants.treeMessage.TREE_HARVESTED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => harvestCoins', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
