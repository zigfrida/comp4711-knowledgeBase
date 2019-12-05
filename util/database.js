const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b2f58bb9274bd6',
    database: 'heroku_8e0dd26144ae870',
    password: '304c5184'
})

module.exports = pool.promise();