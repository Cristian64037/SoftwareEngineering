let express = require('express');
let appPTO = express()
let port = 4000;
let bodyParser = require('body-parser');
const Console = require("console");

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
    
    let Requests=require("./public/script/getRecuests");
    

    let User=require("./public/script/getUser");
    

    Promise.all([PTO,PendingPTO,MaxPTO,Requests,User]).then(function(data){
        //TotalPTO
        let pendingBalance=[0];
        let consumedBalance=[0];
        
        consumedBalance[0] += parseInt(data[2][0].VacationTotal);
        consumedBalance[0] -= parseInt(data[0][0].vbalance);
        
        


        data[1].forEach(element => {
            if (element.Pto_Name=="Vacation"){                
                pendingBalance[0]+=parseInt(element.numofDays);
                consumedBalance[0]-=parseInt(element.numofDays);
            }
        });
        res.render('supervisor', {
            data: data[3],
            balanceData:data[0][0],
            PendingPTORequest:pendingBalance,
            consumedData: consumedBalance,
            User :data[4][0]
        });

    });

});

appPTO.get('/history', function (req, res) {
    res.render('history');
});

appPTO.get('/request', function (req, res) {
    res.render('request');
});

appPTO.get('/login', function (req, res) {
    res.render('login');
});

appPTO.get('/history', function (req, res) {
    res.render('history');
});

appPTO.get('/request', function (req, res) {
    res.render('request');
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
    let Requests=require("./public/script/getRecuests");
    let User=require("./public/script/getUser");
    

    Promise.all([PTO,PendingPTO,MaxPTO,Requests,User]).then(function(data){
        //Vacation,Personal,Sick
        let pendingBalance=[0,0,0];
        let consumedBalance=[0,0,0];

        let dict={}
        
        data[3].forEach(reqD => {
            if (!(reqD.ptorequestID in dict)){

                dict[reqD.ptorequestID]=[reqD.dayReq]
            }
             else{
                  dict[reqD.ptorequestID].push(reqD.dayReq)


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

    

        res.render('employee2', {
            data: data[3],
            reqDays:dict,
            balanceData:data[0][0],
            PendingPTORequest:pendingBalance,
            consumedData: consumedBalance,
            User :data[4][0]
        });

    });

});

appPTO.listen(port, () => console.log(`Listening on http://localhost:${port}/login and http://localhost:${port}/supervisor`));