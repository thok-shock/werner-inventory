const express = require('express')
const path = require('path')
const CURR_PATH = process.env.NODE_ENV === 'prod' ? path.join(__dirname, '../dist/') : path.join(__dirname, '../dev/');
const PORT = process.env.NODE_ENV === 'prod' ? 2000 : 3000;
const {getItems, getBoxes, getLots} = require('./dbfunctions')
console.log(process.env.NODE_ENV)

const App = express()

App.get('/index.js', (req, res) => {
    res.sendFile(CURR_PATH + 'index.js');
})

App.get('/', (req, res) => {
    res.sendFile(CURR_PATH + 'index.html')
})

App.get('/items', (req, res) => {
    getItems()
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

App.get('/boxes', (req, res) => {
    getBoxes()
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

App.get('/lots', (req, res) => {
    getLots()
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

App.listen(PORT, () => {
    console.log('Application is running on port ' + PORT)
})

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    process.exit(1);
  });