const playerService = require('../service/playerService');
const constants = require('../constants');

module.exports.register = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await playerService.register(
      req.headers.userID,
      req.body
    );
    response.status = 200;
    response.message = constants.playerMessage.PLAYER_REGISTERED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => register', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getAllPlayers = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await playerService.getAllPlayers(req.query);
    response.status = 200;
    response.message = constants.playerMessage.PLAYER_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getAllPlayers', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getPlayerByID = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await playerService.getPlayerByID(
      req.headers.userID
    );
    response.status = 200;
    response.message = constants.playerMessage.PLAYER_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getPlayerByID', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getPlayerByName = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await playerService.getPlayerByName(
      req.headers.userID,
      req.body
    );
    response.status = 200;
    response.message = constants.playerMessage.PLAYER_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getPlayerByName', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.rankOrderByScore = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await playerService.rankOrderByScore(req.query);
    response.status = 200;
    response.message = constants.playerMessage.PLAYER_RANKED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => rankOrderByScore', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.calculatePlayerRank = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await playerService.calculatePlayerRank(
      req.headers.userID
    );
    response.status = 200;
    response.message = constants.playerMessage.PLAYER_RANKED;
    response.body = respondFromService;
  } catch (error) {
    console.log(
      'Something went wrong: Controller => calculatePlayerRank',
      error
    );
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updatePlayer = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await playerService.updatePlayer(
      req.headers.userID,
      req.body
    );
    response.status = 200;
    response.message = constants.playerMessage.PLAYER_UPDATED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => updatePlayer', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deletePlayer = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await playerService.deletePlayer(
      req.headers.userID
    );
    response.status = 200;
    response.message = constants.playerMessage.PLAYER_DELETED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => deletelPlayer', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
