

const express = require('express')

const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require('../config/auth')
// require the Model we just created
const Car = require('../models/car')

// Creating a router for us to make paths on
const router = express.Router()

router.get('/cars', requireToken, (req,res, next)=>{
	Car.find() //{'owner': req.user._id}
	.then(cars =>{
		return cars.map(car => car)
	})
	.then(cars =>{
		res.status(200).json({ cars: cars })
	})
	.catch(next)
})
router.get('/cars/:id', requireToken, (req,res,next) =>{
	Car.findById(req.params.id)
	.then(car =>{
		res.status(200).json({car: car})
	})
	.catch(next)
})
// CREATE
// POST /cars
router.post('/cars', requireToken, (req, res, next) => {
	const car = req.body.car
    car.owner = req.user._id
	Car.create(req.body.car)
		.then((car) => {
			res.status(201).json({ car: car })
		})
		.catch(next)
})



	
// UPDATE
// PATCH /car/:id
router.patch('/cars/:id',requireToken, (req, res, next) => {
    const carData = req.body.car
		console.log(carData)
		console.log(req.user._id)
	
	Car.findById(req.params.id)
		.then(handle404)
        .then(car => {

			if(car.owner.equals(req.user._id)){
				res.sendStatus(204)
				return car.updateOne(req.body.car)
			}else{
				res.sendStatus(401)
			}
           
            
        })
        
        .catch(next)
	
})

// DELETE
// DELETE /cars/:id
router.delete('/cars/:id',requireToken, (req, res, next) => {
    Car.findById(req.params.id)
        .then(handle404)
        .then(car => {
			if(car.owner.equals(req.user._id)){
				return car.deleteOne(req.body.car)
				
			}else{
				res.sendStatus(401)
			}
            
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// exporting the router to use elsewhere
module.exports = router