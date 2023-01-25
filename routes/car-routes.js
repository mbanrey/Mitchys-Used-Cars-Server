const express = require('express')

const { handle404 } = require('../lib/custom-errors')

// require the Model we just created
const Car = require('../models/car')

// Creating a router for us to make paths on
const router = express.Router()

router.get('/cars', (req,res, next)=>{
	Car.find()
	.then(cars =>{
		return cars.map(car => car)
	})
	.then(cars =>{
		res.status(200).json({ cars: cars })
	})
	.catch(next)
})
router.get('/cars/:id', (req,res,next) =>{
	Car.findById(req.params.id)
	.then(car =>{
		res.status(200).json({car: car})
	})
	.catch(next)
})
// CREATE
// POST /cars
router.post('/cars', (req, res, next) => {

	Car.create(req.body.car)
		.then((car) => {
			res.status(201).json({ car: car })
		})
		.catch(next)
})

// UPDATE
// PATCH /car/:id
router.patch('/cars/:id', (req, res, next) => {
    Car.findById(req.params.id)
        .then(handle404)
        .then(car => {
            // { car: {} }
            return car.updateOne(req.body.car)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE
// DELETE /cars/:id
router.delete('/cars/:id', (req, res, next) => {
    Car.findById(req.params.id)
        .then(handle404)
        .then(car => {
            return car.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// exporting the router to use elsewhere
module.exports = router