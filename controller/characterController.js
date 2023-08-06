const characterService = require('../service/characterService');
const constants = require('../constants');

module.exports.getAllCharacters = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await characterService.getAllCharacters(
      req.headers.userID
    );
    response.status = 200;
    response.message = constants.characterMessage.CHARACTER_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getAllCharacters', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getAllAppearances = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await characterService.getAllAppearances(
      req.headers.userID
    );
    response.status = 200;
    response.message = constants.characterMessage.APPEARANCE_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getAllAppearances', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getCharacter = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await characterService.getCharacter(
      req.headers.userID
    );
    response.status = 200;
    response.message = constants.characterMessage.CHARACTER_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getCharacter', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
