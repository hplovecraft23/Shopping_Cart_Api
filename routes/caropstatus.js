'use strict';
var express = require('express');
var router = express.Router();
var Status = require('../model/Cart_Operation_Status');

class StatusIdResponse {
    constructor(id) {
        this.id = id;
    }
}
router.get('/', function (req, res) {
    Status.Cart_Op_Status_Repo.getAllStatus(function (err, rows) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    });
});
router.get('/:id', function (req, res) {
    Status.Cart_Op_Status_Repo.getStatus(req.params.id, function (err, rows) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    });
});
router.delete('/:id', function (req, res) {
    Status.Cart_Op_Status_Repo.deleteStatus(req.params.id, function (err, rows) {
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
        var Item = new Status.Cart_OP_Status(null, req.body.Status_Name);
    } catch (e) {
        res.sendStatus(400);
    }
    Status.Cart_Op_Status_Repo.createStatus(Item, function (err, rows) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(new StatusIdResponse(rows.insertId));
        }
    });
    
});


module.exports = router;