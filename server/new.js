const db = require('./database')


function addItem(data) {
    return new Promise((resolve, reject) => {
        db.query({
            sql: 'INSERT INTO Item (itemName, itemDescription, itemPrice, itemQuantity, boxID, itemFragile) VALUES (?, ?, ?, ?, ?, ?);',
            values: [data.itemName, data.itemDescription, data.itemPrice, data.itemQuantity, data.boxID, data.itemFragile]
        }, function(err, row) {
            err ? reject(err) : resolve(row)
        })
    })
}

function addBox(data) {
    return new Promise((resolve, reject) => {
        db.query({
            sql: 'INSERT INTO box (boxName, boxDescription, lotID) VALUES (?, ?, ?);',
            values: [data.boxName, data.boxDescription, data.lotID]
        }, function(err, row) {
            err ? reject(err) : resolve(row)
        })
    })
}

function addLot(data) {
    return new Promise((resolve, reject) => {
        db.query({
            sql: 'INSERT INTO lot (lotName) VALUES (?);',
            values: [data.lotName]
        }, function(err, row) {
            err ? reject(err): resolve(row);
        })
    })
}

module.exports = {addItem, addBox, addLot}