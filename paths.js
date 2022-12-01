let express = require('express');
let appPTO = express()
let port = 4000;
let bodyParser = require('body-parser');
const session = require('express-session');
const connection = require("./public/script/databaseConnection");

appPTO.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
appPTO.use(express.static('public'));
appPTO.use(bodyParser.urlencoded({extended:true}));
appPTO.set('view engine', 'pug');
appPTO.locals.moment = require('moment');

appPTO.get('/team', function (req, res) {
    res.render('team');
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

appPTO.get('/request', function (req, res) {
    res.render('request');
});

appPTO.get('/login', function (req, res) {
    res.render('login');
});

appPTO.post('/auth', function(request, response) {
    let user = require("./public/script/getAuthenticatedUser");
    user.getUser(request, response);
});

// appPTO.get('/home', function(request, response) {
//     // If the user is loggedin
//     if (request.session.loggedin) {
//         // Output username
//         response.send('Welcome back, ' + request.session.username + '!');
//     } else {
//         // Not logged in
//         response.send('Please login to view this page!');
//     }
//     response.end();
// });

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
    res.render('request')
    
});

appPTO.get('/login', function (req, res) {
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