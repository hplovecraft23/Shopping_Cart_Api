'use strict';
var express = require('express');
var router = express.Router();
var Carops = require('../model/Cart_Operation');
var Parameters = require('../model/Parameter');
class CartIdResponse {
    constructor(id) {
        this.id = id;
    }
}

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
router.delete('/:id', function (req, res) {
    Carops.CartOperationRepo.deleteOperation(req.params.id, function (err, row) {
        if (err) {
            res.send(err);
        }
        else {
            res.sendStatus(200);
        }
    });
});
router.post('/', async function (req, res) {
    Carops.CartOperationRepo.getOperation(req.body.idCart_Operations, async function (err, row) {
        if (Array.isArray(row) && row.length > 0) {
            try {
                var caropitem = new Carops.CartOperation(row[0].idCart_Operations, row[0].idCart, row[0].Item_Total, row[0].Tax, row[0].Discount, row[0].Date, row[0].Total, row[0].Status_ID, row[0].Expiration_Date);
                caropitem.ItemTotal = req.body.Item_Total;
                caropitem.Tax = req.body.Tax;
                caropitem.Discount = req.body.Discount;
                caropitem.Total = req.body.Total;
                caropitem.Status = req.body.Status_ID;
            } catch (e) {
                throw e;
            }
            
            try {
                if (caropitem.Expires > new Date()) {
                    Carops.CartOperationRepo.updateOperation(caropitem, function (err, row) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.sendStatus(200);
                    }
                });
                }
                else {
                    res.sendStatus(412);
                }
                
            } catch (e) {
                throw e;
            }
           
        }
        else {
            try {
                
                var getExpirationConfig = function () {
                    return new Promise(function (resolve, reject) {
                        Parameters.Parameter_repo.getParameterByName('Cart_Expiration_Days', function (err, row) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve (row[0].Pararameter_Value);
                            }
                        });
                    });
                };
                var getExpirationDate = async function () {
                    var date = new Date();
                    var ExpirationConfig = await getExpirationConfig();
                    date.setTime(date.getTime() + ExpirationConfig * 86400000);
                    return date;
                };
                var ExpirationDate = await getExpirationDate();
                var carop = new Carops.CartOperation(null, req.body.idCart, null, null, null, new Date(), null, '1', ExpirationDate);
                Carops.CartOperationRepo.createOperation(carop, function (err, row) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send(new CartIdResponse(row.insertId));
                    }
                });
            } catch (e) {
                throw e;
            }
        }
    });
});
module.exports = router;