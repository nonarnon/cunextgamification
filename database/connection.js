const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.log('ERROR: ', error);
  } else {
    console.log('MYSQL Connected...');
  }
});

module.exports = connection;
