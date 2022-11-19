let express = require('express');
let appPTO = express()
let port = 4000;
let bodyParser = require('body-parser');

appPTO.use(express.static('public'));
appPTO.use(bodyParser.urlencoded({extended:true}));
appPTO.set('view engine', 'pug');
appPTO.get('/team', function (req, res) {
    res.render('team');
});

appPTO.get('/supervisor', function (req, res) {
    res.render('supervisor');
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
    let PTO=require("/Users/cristian/Fall2022/CSC4350/SoftwareEngineering/public/script/getPTOAvailable.js")
    let PendingPTO=require("./public/script/getPendingPTOAvailable")
    let ConsumedPTO=require("./public/script/getConsumedPTO")
    let Requests=require("./public/script/getRecuests")

    Promise.all([PTO,PendingPTO,ConsumedPTO,Requests]).then(function(data){
        console.log(data[0]);
        //console.log(data[1]);
        //console.log(data[2]);
        //console.log(data[4]);


        res.render('employee2', {data: data[3]});

    });

});

appPTO.listen(port, () => console.log(`Listening on http://localhost:${port}/login and http://localhost:${port}/supervisor`));