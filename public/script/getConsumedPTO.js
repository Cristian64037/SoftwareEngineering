const con= require("./databaseConnection");
let results;
const empID=996996

con.connect(function(err) {
    sql="select numofDays, PtoType.Pto_Name from Request  Join PtoType where PtoType.ptonameID=Request.ptonameID and empId=";
    sql+=empID;
    sql+=" AND StatNmeId=2 "
    con.query(sql, function (err, result, fields) {
        results=result;
        //console.log(result);
    });
    //con.end();

});

module.exports = results;