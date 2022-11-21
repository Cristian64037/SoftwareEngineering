const con= require("./databaseConnection");
let results;
const empID=996996
module.exports = new Promise (function (resolve, reject) {
con.connect(function(err) {
    // sql="select numofDays, PtoType.Pto_Name from Request  Join PtoType where PtoType.ptonameID=Request.ptonameID and empId=";
    // sql+=empID;
    // sql+=" AND StatNmeId=2 "


    sql="select numofDays, PtoType.Pto_Name from Request join PtoType where Request.StatNmeId=1 and empId=";
    sql+=empID;
    sql+=" AND Request.ptonameID=PtoType.ptonameID"
    con.query(sql, function (err, result, fields) {
        resolve(result);
    });
   

});
})

