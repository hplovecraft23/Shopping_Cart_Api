var db = require('../dbconnection');

class Parameter {
    constructor(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
}

let Parameter_repo = {
    getAllParameters: function (callback) {
        return db.query('SELECT * FROM Parameters;', callback);
    },
    getParameter: function (id, callback) {
        return db.query('SELECT * FROM Parameters WHERE idParameters = ?', [id], callback);
    },
    getParameterByName: function (name, callback) {
        return db.query('SELECT * FROM Parameters WHERE Description = ?', [name], callback);
    },
    createParameter: function (parameter, callback) {
        return db.query('INSERT INTO Parameters (idParameters, Description, Pararameter_Value) VALUES (null, ?, ?);', [parameter.description, parameter.value], callback);
    },
    deleteParameter: function (id, callback) {
        return db.query('DELETE FROM Parameters WHERE idParameters = ?', [id], callback);
    },
    updateParameter: function (parameter, callback) {
        return db.query('UPDATE Parameters SET Description = ?, Pararameter_Value = ? WHERE idParameters = ?', [parameter.description, parameter.value, parameter.id], callback);
    }
};

module.exports.Parameter = Parameter;
module.exports.Parameter_repo = Parameter_repo;