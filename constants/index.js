module.exports = {
  defaultServerResponse: {
    status: 400,
    message: '',
    body: {},
  },
  userMessage: {
    USER_CREATED: 'User Created Successfully',
    USER_FETCHED: 'User Fetched Successfully',
    USER_UPDATED: 'User Updated Successfully',
    USER_NOT_UPDATE: 'Failed to Update User',
    USER_DELETED: 'User Deleted Successfully',
    USER_NOT_DELETE: 'Failed to Delete User',
    USER_NOT_FOUND: 'User Not Found',
    USER_LOGINED: 'User Login Successfully',
    INVALID_PASSWORD: 'Incorrect Password',
  },
  playerMessage: {
    PLAYER_REGISTERED: 'Player Register Successfully',
    PLAYER_EXISTED: "This Player's Name Already Exists",
    PLAYER_NAME_INVALID:
      'Player name should contain only English alphabets, numbers, dots, dashes, and other symbols, and be at least 8 characters long',
    PLAYER_FETCHED: 'Player Fetched Successfully',
    PLAYER_UPDATED: 'Player Updated Successfully',
    PLAYER_NOT_UPDATE: 'Failed to Update Player',
    PLAYER_DELETED: 'Player Deleted Successfully',
    PLAYER_NOT_DELETE: 'Failed to Delete Player',
    PLAYER_NOT_FOUND: 'Player Not Found',
    PLAYER_RANKED: 'Player Ranked Successfully',
  },
  gameMessage: {
    GAME_TYPE_CREATED: 'Game Type Created Successfully',
    GAME_CREATED: 'Game Created Successfully',
    GAME_FETCHED: 'Game Fetched Successfully',
  },
  shopMessage: {
    PRODUCT_CREATED: 'Product Created Successfully',
    PRODUCT_FETCHED: 'Product Fetched Successfully',
    PRODUCT_PURCHASED: 'Product Purchased Successfully',
    PRODUCT_NOT_PURCHASED: 'Not Enough Stars to Purchase',
    PRODUCT_EXISTED: "This Product's Name Already Exists",
    PRODUCT_NAME_INVALID:
      'Product name should contain only English alphabets, numbers and be at least 8 characters long',
  },
  waterMessage: {
    WATER_CREATED: 'Water Created Successfully',
    WATER_FETCHED: 'Water Fetched Successfully',
    WATER_UPDATED: 'Water Updated Successfully',
    WATER_NOT_UPDATED: 'Failed to Updated Water',
    WATER_DELETED: 'Water Deleted Successfully',
  },
  treeMessage: {
    TREE_CREATED: 'Tree Created Successfully',
    TREE_FETCHED: 'Tree Fetched Successfully',
  },
  levelMessage: {
    LEVEL_FETCHED: 'Level Fetched Successfully',
  },
  itemMessage: {
    ITEM_FETCHED: 'Item Fetched Successfully',
    ITEM_COLLETED: 'Item Collected Successfully',
    ITEM_BOMB: 'You Hit The Bomb! Try Again',
  },
  characterMessage: {
    CHARACTER_FETCHED: 'Character Fetched Successfully',
  },
  requestValidationMessage: {
    BAD_REQUEST: 'Invalid Fields',
    TOKEN_MISSING: 'Token Missing from header',
  },
};
