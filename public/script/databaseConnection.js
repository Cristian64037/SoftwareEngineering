const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, './.env')
})
let mysql = require('mysql');
let con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});
module.exports = con;