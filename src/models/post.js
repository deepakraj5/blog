const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    subject: {
        type: String
    },
    body: {
        type: String
    },
    youtubeLink: {
        type: String
    },
    images: {
        type: Buffer
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post