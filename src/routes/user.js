const route = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

route.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.send({ message: 'user created' })
    } catch (e) {
        res.status(500).send({ error: 'something went wrong' })
    }
})

route.post('/signin', async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error()
        }

        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        if (!checkPassword) {
            throw new Error()
        }
        
        const JWT_SECRET = process.env.JWT_SECRET
        const token = jwt.sign({ _id: user._id }, JWT_SECRET)

        res.send({ token })

    } catch (e) {
        res.status(500).send({ error: 'wrong credentials' })
    }
})

module.exports = route