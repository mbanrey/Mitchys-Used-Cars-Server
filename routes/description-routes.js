const express = require('express')


const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require('../config/auth')
const Car = require('../models/car')

const router = express.Router()

// CREATE
// POST /descriptions
router.post('/descriptions', requireToken, (req, res, next) => {
    const carId = req.body.description.carId

    console.log(req.user)

    const description = req.body.description
    // adding an `owner` field

    // find the description that I want to add the description too
    // once found `push` the description into the Mongoose Array
    // send status of 201 created if success
    // next if failure
    Car.findById(carId)
        .then(handle404)
        .then(car => {
            car.description.push(description)

            // have to save the doc when modified
            return car.save()
        })
        .then(car => {
            res.status(201).json({ car: car })
        })
        .catch(next)
})

// UPDATE
// PATCH /descriptions/:id
router.patch('/descriptions/:descriptionId', (req, res, next) => {
    const carId = req.body.description.carId

    const descriptionBody = req.body.description

    Car.findById(carId)
        .then(handle404)
        .then(car => {
            // finding the description by it's id
            const description = car.descriptions.id(req.params.descriptionId)

            // setting the new description content to be the content passed in
            description.set(descriptionBody)

            // saving it
            // I have modified the doc I need to save it
            return car.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE
// DELETE /descriptions/:descriptionId
router.delete('/descriptions/:descriptionId/:carId', (req, res, next) => {
    const carId = req.body.description.carId

    Car.findById(carId)
        .then(handle404)
        .then(car => {
            //finding the correct description to remove
            //.remove() we delete it
            car.descriptions.id(req.params.descriptionId).remove()

            // since I've modified I have to save
            return car.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router