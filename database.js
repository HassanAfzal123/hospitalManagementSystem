const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hms'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

module.exports.connection=connection;