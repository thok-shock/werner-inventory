const db = require('./database')

function getItems() {
    return new Promise((resolve, reject) => {
        db.query({
            sql: 'SELECT * FROM Item;'
        }, function(err, rows) {
            err ? reject(err) : resolve(rows)
        })
    }) 
}

function getBoxes() {
    return new Promise((resolve, reject) => {
        db.query({
            sql: 'SELECT * FROM box;'
        }, function(err, rows) {
            err ? reject(err) : resolve(rows)
        })
    })
}

function getLots() {
    return new Promise((resolve, reject) => {
        db.query({
            sql: 'SELECT * FROM lot;'
        }, function(err, rows) {
            err ? reject(err) : resolve(rows)
        })
    })
}

module.exports = {getItems, getBoxes, getLots}