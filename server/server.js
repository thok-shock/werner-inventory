const express = require('express')
const path = require('path')
const CURR_PATH = process.env.NODE_ENV === 'prod' ? path.join(__dirname, '../dist/') : path.join(__dirname, '../dev/');
const PORT = process.env.NODE_ENV === 'prod' ? 2000 : 2998;
const {getItems, getBoxes, getLots, getBox, getItemByBoxID} = require('./dbfunctions');
const { addLot, addItem, addBox } = require('./new');

console.log(process.env.NODE_ENV)

const App = express()

App.use(express.json())

const imgRouter = express.Router()
const newRouter = express.Router()
const boxRouter = express.Router()
const loadRouter = express.Router()

App.use('/img', imgRouter)
App.use('/new', newRouter)
App.use('/box', (req, res) => {
    res.sendFile(CURR_PATH + 'index.html')
})
App.use('/load', loadRouter)



App.get('/index.js', (req, res) => {
    res.sendFile(CURR_PATH + 'index.js');
})

App.get('/', (req, res) => {
    res.sendFile(CURR_PATH + 'index.html')
})

App.get('/overview', (req, res) => {
    res.sendFile(CURR_PATH + 'index.html')
})

App.get('/new', (req, res) => {
    res.sendFile(CURR_PATH + 'index.html')
})

App.get('/allBoxes', (req, res) => {
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

imgRouter.get('/*?', (req, res) => {
    //console.log(CURR_PATH + '/img/' + req.params[0])
    res.sendFile(CURR_PATH + '/img/' + req.params[0])
})

newRouter.post('/lot', (req, res) => {
    addLot(req.body)
    .then(success => {
        res.status(201).json(success)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

newRouter.post('/box', (req, res) => {
    addBox(req.body)
    .then(success => {
        console.log(success.insertId)
        res.status(201).json(success)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

newRouter.post('/item', (req, res) => {
    addItem(req.body)
    .then(success => {
        res.status(201).json(success)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

loadRouter.get('/box', (req, res) => {
    const id = req.query.id
    getBox(id)
    .then(ans => {
        res.json(ans)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })


})

loadRouter.get('/itemsofbox', (req, res) => {
    const id = req.query.id
    getItemByBoxID(id)
    .then(ans => {
        res.json(ans)
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