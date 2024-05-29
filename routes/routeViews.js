const express = require('express');
const Car = require('../models/carModel');

const routerViews = express.Router();

routerViews.get('/',async (req,res)=> {
    const Cars = await fetch('http://localhost:8000/API/').then((data) => data.json())
    res.render('dashboard', {Cars})
});

routerViews.get('/add', (req,res) =>{
    res.render('add_car');
})

routerViews.get('/edit/:id', async (req,res)=> {
    const car = await fetch(`http://localhost:8000/API/${req.params.id}`).then((data)=> data.json())
    res.render('edit_car', {car})
});

routerViews.get('/list', async (req,res)=> {
    const Cars = await fetch('http://localhost:8000/API/').then((data) => data.json())
    res.render('list_cars', {Cars})
})

module.exports = routerViews;