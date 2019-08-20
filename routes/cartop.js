'use strict';
var express = require('express');
var router = express.Router();
var Carops = require('../model/Cart_Operation');

router.get('/', function (req, res) {
    Carops.CartOperationRepo.getAllOperations(function (err, row) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(row);
        }
    });
});
router.get('/:id', function (req, res){
    Carops.CartOperationRepo.getOperation(req.params.id, function (err, row) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(row);
        }
    });
});
router.delete('/id', function (req, res) {
    Carops.CartOperationRepo.deleteOperation(req.params.id, function (err, row) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(row);
        }
    });
});
router.post('/', function (req, res) {
    Carops.CartOperationRepo.getOperation(req.body.id, function (err, row) {
        if (Array.isArray(row) && row.length > 1) {
            try {
                carop = new Carops.CartOperation(null, req.body.idCart, null, null, null, new Date(), null);
                Carops.CartOperationRepo.createOperation(carop, function (err, row) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.sendStatus(200);
                    }
                });
            } catch (e) {
                throw e;
            }
        }
        else {
            caropitem = new Carops.CartOperation(row.body.id, row.body.idCart, row.body.ItemTotal, row.body.Tax, row.body.Discount, row.body.Datem, row.body.Total);
            caropitem.ItemTotal = req.body.ItemTotal;
            caropitem.Tax = req.body.Tax;
            caropitem.Discount = req.body.Discount;
            caropitem.Total = req.body.Total;
            try {
                Carops.CartOperationRepo.updateOperation(caropitem, function (err, row) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.sendStatus(200);
                    }
                });
            } catch (e) {
                throw e;
            }
        }
    });
});
module.exports = router;