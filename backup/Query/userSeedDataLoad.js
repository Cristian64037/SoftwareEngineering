const con= require("../../public/script/databaseConnection");
let JSD2=require("../../PTOUserSeedData.json")
con.connect(function(err) {



    JSD2.forEach(element => {
//         //console.log(element.MaxPersonal);
        let sql="INSERT INTO `Employee`(`empID`, `fname`, `lname`, `email`, `hiredate`, `leaderID`, `RoleId`, `pbalance`, `vbalance`, `sbalance`) VALUES (";
//
        sql+= element.EmployeeId +", '";




        sql+= element.FirstName +"',' ";

        let lastNamespace=element.LastName.replace("'","''");
        //lastNamespace=lastNamespace.stringify(lastNamespace);


        sql+= lastNamespace +"' ,' ";
        let lastEmail=element.Email.replace("'","''");
        console.log(lastEmail);
        sql+= lastEmail +"',' ";


        sql+= element.HireDate +"', ";
        sql+= element.LeaderId +",  ";

        let role=element.Role;
//         console.log(role);
        let roleid=null;

        if(role==="Director"){
            roleid=1;
        }else if(role==="Manager"){
            roleid=2;
        }else{
            roleid=3;
        }
//         console.log(roleid);
        sql+= roleid +", ";
        let PtoBalanceV=element.PtoBalance.Vacation;
        let PtoBalanceP=element.PtoBalance.Personal;
        let PtoBalanceS=element.PtoBalance.Sick;
        sql+= PtoBalanceP+",";
        sql+= PtoBalanceV+",";
        sql+= PtoBalanceS+" )" ;
        //if (err) throw err;
        try{
            con.query(sql, function (err, result, fields) {
                //if (err) throw err ;

                console.log(result);

            } );}catch(err) {
            console.log(err)
        }
    });
});
