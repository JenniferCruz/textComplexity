const expect = require('chai').expect
const lexicalDensity = require('../src/textComplexity/lexicalDensity')
const { text1002Characters, text101Words, kimLovesCinema, noDensityText } = require('./sampleTexts.fixture')
const nonLexicalWords = require('./nonLexicalWords.fixture')

describe('Lexical Density Logic', () => {

    describe('Rejects invalid inputs', () => {
        const expectedErrorMessage = 'Error: Invalid Input. Your text should contain up to 100 words and up to 1000 characters.'

        it('Should error out if input text has more than 100 words', () => {
            expect(() => lexicalDensity(text101Words, nonLexicalWords)).to.throw(expectedErrorMessage)
        })

        it('Should error out if input text has more than 1000 characters', () => {
            expect(() => lexicalDensity(text1002Characters, nonLexicalWords)).to.throw(expectedErrorMessage)
        })
    })

    describe('Return valid structure as per verbose parameter', () => {
        it('Should not contain sentence_ld field', () => {
            const textDensity = lexicalDensity(kimLovesCinema, nonLexicalWords)
            expect(textDensity.data.sentence_ld).to.be.undefined
        })

        it('Should contain verbose result', () => {
            const textDensity = lexicalDensity(kimLovesCinema, nonLexicalWords, 'verbose')
            expect(textDensity.data.sentence_ld).to.exist
        })
    })

    describe('Returns valid overall complexity for valid inputs', () => {
        it('Should return text density 0.67', () => {
            const textDensity = lexicalDensity(kimLovesCinema, nonLexicalWords)
            expect(textDensity.data.overall_ld).to.equal(0.67)
        })

        it('Should return text density 0', () => {
            const textDensity = lexicalDensity(noDensityText, nonLexicalWords)
            expect(textDensity.data.overall_ld).to.equal(0)
        })

        it('Should return 1 for input with zero non lexical words', () => {
            const textDensity = lexicalDensity('Lorem ipsum dolor sit amet', nonLexicalWords)
            expect(textDensity.data.overall_ld).to.equal(1)
        })

        it('Should return 0.5 for input with half words being lexical', () => {
            const textDensity = lexicalDensity('The day she comes', nonLexicalWords)
            expect(textDensity.data.overall_ld).to.equal(0.5)
        })
    })

    describe('Returns valid sentence complexity for valid inputs', () => {
        it('Should return [0, 0]', () => {
            const textDensity = lexicalDensity('She got more. Either it nor that.', nonLexicalWords, 'verbose')
            expect(textDensity.data.sentence_ld).to.deep.equal([0, 0])
        })

        it('Should return [0, 1, 0.44]', () => {
            const text = 'She got more. Lorem ipsum. Carrots and Pancakes or neither and Water and Air'
            const textDensity = lexicalDensity(text, nonLexicalWords,'verbose')
            expect(textDensity.data.sentence_ld).to.deep.equal([0, 1, 0.44])
        })

        it('Should return [0.82] and it must equal overall_ld', () => {
            const text = 'one 2 3 4 5 6 7 8 9 and 10'
            const textDensity = lexicalDensity(text, nonLexicalWords,'verbose')
            expect(textDensity.data.sentence_ld).to.deep.equal([0.82])
            expect(textDensity.data.overall_ld).to.equal(textDensity.data.sentence_ld[0])
        })
    })

})