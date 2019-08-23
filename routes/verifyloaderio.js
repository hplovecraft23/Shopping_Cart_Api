'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var file = './loaderio-88bf495f9a91755c48c607e5e585bd4f.txt';
    res.download(file);
});
module.exports = router;