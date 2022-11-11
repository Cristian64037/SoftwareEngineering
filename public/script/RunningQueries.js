const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, './.env')
})
let mysql = require('mysql');

//JSD used to loat database
let JSD=require("../../PTOAccrualBrackets.json")
let con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});
con.connect(function(err) {
    sql="select * from Roles";
    if (err) throw err;
         con.query(sql, function (err, result, fields) {
          if (err) throw err;
           console.log(result);
        });

});
module.exports = con;




//This will load data to table from PTO Accurals JSON file
//con.connect(function(err) {
    
//     JSD.forEach(element => {
//         //console.log(element.MaxPersonal);
//         let sql="INSERT INTO `PtoAccurals`(`NumberOfYears`, `RoleId`, `MaxVacation`, `VacationPerYear`, `VacationAccuralDate`, `MaxPersonal`, `PersonalPerYear`, `PersonalAccuralDate`, `MaxSick`, `SickPerYear`, `SickAccuralDate`) VALUES (";
//         sql+= element.NumberOfYears +", ";

//         let role=element.Role;
//         console.log(role);
//         let roleid=null;
        
//         if(role==="Director"){
//             roleid=1;
//         }else if(role==="Manager"){
//             roleid=2;
//         }else{
//             roleid=3;
//         }
//         console.log(roleid);
//         sql+= roleid +", ";


//         sql+= element.MaxVacation +", ";

//         sql+= element.VacationPerYear +",' ";
//         sql+= element.VacationAccuralDate +"', ";
        

//         sql+= element.MaxPersonal +", ";
//         sql+= element.PersonalPerYear +", ' ";
//         let PAccuralDate=null;
//         if(element.PersonalAccuralDate!=null){
//             PAccuralDate=element.PersonalAccuralDate;

//         }
//         console.log(PAccuralDate);

//         sql+= PAccuralDate +"', ";
//         sql+= element.MaxSick +", ";

//         sql+= element.SickPerYear +", '";
//         let SAccuralDate=null;
//         if(element.SickAccuralDate!=null){
//             SAccuralDate=element.PersonalAccuralDate;

//         }
//         console.log(SAccuralDate);
//         sql+= SAccuralDate +"')";

//         if (err) throw err;
//         con.query(sql, function (err, result, fields) {
//          if (err) throw err;
//           console.log(result);
//        });
        
        
//     });
    
//  });