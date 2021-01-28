const route = require('express').Router()
const User = require('../models/user')

route.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.send({ message: 'user created' })
    } catch (e) {
        res.status(500).send({ error: 'something went wrong' })
    }
})

module.exports = route