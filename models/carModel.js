const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Car = db.define('cars', {
    nama : DataTypes.STRING,
    kategori : DataTypes.STRING,
    harga : DataTypes.INTEGER,
    gambar : DataTypes.STRING
},{
    freezeTableName:true
});

module.exports = db.models.cars;

(async ()=> {
    await Car.sync({alter:true})
})();

