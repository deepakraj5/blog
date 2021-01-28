const express = require('express')
const path = require('path')
const hbs = require('hbs')
const blogRoute = require('./routes/blog')
require('dotenv').config()

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

app.listen(PORT, () => {
    console.log(`server upon port ${PORT}`)
})