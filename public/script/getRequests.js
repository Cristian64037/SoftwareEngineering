const con= require("./databaseConnection");
let results;
const empID=905210

module.exports = new Promise (function (resolve, reject) {
    con.connect(function(err) {
        sql="select Request.ptorequestID, PtoType.Pto_Name, DayOff.dayReq, StausName.NmeOfStat, PtoStatus.dateChanged, PtoStatus.EmployeeChangedId,PtoStatus.Comments, Request.submitdate" +
            " from Request Inner Join PtoType ON PtoType.ptonameID=Request.ptonameID and empId=";
        sql+=empID;
        sql+=" Inner Join DayOff ON Request.ptorequestID=DayOff.ptorequestID Inner Join StausName ON Request.StatNmeId=StausName.StatNmeId " +
            "Inner Join PtoStatus ON Request.ptoRequestId=PtoStatus.ptoRequestID and Request.StatNmeId=PtoStatus.StatNmeId ";
        con.query(sql, function (err, result, fields) {
            if (err ) throw err;
            resolve(result);
            //console.log(result);
        });


    });
})
