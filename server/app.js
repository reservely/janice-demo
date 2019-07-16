
const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');

const app = express();
const apiProxy = httpProxy.createProxyServer();
app.use(express.static(path.join(__dirname, '/../public/')));

 const serverOne = 'http://localhost:3001',
       serverTwo = 'http://localhost:3002',
       serverThree = 'http://localhost:3003',
       serverFour = 'http://localhost:3004';

app.all("/:restaurant_id/images", function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {target: serverOne});
});

app.all("/:restaurant_id/reservations", function(req, res) {
    console.log('redirecting to Server2');
    apiProxy.web(req, res, {target: serverTwo});
});

app.all("/:restaurant_id/reservations/*", function(req, res) {
    console.log('redirecting to Server2');
    apiProxy.web(req, res, {target: serverTwo});
});

app.all("/:restaurant_id/menus", function(req, res) {
    console.log('redirecting to Server3');
    apiProxy.web(req, res, {target: serverThree});
});

app.all("/:restaurantID/reviews", function(req, res) {
    console.log('redirecting to Server4');
    apiProxy.web(req, res, {target: serverFour});
});

module.exports = app;


