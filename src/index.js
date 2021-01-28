const express = require('express')
const path = require('path')
const hbs = require('hbs')
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

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`server upon port ${PORT}`)
})