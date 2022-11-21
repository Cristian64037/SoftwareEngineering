const con= require("./databaseConnection");
let results;
const empID=843864


module.exports = new Promise (function (resolve, reject) {
    con.connect(function(err) {
        sql="Select * from Employee where empId="
        sql+=empID
        con.query(sql, function (err, result, fields) {
            if (err ) throw err;
            resolve(result);
            //console.log(result);
        });


    });
})