
const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');

const app = express();
const apiProxy = httpProxy.createProxyServer();
app.use(express.static(path.join(__dirname, '/../public/')));

 const serverOne = 'http://ec2-52-53-209-75.us-west-1.compute.amazonaws.com/',
       serverTwo = 'http://ec2-54-200-32-135.us-west-2.compute.amazonaws.com/',
       serverThree = 'http://ec2-18-219-221-244.us-east-2.compute.amazonaws.com/',
       serverFour = 'http://ec2-18-223-115-5.us-east-2.compute.amazonaws.com/';

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


