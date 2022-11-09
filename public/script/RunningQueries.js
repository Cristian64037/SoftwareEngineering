const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, './.env')
})
let mysql = require('mysql');
let JSD=require("")
let con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});
 con.connect(function(err) {
    let sql = "select * from Roles";
    if (err) throw err;
        con.query(sql, function (err, result, fields) {
         if (err) throw err;
          console.log(result);
       });
 });
module.exports = con;