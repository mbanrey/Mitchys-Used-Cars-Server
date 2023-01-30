const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')
const { createUserToken } = require('../config/auth')



// POST /sign-up
router.post('/sign-up', (req, res, next) => {
    bcrypt
        .hash(req.body.credentials.password, 10)
        .then((hashedPassword) => 
            ({
                email: req.body.credentials.email,
                password: hashedPassword,
            })
        )
        .then(user => User.create(user))
        .then(user => {
            res.status(201).json({ user: user })
        })
        .catch(next)
})

// POST /sign-in
router.post('/sign-in', (req, res, next) => {
    console.log(req.body)
    User.findOne({ email: req.body.credentials.email })
        .then(user => createUserToken(req, user))
        .then(token => res.json({ token: token }))
        .catch(next)
})

module.exports = router