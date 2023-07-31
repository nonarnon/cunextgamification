const treeService = require('../../service/team-spirit-service/treeService');
const constants = require('../../constants');

module.exports.getSelfTree = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await treeService.getSelfTree(
      req.headers.userID
    );
    response.status = 200;
    response.message = constants.treeMessage.TREE_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getSelfTree', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getFriendTree = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await treeService.getFriendTree(
      req.headers.userID,
      req.body
    );
    response.status = 200;
    response.message = constants.treeMessage.TREE_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getFriendTree', error);
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
