'use strict';
var express = require('express');
var router = express.Router();
var Items = require('../model/Item');

router.get('/', function (req, res) {
    Items.ItemRepo.getAllItems(function (err, rows) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    });
});
router.get('/:id', function (req, res) {
    Items.ItemRepo.getItem(req.params.id, function (err, rows) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(rows);
        }
    });
});
router.delete('/:id', function (req, res) {
    Items.ItemRepo.deleteItem(req.params.id, function (err, rows) {
        if (err) {
            res.send(err);
        }
        else {
            res.sendStatus(200, "Item deleted");
        }
    });
});
router.post('/', function (req, res) {
    Items.ItemRepo.getItem(req.body.id, function (err, rows) {
        if (Array.isArray(rows) && rows.length < 1){
            try {
                var item = new Items.Item(null, req.body.name, req.body.description, req.body.price);
                Items.ItemRepo.addItem(item, function (err, rows) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.sendStatus(200);
                }
            });
            }
            catch (e) {
                throw e;
            }
            
        }
        else {
            Items.ItemRepo.updateItem(new Items.Item(req.body.id, req.body.name, req.body.description, req.body.price), function (err, rows) {
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