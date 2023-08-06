const levelService = require('../../service/integrity-service/levelService');
const constants = require('../../constants');

module.exports.getLevel = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await levelService.getLevel(req.headers.userID);
    response.status = 200;
    response.message = constants.levelMessage.LEVEL_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getLevel', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.gameOver = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await levelService.gameOver(
      req.headers.userID,
      req.body
    );
    response.status = 200;
    response.message = constants.levelMessage.LEVEL_REWARD;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => gameOver', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
