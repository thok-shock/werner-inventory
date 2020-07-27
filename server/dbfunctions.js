const db = require('./database')

function getItems() {
    return new Promise((resolve, reject) => {
        db.query({
            sql: 'SELECT Item.*, box.lotID, box.boxName FROM Item JOIN box ON Item.boxID = box.boxID;'
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

function getBox(id) {
    return new Promise((resolve, reject) => {
        db.query({
            sql: 'SELECT * FROM box WHERE boxID = ?',
            values: [id]
        }, function(err, row) {
            err ? reject(err) : resolve(row)
        })
    })
}

function getItemByBoxID(id) {
    return new Promise((resolve, reject) => {
        db.query({
            sql: 'SELECT Item.*, box.lotID, box.boxName FROM Item JOIN box ON Item.boxID = box.boxID WHERE Item.boxID = ?',
            values: [id]
        }, function(err, row) {
            err ? reject(err) : resolve(row)
        })
    })
}



module.exports = {getItems, getBoxes, getLots, getBox, getItemByBoxID}