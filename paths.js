let express = require('express');
let appPTO = express()
let port = 4000;
let bodyParser = require('body-parser');

appPTO.use(express.static('public'));
appPTO.use(bodyParser.urlencoded({extended:true}));
appPTO.set('view engine', 'pug');

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
    res.render('employee');
});

appPTO.listen(port, () => console.log(`Listening on http://localhost:${port}/login and http://localhost:${port}/supervisor`));