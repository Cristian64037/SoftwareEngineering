const con= require("./databaseConnection");

const getUser = (request) => {
    const empID = request.session.username;
    return new Promise(function (resolve, reject) {
        con.connect(function (err) {
            sql = "Select * from Employee where empId="
            sql += empID

            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result);
            });
        });
    });
}
module.exports = {getUser}