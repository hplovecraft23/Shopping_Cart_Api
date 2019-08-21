'use strict';
var express = require('express');
var router = express.Router();
var codet = require('../model/Carop_Detail');

router.get('/', function (req, res) {
    codet.CaropDetailRepo.GetAllCODetail(function (err, rows) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    });
});
router.get('/:id', function (req, res) {
    codet.CaropDetailRepo.GetCODetail(req.params.id, function (err, rows) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    });
});
router.delete('/:id', function (req, res) {
    codet.CaropDetailRepo.DeleteCODetail(req.params.id, function (err, rows) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    });
});
router.post('/', function (req, res) {
    try {
        codet.CaropDetailRepo.GetCODetail(req.body.id, function (err, rows) {
            if (err) {
                res.send(err);
            }
            else {
                if (Array.isArray(rows) && rows.length > 0) {
                    var item = new codet.CaropDetail(req.body.id, req.body.IdCartOp, req.body.ItemId);
                    codet.CaropDetailRepo.UpdateCODetail(item, function (err, rows) {
                        if (err) {
                            send(err);
                        }
                        else {
                            res.sendStatus(200);
                        }
                    });
                }
                else {
                    var newitem = new codet.CaropDetail(req.body.id, req.body.IdCartOp, req.body.ItemId);
                    codet.CaropDetailRepo.CreateCODetail(newitem, function (err, rows) {
                        if (err) {
                            send(err);
                        }
                        else {
                            res.sendStatus(200);
                        }
                    });
                }
            }
        });
    } catch (e) {
        throw e;
    }
});
module.exports = router;