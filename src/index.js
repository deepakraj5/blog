const express = require('express')
const path = require('path')
const hbs = require('hbs')
const blogRoute = require('./routes/blog')
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
require('dotenv').config()
require('./db/mongoose')

const app = express()

const PORT = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialPath)

app.use(express.json())

app.use(blogRoute)
app.use('/api/v1', userRoute)
app.use('/api/v1', postRoute)

app.listen(PORT, () => {
    console.log(`server upon port ${PORT}`)
})