const route = require('express').Router()

route.get('/', (req, res) => {
    res.render('index')
})

route.get('/signup', (req, res) => {
    res.render('signup')
})

route.get('/signin', (req, res) => {
    res.render('signin')
})

route.get('/profile', (req, res) => {
    res.render('profile')
})

route.get('/addpost', (req, res) => {
    res.render('addpost')
})

route.get('/blog', (req, res) => {
    res.render('singlepost')
})

module.exports = route