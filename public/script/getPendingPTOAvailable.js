const con= require("./databaseConnection");
let results;
const empID=774678
con.connect(function(err) {
    sql="select numofDays, PtoType.Pto_Name from Request  Join PtoType where PtoType.ptonameID=Request.ptonameID and empId=";
    sql+=empID;
    sql+=" AND StatNmeId=2 "


    sql="select numofDays, PtoType.Pto_Name from Request join PtoType where Request.ptoRequestID=1 and empId=";
    sql+=empID;
    sql+=" AND Request.ptonameID=PtoType.ptonameID"
    con.query(sql, function (err, result, fields) {
        results=result;
        console.log(result);
    });
    //con.end();

});

module.exports = results;
