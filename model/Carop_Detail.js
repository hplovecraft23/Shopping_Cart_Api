var db = require('../dbconnection');
class CaropDetail {
    constructor(id, idCartOp, ItemID) {
        this.id = id;
        this.idCartOp = idCartOp;
        this.ItemID = ItemID;
    }
}
let CaropDetailRepo = {
    GetAllCODetail: function (callback) {
        return db.query('SELECT * FROM Cart_Operations_Detail;', callback);
    },
    GetCODetail: function (id, callback) {
        return db.query('SELECT * FROM Cart_Operations_Detail where Operation_ID = ?', [id], callback);
    },
    CreateCODetail: function (CaropDetail, callback) {
        return db.query('INSERT INTO Cart_Operations_Detail (idCart_Operations_Detail, Operation_ID, Item_idItem) VALUES (?, ?, ?)', [null, CaropDetail.idCartOp, CaropDetail.ItemID], callback);
    },
    DeleteCODetail: function (id, callback) {
        return db.query('DELETE FROM Cart_Operations_Detail where idCart_Operations_Detail = ?', [id], callback);
    },
    UpdateCODetail: function (CaropDetail, callback) {
        return db.query('UPDATE Cart_Operations_Detail SET Operation_ID = ?, Item_idItem = ? where idCart_Operations_Detail = ?' [CaropDetail.idCartOp, CaropDetail.ItemID, CaropDetail.id], callback);
    }
};
module.exports.CaropDetail = CaropDetail;
module.exports.CaropDetailRepo = CaropDetailRepo;