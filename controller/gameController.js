const gameService = require('../service/gameService');
const constants = require('../constants');

module.exports.createGameType = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await gameService.createGameType(req.body);
    response.status = 200;
    response.message = constants.gameMessage.GAME_TYPE_CREATED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => createGameType', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.createGame = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await gameService.createGame(req.body);
    response.status = 200;
    response.message = constants.gameMessage.GAME_CREATED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => createGame', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getAllGames = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await gameService.getAllGames(req.query);
    response.status = 200;
    response.message = constants.gameMessage.GAME_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getAllGames', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
