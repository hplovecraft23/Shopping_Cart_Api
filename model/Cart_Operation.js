var db = require('../dbconnection');

class CartOperation {
    constructor(id, idCart, ItemTotal, Tax, Discount, Date, Total) {
        this.id = id;
        this.idCart = idCart;
        this.ItemTotal = ItemTotal;
        this.Tax = Tax;
        this.Discount = Discount;
        this.Date = Date;
        this.Total = Total;
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
        return db.query("INSERT INTO Cart_Operations (idCart_Operations, idCart, Item_Total, Tax, Discount, Date, Total) VALUES (?, ?, ?, ?, ?, ?, ?);", [null, CartOperation.idCart, CartOperation.ItemTotal, CartOperation.Tax, CartOperation.Discount, CartOperation.Date, CartOperation.Total], callback);
    },
    updateOperation: function (CartOperation, callback) {
        return db.query("UPDATE Cart_Operations SET idCart = ?, Item_Total = ?, Tax = ?, Discount = ?, Date = ?, Total = ? WHERE idCart_Operations = ?", [CartOperation.idCart, CartOperation.ItemTotal, CartOperation.Tax, CartOperation.Discount, CartOperation.Date, CartOperation.Total, CartOperation.id], callback);
    },
    deleteOperation: function (id, callback) {
        return db.query("DELETE FROM Cart_Operations where idCart_Operations = ?", [id], callback);
    }
};

module.exports.CartOperation = CartOperation;
module.exports.CartOperationRepo = CartOperationRepo;