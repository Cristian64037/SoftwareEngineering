
const con= require("./databaseConnection");
const empID=996996



module.exports = new Promise (function (resolve, reject) {
    // code to execute

    con.connect(function (err) {
        sql = "select pbalance,vbalance,sbalance from Employee WHERE empID=";
        sql += empID;
        sql += " "
        // if (err) throw err;
        con.query(sql, function (err, result, fields) {
            //if (err) throw err;
            resolve(result);
            //dataN= resolve(result);

            console.log(result);
        });


    });
})
