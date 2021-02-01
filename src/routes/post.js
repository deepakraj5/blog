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
        await post.save()
        res.send({ message: 'new post added' })
    } catch (e) {
        res.status(500).send({ error: 'something went wrong' })
    }
})

route.get('/allpost', async (req, res) => {
    try {
        const posts = await Post.find()
        res.send({ posts })
    } catch (e) {
        res.status(500).send({ error: 'something went wrong' })
    }
})

route.get('/singlepost/:blogId', async (req, res) => {
    try {
        const postId = req.params.blogId
        const post = await Post.findOne({ _id: postId })
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