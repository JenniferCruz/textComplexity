const MongoClient = require('mongodb').MongoClient
const { connectToDatabase } = require('./persistence')
const config = require('./config')

module.exports = initDatabase

function initDatabase() {
    const databaseName = config.databaseName

    return connectToDatabase().then(client => {
        const seed = ["anybody", "we", "she", "it", "he", "you", "they", "i",
            "one", "of", "without", "in", "at", "between", "no", "nor", "not", "as", "the", "that",
            "neither", "either", "although", "a", "while", "my", "much", "more", "when", "and",
            "have", "is", "got", "to", "or"]

        client.db(databaseName).dropDatabase()
        client.db(databaseName).collection('nonLexical').insertOne({ words: seed })
    })
}

if (require.main === module) {
    initDatabase().then(() => console.log(`database initialization finished`))
        .catch(err => console.error(err))
}
