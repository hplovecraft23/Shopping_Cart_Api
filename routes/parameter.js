'use strict';
var express = require('express');
var router = express.Router();
var Parameters = require('../model/Parameter');

router.get('/', function (req, res) {
    Parameters.Parameter_repo.getAllParameters(function (err, rows) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    });
});
router.get('/:id', function (req, res) {
    Parameters.Parameter_repo.getParameter(req.params.id, function (err, rows) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    });
});
router.delete('/:id', function (req, res) {
    Parameters.Parameter_repo.deleteParameter(req.params.id, function (err, rows) {
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
        var Item = new Parameters.Parameter(req.body.idParameters, req.body.Description, req.body.Pararameter_Value);
    } catch (e) {
        res.sendStatus(400);
    }
    
    Parameters.Parameter_repo.getParameter(Item.id, function (err, rows) {
        if (Array.isArray(rows) && row.length > 0) {
            Parameters.Parameter_repo.updateParameter(Item, function (err, rows) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.sendStatus(200);
                }
            });
        }
        else {
            Parameters.Parameter_repo.updateParameter(Item, function (err, rows) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

module.exports = router;