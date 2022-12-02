
const con= require("./databaseConnection");
//const empID=843864
const empID=0



module.exports = new Promise (function (resolve, reject) {
    // code to execute

    con.connect(function (err) {
        sql = "select * From Employee where Employee.leaderID=";
        sql += empID;
        sql += " "
        // if (err) throw err;
        con.query(sql, function (err, result, fields) {
            //if (err) throw err;
            resolve(result);
            //dataN= resolve(result);

            
        });


    });
})
