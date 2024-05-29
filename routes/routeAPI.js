const express = require('express');
const {
    upload,
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}= require('../controllers/carControl');

const routerAPI = express.Router();

routerAPI.get('/', getCars);
routerAPI.get('/:id', getCarById);
routerAPI.post('/add', upload.single('file'), createCar);
routerAPI.patch('/edit/:id',upload.single('file'), updateCar);
routerAPI.delete('/delete/:id', deleteCar);

module.exports = routerAPI;