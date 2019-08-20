var db = require('../dbconnection');

class Item {
    constructor(id, name, description, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }
}

let ItemRepo = {
    getAllItems: function (callback) {
        return db.query("SELECT * FROM Item;", callback);
    },
    getItem: function (id, callback) {
        return db.query("SELECT * FROM Item where idItem = ?;", [id], callback);
    },
    addItem: function (Item , callback) {
        return db.query("INSERT INTO Item  (idItem, name, description, price) VALUES (?, ?, ?, ?);", [null, Item.name, Item.description, Item.price], callback);
    },
    deleteItem: function (id, callback) {
        return db.query("Delete FROM Item where idItem = ?;", [id], callback);
    },
    updateItem: function (Item, callback) {
        return db.query("UPDATE Item SET name = ?, description = ?, price = ? where idItem = ?;", [Item.name, Item.description, Item.price, Item.id], callback);
    }
};

module.exports.Item = Item;
module.exports.ItemRepo = ItemRepo;
