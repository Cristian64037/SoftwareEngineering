const con= require("./databaseConnection");

const getPendingPTOAvailable = (request) => {
    const empID = request.session.username;
    return new Promise(function (resolve, reject) {
        con.connect(function (err) {
            sql = "select numofDays, PtoType.Pto_Name from Request join PtoType where Request.StatNmeId=1 and empId=";
            sql += empID;
            sql += " AND Request.ptonameID=PtoType.ptonameID";

            con.query(sql, function (err, result, fields) {
                resolve(result);
            });
        });
    });
}
module.exports = {getPendingPTOAvailable}

