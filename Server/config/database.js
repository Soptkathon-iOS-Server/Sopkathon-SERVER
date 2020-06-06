const mysql = require('promise-mysql');

const config = {
    host : '',
    port : 3306,
    user : 'admin',
    password : '',
    database : 'test'
}

module.exports = mysql.createPool(config)