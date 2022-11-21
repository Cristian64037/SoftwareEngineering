const con= require("./databaseConnection");
let results;
const empID=996996

module.exports = new Promise (function (resolve, reject) {
con.connect(function(err) {
    sql="select * from PTORefresh where empID=" ;
    sql+=empID;
    
    con.query(sql, function (err, result, fields) {
        resolve(result);
        console.log(result);
    });
   

});
})
