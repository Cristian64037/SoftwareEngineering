const con= require("./databaseConnection");
let results;
const empID=905210

module.exports = new Promise (function (resolve, reject) {
    con.connect(function(err) {
        sql="select Request.ptorequestID, DayOff.dayReq, PtoType.Pto_Name, StausName.NmeOfStat, PtoStatus.dateChanged, PtoStatus.EmployeeChangedId,PtoStatus.Comments,Request.submitdate "+
         "from (((Request JOIN PtoStatus on Request.ptorequestID=PtoStatus.ptorequestID) JOIN DayOff "+
         "On DayOff.ptorequestID=Request.ptorequestID) JOIN PtoType on PtoType.ptonameID = Request.ptonameID) JOIN StausName on StausName.StatNmeId = PtoStatus.StatNmeId WHERE Request.empID = "
         
        sql+=empID;
        sql+=" ORDER BY `Request`.`ptorequestID` ASC, `PtoStatus`.`dateChanged` DESC " ;

        con.query(sql, function (err, result, fields) {
            if (err ) throw err;
            resolve(result);
            //console.log(result);
        });


    });
})
