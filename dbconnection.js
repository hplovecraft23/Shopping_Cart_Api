var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'o3iyl77734b9n3tg.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'ps1sx76iv88jyl7w',
    password: 'n1fd407twc62491q',
    database: 'loinrxeqmgb50y1b'
});

connection.connect();

module.exports = connection;