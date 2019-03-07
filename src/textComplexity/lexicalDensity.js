module.exports = function lexicalDensity(text, nonLexicalWords, verbose) {
    checkValidInput(text)
    return density(text, verbose, nonLexicalWords)
}

function checkValidInput(input) {
    const numberOfWords = input.split(' ').length
    const numberOfCharacters = input.length
    if (numberOfWords > 100 || numberOfCharacters > 1000)
        throw 'Error: Invalid Input. Your text should contain up to 100 words and up to 1000 characters.'
}

function density(text, verbose, nonLexicalWords) {
    overallLexicalDensity = text => {
        const words = removePunctuations(text).split(' ')
        const numLexicalWords = words.filter(word => !nonLexicalWords.has(word))
        const density = numLexicalWords.length / words.length
        return +density.toFixed(2)
    }

    sentencesLexicalDensity = text => {
        const sentences = text.split('.')
        const lexicalDensities = []
        sentences.forEach(sentence => {
            if (sentence.length) lexicalDensities.push(overallLexicalDensity(sentence))
        })
        return lexicalDensities
    }

    const lowerCaseText = text.toLowerCase()
    const responseData = { data: { overall_ld: overallLexicalDensity(lowerCaseText, nonLexicalWords) }}
    if (verbose)
        responseData.data.sentence_ld = sentencesLexicalDensity(lowerCaseText, nonLexicalWords)
    return responseData
}


function removePunctuations(str) {
    // reference:
    // https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim()
}
