'use strict';
var express = require('express');
var router = express.Router();
var Cart = require('../model/Cart');

/* GET home page. */
router.get('/', function (req, res) {
    Cart.getAllCarts(function (err, rows) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    });
});

router.post('/', function (req, res) {
    Cart.addCart(function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.sendStatus(200);
        }
    });
});
module.exports = router;

