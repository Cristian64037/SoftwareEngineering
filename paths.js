let express = require('express');
let appPTO = express()
let port = 4000;
let bodyParser = require('body-parser');
const session = require('express-session');

//Database Calls
const PTOAvailable = require("./public/script/getPTOAvailable");
const Pending = require("./public/script/getPendingPTOAvailable");
const ConsumedPTO = require("./public/script/getMaxPTOValues");
const UserRequests = require("./public/script/getRequests");
const UserInfo = require("./public/script/getUser");
let UserHistory = require("./public/script/getHistory");
let user = require("./public/script/getAuthenticatedUser");

//App uses
appPTO.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
appPTO.use(express.static('public'));
appPTO.use(bodyParser.urlencoded({extended: true}));
appPTO.set('view engine', 'pug');
appPTO.locals.moment = require('moment');

appPTO.get('/team', function (req, res) {
    //If the user is loggedin
    if (req.session.loggedin) {
        if (req.session.role !== 3) {
            res.render('team', {
                employee: {
                    user: req.session.username,
                    role: req.session.role
                }
            });
        } else {
            res.redirect("/");
        }
    } else {
        // Not logged in
        res.send('Please login to view this page!');
    }
});

appPTO.get('/supervisor', function (req, res) {
    //If the user is loggedin
    if (req.session.loggedin) {
        if (req.session.role !== 3) {
            //Data Pulls
            let PTO = PTOAvailable.getPTOAvailable(req);
            let PendingPTO = Pending.getPendingPTOAvailable(req);
            let MaxPTO = ConsumedPTO.getMaxPTO(req);
            let Requests = UserRequests.getRequests(req);
            let User = UserInfo.getUser(req);


            Promise.all([PTO, PendingPTO, MaxPTO, Requests, User]).then(function (data) {
                //TotalPTO
                let pendingBalance = [0];
                let consumedBalance = [0];
                let date_ob = new Date();

                let dict2 = {}

                data[3].forEach(reqD => {
                    if (!(reqD.ptorequestID in dict2)) {
                        dict2[reqD.ptorequestID] = [[reqD.dayReq], reqD.Pto_Name, reqD.NmeOfStat, reqD.dateChanged, reqD.EmployeeChangedId, reqD.Comments, reqD.submitdate];
                    } else {

                        dict2[reqD.ptorequestID][0].push(reqD.dayReq)

                    }

                });

                consumedBalance[0] += parseInt(data[2][0].VacationTotal);
                consumedBalance[0] -= parseInt(data[0][0].vbalance);

                data[1].forEach(element => {
                    if (element.Pto_Name == "Vacation") {
                        pendingBalance[0] += parseInt(element.numofDays);
                        consumedBalance[0] -= parseInt(element.numofDays);
                    }
                });
                res.render('supervisor', {
                    data: dict2,
                    balanceData: data[0][0],
                    PendingPTORequest: pendingBalance,
                    consumedData: consumedBalance,
                    User: data[4][0],
                    employee: {
                        user: req.session.username,
                        role: req.session.role
                    }
                });
            });
        } else {
            res.redirect("/");
        }
    } else {
        // Not logged in
        res.send('Please login to view this page!');
    }
});

appPTO.get('/request', function (req, res) {
    //If the user is loggedin
    if (req.session.loggedin) {
        res.render('request', {
            employee: {
                user: req.session.username,
                role: req.session.role
            }
        });
    } else {
        // Not logged in
        res.send('Please login to view this page!');
    }
});

appPTO.get('/login', function (req, res) {
    //If the user is not loggedin
    //if (!req.session.loggedin) {
        res.render('login');
    //} else {
        //Logged in
    //    res.send('You are already logged in!');
    //}
});

appPTO.post('/auth', function (request, response) {
    user.getUser(request, response);
});

appPTO.get('/history', function (req, res) {
    //If the user is loggedin
    if (req.session.loggedin) {
        let Requests = UserRequests.getRequests(req);
        let History = UserHistory.getHistory(req);

        Promise.all([Requests, History]).then(function (data) {
            let dict2 = {}

            data[1].forEach(reqD => {
                if (!(reqD.ptorequestID + reqD.NmeOfStat in dict2)) {
                    dict2[reqD.ptorequestID + reqD.NmeOfStat] = [[reqD.dayReq], reqD.Pto_Name, reqD.NmeOfStat, reqD.dateChanged, reqD.EmployeeChangedId, reqD.Comments, reqD.submitdate, reqD.ptorequestID];
                } else {
                    dict2[reqD.ptorequestID + reqD.NmeOfStat][0].push(reqD.dayReq)
                }

            });

            res.render('history', {
                data: dict2,
                employee: {
                    user: req.session.username,
                    role: req.session.role
                }
            })
        });
    } else {
        // Not logged in
        res.send('Please login to view this page!');
    }
});

appPTO.get('/', function (req, res) {
    //If the user is loggedin
    if (req.session.loggedin) {
        if (req.session.role === 3) {
            //Data Pulls
            let PTO = PTOAvailable.getPTOAvailable(req);
            let PendingPTO = Pending.getPendingPTOAvailable(req);
            let MaxPTO = ConsumedPTO.getMaxPTO(req);
            let Requests = UserRequests.getRequests(req);
            let User = UserInfo.getUser(req);

            Promise.all([PTO, PendingPTO, MaxPTO, Requests, User]).then(function (data) {
                //Vacation,Personal,Sick
                let pendingBalance = [0, 0, 0];
                let consumedBalance = [0, 0, 0];

                let dict2 = {}

                data[3].forEach(reqD => {
                    if (!(reqD.ptorequestID in dict2)) {
                        dict2[reqD.ptorequestID] = [[reqD.dayReq], reqD.Pto_Name, reqD.NmeOfStat, reqD.dateChanged, reqD.EmployeeChangedId, reqD.Comments, reqD.submitdate];
                    } else {

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
                    if (element.Pto_Name == "Vacation") {
                        pendingBalance[0] += parseInt(element.numofDays);
                        consumedBalance[0] -= parseInt(element.numofDays);
                    } else if (element.Pto_Name == "Personal") {
                        pendingBalance[1] += parseInt(element.numofDays);
                        consumedBalance[1] -= parseInt(element.numofDays);
                    } else if (element.Pto_Name == "Sick") {
                        pendingBalance[2] += parseInt(element.numofDays);
                        consumedBalance[2] -= parseInt(element.numofDays);
                    }
                });

                res.render('employee', {
                    data: dict2,
                    balanceData: data[0][0],
                    PendingPTORequest: pendingBalance,
                    consumedData: consumedBalance,
                    User: data[4][0],
                    employee: {
                        user: req.session.username,
                        role: req.session.role
                    }
                });
            });
        } else {
            res.redirect("/supervisor");
        }
    } else {
        // Not logged in
        res.send('Please login to view this page!');
    }
});

appPTO.listen(port, () => console.log(`Listening on http://localhost:${port}/login and http://localhost:${port}/supervisor`));