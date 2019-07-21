
const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');

const app = express();
const apiProxy = httpProxy.createProxyServer();
app.use(express.static(path.join(__dirname, '/../public/')));
app.use('/:restaurantID', express.static(path.join(__dirname, '/../public')));

 const photos = 'http://13.57.252.210',
       reservations = 'http://54.200.32.135',
       menus = 'http://18.219.221.244',
       reviews = 'http://18.223.115.5';

app.all("/:restaurant_id/images", function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {target: photos});
});

app.all("/:restaurant_id/reservations", function(req, res) {
    console.log('redirecting to Server2');
    apiProxy.web(req, res, {target: reservations});
});

app.all("/:restaurant_id/reservations/*", function(req, res) {
    console.log('redirecting to Server2');
    apiProxy.web(req, res, {target: reservations});
});

app.all("/:restaurant_id/menus", function(req, res) {
    console.log('redirecting to Server3');
    apiProxy.web(req, res, {target: menus});
});

app.all("/:restaurantID/reviews/", function(req, res) {
    console.log('redirecting to Server4');
    apiProxy.web(req, res, {target: reviews});
});

app.all("/:restaurantID/reviews/*", function(req, res) {
    console.log('redirecting to Server4');
    apiProxy.web(req, res, {target: reviews});
});

module.exports = app;


