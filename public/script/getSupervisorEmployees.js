const con= require("./databaseConnection");

const getSupervisorEmp = (request) => {
    const empID = request.session.username;
    return new Promise(function (resolve, reject) {
        con.connect(function (err) {
            sql = "select * From Employee where Employee.leaderID=";
            sql += empID;
            sql += " "
            // if (err) throw err;
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result);
                //dataN= resolve(result);
            });
        });
    });
}
module.exports = {getSupervisorEmp}
