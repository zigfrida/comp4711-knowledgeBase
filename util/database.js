const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'bd5d14a58293b1',
    database: 'heroku_f8ae03c68f3c3f8',
    password: '42ade8d3'
})

module.exports = pool.promise();