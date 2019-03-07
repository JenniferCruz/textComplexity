const expect = require('chai').expect
const {text101Words, kimLovesCinema} = require('./sampleTexts.fixture')
const request = require('supertest')
const app = require('../src/app')
const initDatabase = require('../src/seedDatabase')
const config = require('../src/config')
config.databaseName = 'textComplexityTestDB'

describe('API', done => {
    before(function() {
        initDatabase().then(done);
    });

    it('Should reject invalid inputs', done => {
        request(app).post('/complexity').send({"input": text101Words}).expect(400, done)
    })

    it('Returns correct structure for base endpoint', done => {
        request(app).post('/complexity')
            .send({"input": kimLovesCinema})
            .expect(200)
            .end((err, response) => {
                expect(response.body.data.overall_ld).to.be.a('number')
                expect(response.body.data.sentence_ld).to.be.undefined
                done()
            })
    })

    it('Returns correct structure for verbose request', done => {
        request(app).post('/complexity?mode=verbose')
            .send({"input": kimLovesCinema})
            .expect(200)
            .end((err, response) => {
                expect(response.body.data.overall_ld).to.be.a('number')
                expect(response.body.data.sentence_ld).to.be.an('array')
                done()
            })
    })
})