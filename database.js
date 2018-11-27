const mysql = require('mysql');
const connection = mysql.createConnection({
    // host: 'db4free.net',
    // user: 'myforms',
    // password: 'asdqwezxc123',
    // database: 'testingforms'
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'HMS_ERD'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

module.exports.connection=connection;