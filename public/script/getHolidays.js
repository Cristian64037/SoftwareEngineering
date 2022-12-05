const con= require("./databaseConnection");
let results;


module.exports = new Promise (function (resolve, reject) {
    con.connect(function(err) {
        sql="Select DayOff from AldiDaysOff";

        con.query(sql, function (err, result, fields) {
            if (err ) throw err;
            resolve(result);
            //console.log(result);
        });


    });
})