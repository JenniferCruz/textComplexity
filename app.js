const express = require('express')
const bodyParser = require('body-parser')
const { port } = require('./config')
const app = express()
const { connectToDatabase, getNonLexicalWords } = require('./persistence')
const lexicalDensity = require('./textComplexity/lexicalDensity')

app.post('/complexity', bodyParser.json(), (req, res) => {
    const verbose = req.query.mode
    const input = req.body.input

    getNonLexicalWords().then(nonLexicalWords =>
        res.send(lexicalDensity(input, nonLexicalWords, verbose))
    ).catch(err =>
        res.status(400).send(err)
    )
})

connectToDatabase()
    .then(() =>
        app.listen(port, () => console.log(`Text Complexity app listening on port ${port}!`)))
    .catch(err => console.error(err))

module.exports = app;
