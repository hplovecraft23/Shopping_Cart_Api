var db = require('../dbconnection');
class Cart_OP_Status {
    constructor(id, description, value) {
        this.id = id;
        this.description = description;
    }
}
let Cart_Op_Status_Repo = {
    getAllStatus: function (callback) {
        return db.query('SELECT * FROM Cart_Operation_Status;', callback);
    },
    getStatus: function (id, callback) {
        return db.query('SELECT * FROM Cart_Operation_Status WHERE idCart_Operation_Status = ?;', [id], callback);
    },
    createStatus: function (Cart_Op_Status, callback) {
        return db.query('insert INTO Cart_Operation_Status (idCart_Operation_Status, Status_Name) values (null, ?);',[Cart_OP_Status.name], callback);
    },
    deleteStatus: function (id, callback) {
        return db.query('DELETE FROM Cart_Operation_Status WHERE idCart_Operation_Status = ?',[id], callback);
    }
};

module.exports.Cart_OP_Status = Cart_OP_Status;
module.exports.Cart_Op_Status_Repo = Cart_Op_Status_Repo;