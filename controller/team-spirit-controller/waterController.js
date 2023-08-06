const waterService = require('../../service/team-spirit-service/waterService');
const constants = require('../../constants');

module.exports.createWater = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await waterService.createWater(
      req.headers.userID
    );
    response.status = 200;
    response.message = constants.waterMessage.WATER_CREATED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => createWater', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getSelfWater = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await waterService.getSelfWater(
      req.headers.userID
    );
    response.status = 200;
    response.message = constants.waterMessage.WATER_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getSelfWater', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getHelpWater = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await waterService.getHelpWater(
      req.headers.userID
    );
    response.status = 200;
    response.message = constants.waterMessage.WATER_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getHelpWater', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.waterTree = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await waterService.waterTree(
      req.headers.userID,
      req.body
    );
    // Check if the water was updated or not
    if (
      respondFromService === 'Not Enough Water' ||
      respondFromService === 'This Tree Have Already Watered'
    ) {
      response.status = 404;
      response.message = constants.waterMessage.WATER_NOT_UPDATED;
      response.body = respondFromService;
    } else {
      response.status = 200;
      response.message = constants.waterMessage.WATER_UPDATED;
      response.body = respondFromService;
    }
  } catch (error) {
    console.log('Something went wrong: Controller => waterTree', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.generateDailyWater = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await waterService.generateDailyWater();
    response.status = 200;
    response.message = constants.waterMessage.WATER_CREATED;
    response.body = respondFromService;
  } catch (error) {
    console.log(
      'Something went wrong: Controller => generateDailyWater',
      error
    );
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteOldWater = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await waterService.deleteOldWater();
    response.status = 200;
    response.message = constants.waterMessage.WATER_DELETED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => deleteOldWater', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
