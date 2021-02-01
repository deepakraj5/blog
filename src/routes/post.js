const route = require('express').Router()
const Post = require('../models/post')
const auth = require('../middleware/auth')
const multer = require('multer')

const upload = multer({})

route.post('/newpost', auth, upload.single('image'), async (req, res) => {
    try {
        const post = new Post({
            ...req.body,
            images: req.file.buffer,
            owner: req.user._id
        })

        const title = post.title
        const validate = await Post.findOne({ title })

        if(validate) {
            return res.status(400).send({ error: 'title already present' })
        }

        await post.save()
        res.send({ message: 'new post added' })
    } catch (e) {
        res.status(500).send({ error: 'something went wrong' })
    }
})

route.get('/allpost', async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt').limit(10)
        res.send({ posts })
    } catch (e) {
        res.status(500).send({ error: 'something went wrong' })
    }
})

route.get('/singlepost/:blogId', async (req, res) => {
    try {
        const postId = req.params.blogId
        const blogTitle = postId.split('-').join(' ')
        const post = await Post.findOne({ title: blogTitle })
        res.send({ post })
    } catch (e) {
        res.status(500).send({ error: 'something went wrong' })
    }
})

route.get('/mypost', auth, async (req, res) => {
    try {
        const myId = req.user._id
        const posts = await Post.find({ owner: myId })
        res.send({ posts })
    } catch (e) {
        res.status(500).send({ error: 'something went wrong' })
    }
})

module.exports = route