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
        if (Array.isArray(row) && row.length > 0) {
            try {
                var caropitem = new Carops.CartOperation(row[0].idCart_Operations, row[0].idCart, row[0].Item_Total, row[0].Tax, row[0].Discount, row[0].Date, row[0].Total);
                caropitem.ItemTotal = req.body.ItemTotal;
                caropitem.Tax = req.body.Tax;
                caropitem.Discount = req.body.Discount;
                caropitem.Total = req.body.Total;
            } catch (e) {
                throw e;
            }
            
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
        else {
             try {
                var carop = new Carops.CartOperation(null, req.body.idCart, null, null, null, new Date(), null);
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
    });
});
module.exports = router;