var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'o3iyl77734b9n3tg.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'jcruz176kqv6g79j',
    password: 'b105qjadklp2lfo9',
    database: 's8wq789tmibtzbs8'
});

connection.connect();

module.exports = connection;