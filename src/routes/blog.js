const route = require('express').Router()
const Post = require('../models/post')

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

route.get('/blog/:blogId', async (req, res) => {
    try {
        const blogId = req.params.blogId
        const blog = await Post.findOne({ _id: blogId })
        if(blog) {
            return res.render('singlepost')
        } else {
            throw new Error()
        }
    } catch (e) {
        res.render('singlepost', {
            message: `can't find the blog`
        })
    }
})

module.exports = route