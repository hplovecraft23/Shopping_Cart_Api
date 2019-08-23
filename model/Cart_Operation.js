var db = require('../dbconnection');

class CartOperation {
    constructor(id, idCart, ItemTotal, Tax, Discount, Date, Total, Status, Expires) {
        this.id = id;
        this.idCart = idCart;
        this.ItemTotal = ItemTotal;
        this.Tax = Tax;
        this.Discount = Discount;
        this.Date = Date;
        this.Total = Total;
        this.Status = Status;
        this.Expires = Expires;
    }
}
let CartOperationRepo = {
    getAllOperations: function (callback) {
        return db.query("SELECT * FROM Cart_Operations;", callback);
    },
    getOperation: function (id, callback) {
        return db.query("SELECT * FROM Cart_Operations where idCart_Operations = ?;", [id], callback);
    },
    createOperation: function (CartOperation, callback) {
        return db.query("INSERT INTO Cart_Operations (idCart_Operations, idCart, Item_Total, Tax, Discount, Date, Total, Status_ID, Expiration_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", [null, CartOperation.idCart, CartOperation.ItemTotal, CartOperation.Tax, CartOperation.Discount, CartOperation.Date, CartOperation.Total, CartOperation.Status, CartOperation.Expires], callback);
    },
    updateOperation: function (CartOperation, callback) {
        return db.query("UPDATE Cart_Operations SET idCart = ?, Item_Total = ?, Tax = ?, Discount = ?, Date = ?, Total = ?, Status_ID = ?, Expiration_Date = ? WHERE idCart_Operations = ?", [CartOperation.idCart, CartOperation.ItemTotal, CartOperation.Tax, CartOperation.Discount, CartOperation.Date, CartOperation.Total, CartOperation.Status, CartOperation.Expires, CartOperation.id], callback);
    },
    deleteOperation: function (id, callback) {
        return db.query("DELETE FROM Cart_Operations where idCart_Operations = ?", [id], callback);
    },
    getLastID: function (callback) {
        return db.query("Select LAST_INSERT_ID()", callback);
    }
};

module.exports.CartOperation = CartOperation;
module.exports.CartOperationRepo = CartOperationRepo;