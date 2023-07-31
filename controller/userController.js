const userService = require('../service/userService');
const constants = require('../constants');

module.exports.createUser = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await userService.createUser(req.body);
    response.status = 200;
    response.message = constants.userMessage.USER_CREATED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => createUser', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getAllUsers = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await userService.getAllUsers(req.query);
    response.status = 200;
    response.message = constants.userMessage.USER_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getAllUsers', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getUserByID = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await userService.getUserByID(
      req.headers.userID
    );
    response.status = 200;
    response.message = constants.userMessage.USER_FETCHED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => getUserByID', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateUser = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await userService.updateUser(
      req.headers.userID,
      req.body
    );
    response.status = 200;
    response.message = constants.userMessage.USER_UPDATED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => updateUser', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteUser = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await userService.deleteUser(req.headers.userID);
    response.status = 200;
    response.message = constants.userMessage.USER_DELETED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => deletelUser', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.login = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const respondFromService = await userService.login(req.body);
    response.status = 200;
    response.message = constants.userMessage.USER_LOGINED;
    response.body = respondFromService;
  } catch (error) {
    console.log('Something went wrong: Controller => login', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
