const Car = require('../models/carModel');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// initiation file upload name and path
const storage = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename : function(req, file, cb){
        const fileName = Date.now() + '-' + file.originalname
        cb(null, fileName)
    }
});

const upload = multer({storage:storage});

const getCarById = async (req, res)=> {
    try {
        const response = await Car.findByPk(req.params.id)
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
};

const getCars = async (req, res) => {
    try {
        const response = await Car.findAll()
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
};

const createCar = async (req,res)=> {
    if (!req.file) return res.status(400).json({msg : "no file uploaded"})
    const {nama, kategori, harga} = req.body
    const file = req.file
    const fileSize = file.size
    const ext = path.extname(file.originalname)
    const typeOf = ['.png', '.jpg', '.jpeg']

    if(!typeOf.includes(ext.toLocaleLowerCase()))return res.status(422).json({msg:"invalid type of file"})
    if(fileSize>5000000) return res.status(422).json({msg: "image size is large then 5 mb"})

    try {
        await Car.create({
            nama,
            kategori,
            harga,
            gambar : file.filename
        })
        res.json({msg: "add car is succesfully"})
    } catch (error) {
        req.status(422).json({msg:error})
    }
};

const updateCar = async (req,res)=> {
    const data = await Car.findByPk(req.params.id)
    if (!data)return res.status(522).json({msg: "data not found"})
    let filename = ""
    if (!req.file){
        filename = data.gambar
    }else{
        const file = req.file
        const fileSize = file.size
        const ext = path.extname(file.originalname)
        const typeOf = ['.png', '.jpg', 'jpeg']
        filename = file.filename

        if(!typeOf.includes(ext.toLocaleLowerCase()))return res.status(422).json({msg:"invalid type of file"})
        if(fileSize>5000000) return res.status(422).json({msg: "image size is large then 5 mb"})
        fs.unlinkSync(`public/uploads/${data.gambar}`)
    }
    const {nama, kategori, harga} = req.body
    try {
        console.log(filename)
        await Car.update({
            nama,
            kategori,
            harga,
            gambar : filename
        },{
            where : {
                id : req.params.id
            }
        })
        res.json({msg : "update succesfully"})
    } catch (error) {
        res.json({error})
    }
};

const deleteCar = async (req,res)=> {
    const data = await Car.findByPk(req.params.id)
    if (!data) return res.status(522).json({msg: "data nof found"})
    try {
        fs.unlinkSync(`public/uploads/${data.gambar}`)
        await Car.destroy({
            where : {
                id: req.params.id
            }
        })
        res.json({msg: "delete sucessfully"})
    } catch (error) {
        res.json({error})
    }
};

module.exports = {upload, getCars, getCarById, createCar,updateCar, deleteCar};