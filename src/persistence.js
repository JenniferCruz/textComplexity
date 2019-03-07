const MongoClient = require('mongodb').MongoClient
const { mongoConnectionUrl, databaseName } = require('./config')
let cache;
let client;

module.exports = {
    connectToDatabase,
    getNonLexicalWords
}

function connectToDatabase() {
    return new Promise( (resolve, reject) => {
        MongoClient.connect(mongoConnectionUrl, (err, cli) => {
            if (err) reject(err)
            resolve(client = cli)
        })
    })
}

function getNonLexicalWords() {
    if (cache) return Promise.resolve(cache);

    return new Promise((resolve, reject) => {
        client.db(databaseName).collection('nonLexical').find().toArray((err, result) => {
            if (err) reject(err)
            resolve(cache = new Set(result[0].words))
        })
    })
}

