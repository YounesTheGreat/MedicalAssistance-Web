const mysql = require('mysql'); // node-mysql module
const myConnection = require('express-myconnection'); // express-myconnection module

let dbOptions = {
  host: 'localhost',
  user: 'root',
  password: 'MySQLServer5717',
  port: 3306,
  database: 'medicappv2'
};

module.exports = myConnection(mysql, dbOptions, 'single');