const con= require("./databaseConnection");

const getMaxPTO = (request) => {
    const empID = request.session.username;
    return new Promise(function (resolve, reject) {
        con.connect(function (err) {
            sql = "select * from PTORefresh where empID=";
            sql += empID;

            con.query(sql, function (err, result, fields) {
                resolve(result);
            });
        });
    });
}
module.exports = {getMaxPTO}
