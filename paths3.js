let express = require('express');
let appPTO = express()
let port = 4000;
let bodyParser = require('body-parser');
const Console = require("console");
let con= require("./public/script/databaseConnection.js");
  

appPTO.use(express.static('public'));
appPTO.use(bodyParser.urlencoded({extended:true}));
appPTO.set('view engine', 'pug');
appPTO.locals.moment = require('moment');

appPTO.post("/sendPtoRequest", function(req, res,){
    console.log(req.body)
    let holidays=require("./public/script/getHolidays");
    
    function isWeekend(date = new Date()) {
        return date.getDay() === 6 || date.getDay() === 0;
      }
    function getDatesInRange(startDate, endDate) {
        const date = new Date(startDate.getTime()); 
        const dates = [];    
        while (date <= endDate) {
            if(!(isWeekend((new Date(date))))){
                dates.push(new Date(date));
                //date.setDate(date.getDate() + 1);
                

            }
            date.setDate(date.getDate() + 1);
        } 
        return dates;
      }
    let d1 = new Date(req.body.tripstart);
    let d2 = new Date(req.body.tripend);
    let dates2 = getDatesInRange(d1, d2);
    let finalDatesList=[]
    dates2.forEach(function(date){
        finalDatesList.push(date.toDateString());

    })
    Promise.all([holidays]).then(function(data){       
        data[0].forEach(Dop => {   
            if (finalDatesList.includes((Dop.DayOff.toDateString()))) {
                let index=dates2.indexOf(Dop.DayOff.toDateString());
                finalDatesList.splice(index, 1);
            } });
        console.log(finalDatesList.length);

        let InsertDate = new Date().toISOString(); 

        let SqlPtoType="";
    
        let PtoType=req.body.ptoType;

        if(PtoType==3){
            SqlPtoType="sbalance";
        }else if(PtoType==1){
            SqlPtoType="vbalance";
        }else{
            SqlPtoType="pbalance";
        }

        
        
     
  
        //Insert Request
        con.query("INSERT INTO Request ( empID, ptonameID, StatNmeId, leaderID, numofDays, submitdate) VALUES ("+req.body.empID+
        ","+req.body.ptoType+",1,"+req.body.leaderID+","+finalDatesList.length+",'"+InsertDate+"')", function(err, rows, fields) {
               if (err) throw err;


               //Get PtoRequestID
                con.query("SELECT ptorequestID FROM `Request` WHERE  submitdate='"+InsertDate.slice(0,-5)+"'", function(err, result, fields) {
                       if (err) throw err;
                       console.log(result[0]);
                       let PtoId=result[0].ptorequestID;
                
                
                        //update in status
                        con.query("INSERT INTO PtoStatus(StatNmeId, ptorequestID, EmployeeId, EmployeeChangedId,"+
                         " dateChanged , comments) VALUES (1,"+PtoId+","+req.body.empID+","+req.body.leaderID+",'"+InsertDate+"','"+req.body.Descript+"')", function(err, rows, fields) {
                        
                            
                            
                            if (err) throw err;

                            //Insert Into Days Off
                            con.query("INSERT INTO DayOff (ptorequestID, dayReq) VALUES ("+PtoId+",'"+req.body.tripstart+"')", function(err, rows, fields) {
                           
                        
                               if (err) throw err;

                               con.query("INSERT INTO DayOff (ptorequestID, dayReq) VALUES ("+PtoId+",'"+req.body.tripend+"')", function(err, rows, fields) {
                           
                        
                                if (err) throw err;
                                //Update in employee 
                                con.query("UPDATE Employee SET "+SqlPtoType+"="+SqlPtoType+"-"+finalDatesList.length+" WHERE empID="+req.body.empID, function(err, rows, fields) {
                                    if (err) throw err;
        
       
    
                    
    
                        res.redirect("/request");
                    });
                
                });
            });
        });
    });
});
});
 
        
    

})
appPTO.post("/updateRequest", function (req, res,){
    console.log(req.body);
    let managerId=843864;
    let dateToday= new Date();

    let SqlPtoType="";
    
    let PtoType=req.body.ptoType;

    if(PtoType=="Sick"){
        SqlPtoType="sbalance";
    }else if(PtoType=="Vacation"){
        SqlPtoType="vbalance";
    }else{
        SqlPtoType="pbalance";
    }
    console.log(SqlPtoType);
    
    if(req.body.action==="approve"){
        
            //update in request
    
            con.query("UPDATE Request SET StatNmeId=2 WHERE ptorequestID="+req.body.requestID, function(err, rows, fields) {
               if (err) throw err;
    
    
                //update in status
                con.query("INSERT INTO PtoStatus(StatNmeId, ptorequestID, EmployeeId, EmployeeChangedId,"+
                 " dateChanged , comments) VALUES (2,"+req.body.requestID+","+req.body.employeeID+","+managerId+",CURRENT_DATE() ,'"+req.body.requestComments+"')", function(err, rows, fields) {
                   
                    //dateChanged , comments) VALUES (2,? ,?,?,?,?)",[req.body.requestID,req.body.employeeID.replace("`",""),managerId,dateToday,req.body.requestComments.replace("`","")], function(err, rows, fields) {
                   
                    if (err) throw err;
                    //Update Balance
                    
    
                    
    
                        res.redirect("/team");
                    });
                });
            
       
        

        
        
    }else if(req.body.action==="deny"){
        //Update Employee Table 
        con.query("UPDATE Employee SET "+SqlPtoType+"="+SqlPtoType+"+"+parseInt(req.body.requestDays)+" WHERE empID="+req.body.employeeID, function(err, rows, fields) {
            if (err) throw err;
        //update in request
    
        con.query("UPDATE Request SET StatNmeId=3 WHERE ptorequestID="+req.body.requestID, function(err, rows, fields) {
            if (err) throw err;
 
 
             //update in status
             con.query("INSERT INTO PtoStatus(StatNmeId, ptorequestID, EmployeeId, EmployeeChangedId,"+
              " dateChanged , comments) VALUES (3,"+req.body.requestID+","+req.body.employeeID+","+managerId+",CURRENT_DATE() ,'"+req.body.requestComments+"')", function(err, rows, fields) {
                
                 //dateChanged , comments) VALUES (2,? ,?,?,?,?)",[req.body.requestID,req.body.employeeID.replace("`",""),managerId,dateToday,req.body.requestComments.replace("`","")], function(err, rows, fields) {
                
                 if (err) throw err;
                    
 
                 

 
                
                res.redirect("/team");
                    
                 });
             });
            });
         
    }else{
        res.redirect("/team");
    }
    
});
appPTO.get('/team', function (req, res) {
    let PendingRequests = require("./public/script/getPendingRequest");
    let Employees = require("./public/script/getSupervisorEmployees");
    Promise.all([PendingRequests,Employees]).then(function(data){
        let dict2={}
        
        data[0].forEach(reqD => {
            if (!(reqD.ptorequestID in dict2)){              
                dict2[reqD.ptorequestID]=[[reqD.dayReq],reqD.Pto_Name,reqD.NmeOfStat,reqD.dateChanged,reqD.EmployeeChangedId,reqD.Comments,reqD.submitdate,reqD.empID, reqD.fname,reqD.lname,reqD.numofDays];           
            }
             else{
                 
                  dict2[reqD.ptorequestID][0].push(reqD.dayReq)

              } 
        });
        //console.log(data[1]);
        res.render('team2',{
            pendingRequests: dict2,
            Employees:data[1]

        });

        
    });
    
});

appPTO.get('/supervisor', function (req, res) {
    //Gets us all available balance
    let PTO = require("./public/script/getPTOAvailable");
    //This gets pending pto Requests
    let PendingPTO=require("./public/script/getPendingPTOAvailable");

    //Get us Max Values
    let MaxPTO=require("./public/script/getMaxPTOValues");
    
    let Requests=require("./public/script/getRequests");
    

    let User=require("./public/script/getUser");
    

    Promise.all([PTO,PendingPTO,MaxPTO,Requests,User]).then(function(data){
        //TotalPTO
        let pendingBalance=[0];
        let consumedBalance=[0];
        let date_ob= new Date();
        

        let dict2={}
        
        data[3].forEach(reqD => {
            if (!(reqD.ptorequestID in dict2)){              
                dict2[reqD.ptorequestID]=[[reqD.dayReq],reqD.Pto_Name,reqD.NmeOfStat,reqD.dateChanged,reqD.EmployeeChangedId,reqD.Comments,reqD.submitdate];           
            }
             else{
                 
                  dict2[reqD.ptorequestID][0].push(reqD.dayReq)

              }
            
        });
        
        consumedBalance[0] += parseInt(data[2][0].VacationTotal);
        consumedBalance[0] -= parseInt(data[0][0].vbalance);
        
        


        data[1].forEach(element => {
            if (element.Pto_Name=="Vacation"){                
                pendingBalance[0]+=parseInt(element.numofDays);
                consumedBalance[0]-=parseInt(element.numofDays);
            }
        });
        res.render('supervisor', {
            data: dict2,
            balanceData:data[0][0],
            PendingPTORequest:pendingBalance,
            consumedData: consumedBalance,
            User :data[4][0]
        });

    });

});





appPTO.get('/login', function (req, res) {
    res.render('login');
});

appPTO.get('/history', function (req, res) {
    let Requests=require("./public/script/getRequests");
    let History=require("./public/script/getHistory")
    
    Promise.all([Requests,History]).then(function(data){
        
        let dict2={}
        
        
        data[1].forEach(reqD => {
            if (!(reqD.ptorequestID+reqD.NmeOfStat in dict2)){              
                dict2[reqD.ptorequestID+reqD.NmeOfStat]=[[reqD.dayReq],reqD.Pto_Name,reqD.NmeOfStat,reqD.dateChanged,reqD.EmployeeChangedId,reqD.Comments,reqD.submitdate,reqD.ptorequestID];           
            }
             else{              
                  dict2[reqD.ptorequestID+reqD.NmeOfStat][0].push(reqD.dayReq)
              }
            
        });
        
        res.render('history', {
            data: dict2
            
            
        })


    })
});

appPTO.get('/request', function (req, res) {
    let User=require("./public/script/getUser");
    
    Promise.all([User]).then(function(data){
       // console.log(data[0])
        ptoBalances=[0,0,0]
        ptoBalances[0] += parseInt(data[0][0].pbalance);
        ptoBalances[1] += parseInt(data[0][0].vbalance);
        ptoBalances[2] += parseInt(data[0][0].sbalance);
    
 
        res.render('request', {
           
            User :data[0][0],
            PtoBal:ptoBalances
        });

    });
    
   
    
});

appPTO.get('/login', function (req, res) {
    res.render('login');
});
appPTO.get('/logout', function (req, res) {
    console.log("Loggingout")
    res.render('login');
});

appPTO.get('/', function (req, res) {

    //Gets us all available balance
    let PTO = require("./public/script/getPTOAvailable");
    //This gets pending pto Requests
    let PendingPTO=require("./public/script/getPendingPTOAvailable");

    //Get us Max Values
    let MaxPTO=require("./public/script/getMaxPTOValues");
    let Requests=require("./public/script/getRequests");
    let User=require("./public/script/getUser");
    

    Promise.all([PTO,PendingPTO,MaxPTO,Requests,User]).then(function(data){
        //Vacation,Personal,Sick
        let pendingBalance=[0,0,0];
        let consumedBalance=[0,0,0];

        let dict2={}
        
        data[3].forEach(reqD => {
            if (!(reqD.ptorequestID in dict2)){              
                dict2[reqD.ptorequestID]=[[reqD.dayReq],reqD.Pto_Name,reqD.NmeOfStat,reqD.dateChanged,reqD.EmployeeChangedId,reqD.Comments,reqD.submitdate];           
            }
             else{
                 
                  dict2[reqD.ptorequestID][0].push(reqD.dayReq)

              }
            
        });
 

        consumedBalance[0] += parseInt(data[2][0].VacationTotal);
        consumedBalance[1] += parseInt(data[2][0].PersonalTotal);
        consumedBalance[2] += parseInt(data[2][0].SickTotal);

        consumedBalance[0] -= parseInt(data[0][0].vbalance);
        consumedBalance[1] -= parseInt(data[0][0].pbalance);
        consumedBalance[2] -= parseInt(data[0][0].sbalance);

        data[1].forEach(element => {
            if (element.Pto_Name=="Vacation"){                
                pendingBalance[0]+=parseInt(element.numofDays);
                consumedBalance[0]-=parseInt(element.numofDays);
            }
            else if(element.Pto_Name=="Personal"){              
                pendingBalance[1]+=parseInt(element.numofDays);
                consumedBalance[1]-=parseInt(element.numofDays);
            }
            else if(element.Pto_Name=="Sick"){           
                pendingBalance[2]+=parseInt(element.numofDays);
                consumedBalance[2]-=parseInt(element.numofDays);
            }
        });

    

        res.render('employee', {
            data: dict2,
            balanceData:data[0][0],
            PendingPTORequest:pendingBalance,
            consumedData: consumedBalance,
            User :data[4][0]
        });

    });

});

appPTO.listen(port, () => console.log(`Listening on http://localhost:${port}/login and http://localhost:${port}/supervisor`));