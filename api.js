const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const PORT = 5000
const path = require('path')

// set the view to engine ejs
app.set('view engine', 'ejs')

app.use('/public', express.static('public'))
// use res.render to load up an ejs view file

//index page
app.get('/', function(req, res) {
    res.render('pages/index')
})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})
