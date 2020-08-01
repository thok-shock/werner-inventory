const mysql = require('mysql');

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'rswerner.com',
  user: process.env.USER,
  password: process.env.PASSWORD,
  connectTimeout: 3000,
  database: 'werner_inventory'
})



module.exports = db