const con= require("./databaseConnection");
let results;
const empID=905210

module.exports = new Promise (function (resolve, reject) {
con.connect(function(err) {
    


    sql="select numofDays, PtoType.Pto_Name from Request join PtoType where Request.StatNmeId=1 and empId=";
    sql+=empID;
    sql+=" AND Request.ptonameID=PtoType.ptonameID"
    con.query(sql, function (err, result, fields) {
        resolve(result);
    });
   

});
})

