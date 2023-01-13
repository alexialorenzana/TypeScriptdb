"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mysql_1 = require("mysql");
var app = (0, express_1["default"])();
var db = mysql_1["default"].createConnection({
    //connected to database
    host: "localhost",
    user: "root",
    password: "ilove0TTers",
    database: "classicmodels"
});
// // grabbing the query from database
// //will throw error if it doesnt
app.get("/", function (req, res) {
    var q = "SELECT * FROM classicmodels.customers";
    db.query(q, function (err, data) {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});
// C R E A T E 
app.post("/", function (req, res) {
    var q = "INSERT INTO customers (`customerNumber`,`customerName`,`contactLastName`,`contactFirstName`,`phone`,`addressLine1`,`addressLine2`,`city`,`state`,`postalCode`,`country`,`salesRepEmployeeNumber`,`creditLimit`) VALUES (?)";
    var values = [
        "003",
        "Alexia",
        "Lorenzana",
        "Maria",
        "704.704.7704",
        "1409 old tree",
        null,
        "CLT",
        "NC",
        "28216",
        "US",
        "0003",
        "300000.00",
    ];
    db.query(q, [values], function (err, data) {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});
app.listen(8000, function () {
    console.log("Connected!!");
});
