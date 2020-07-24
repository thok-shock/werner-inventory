
function addItem(data, url) {
    console.log(data)
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.status != 201) {
                throw 'Error';
            } else {
                res.json()
            }
        })
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    addItem
}