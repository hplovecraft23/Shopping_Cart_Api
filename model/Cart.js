var db = require('../dbconnection');
var Cart = {

    getAllCarts: function (callback) {
        return db.query("SELECT * FROM Cart", callback);
    },
    addCart: function (callback) {
        return db.query("INSERT INTO Cart  VALUES (null)", callback);
    },
    deleteCart: function (id, callback) {
        return db.query("delete from cart where id = ?", [id], callback);
    }
};
module.exports = Cart;