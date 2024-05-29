const {Sequelize} = require('sequelize');

const db = new Sequelize('binarcars', 'root', '', {
    host : 'localhost',
    dialect : 'mysql'
});

module.exports = db;