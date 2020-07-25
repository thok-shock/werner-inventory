function loadItems() {
    return new Promise((resolve, reject) => {
        fetch('/items', {
            method: 'GET'
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            alert('Something went wrong')
            reject(err)
        })
    })
    
}

function loadBoxes() {
    return new Promise((resolve, reject) => {
        fetch('/boxes', {
            method: 'GET'
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            alert('Something went wrong')
            reject(err)
        })
    })
}

 function loadLots() {
    return new Promise((resolve, reject) => {
        fetch('/lots', {
            method: 'GET'
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            alert('Something went wrong')
            reject(err)
        })
    })
}

function loadBox(id) {
    return new Promise((resolve, reject) => {
        fetch(`/load/box?id=${id}`, {
            method: 'GET'
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            alert('Something went wrong')
            reject(err)
        })
    })
}

function loadItemsOfBox(id) {
    return new Promise((resolve, reject) => {
        fetch(`/load/itemsofbox?id= + ${id}`, {
            method: 'GET'
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            alert('Something went wrong')
            reject(err)
        })
    })
}

module.exports = {loadItems, loadBoxes, loadLots, loadBox, loadItemsOfBox}