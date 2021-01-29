const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET
        const token = req.header('Authorization').replace('Bearer ', '')
        const verifiedToken = jwt.verify(token, JWT_SECRET)

        const user = await User.findOne({ _id: verifiedToken._id }, { password: 0 })

        if(!user) {
            throw new Error()
        }

        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Unauthenticated' })
    }
}

module.exports = auth