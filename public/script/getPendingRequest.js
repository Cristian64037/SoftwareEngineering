const con= require("./databaseConnection");

const getPendingRequests = (request) => {
    const empID = request.session.username;
    return new Promise(function (resolve, reject) {
        con.connect(function (err) {
            sql = "select Request.ptorequestID, PtoType.Pto_Name, DayOff.dayReq, StausName.NmeOfStat, PtoStatus.dateChanged, PtoStatus.EmployeeChangedId,PtoStatus.Comments, Request.submitdate, Request.empID, Employee.fname, Employee.lname, Request.numofDays" +
                " from Request Inner Join PtoType ON PtoType.ptonameID=Request.ptonameID and leaderID=";
            sql += empID;
            sql += " and Request.StatNmeId=1 Inner Join DayOff ON Request.ptorequestID=DayOff.ptorequestID Inner Join StausName ON Request.StatNmeId=StausName.StatNmeId " +
                "Inner Join PtoStatus ON Request.ptoRequestId=PtoStatus.ptoRequestID and Request.StatNmeId=PtoStatus.StatNmeId" +
                " Inner Join Employee on Request.empID=Employee.empID ";
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result);
                console.log(empID);
                console.log(result);
            });
        });
    });
}
module.exports = {getPendingRequests}
