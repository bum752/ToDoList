process.env.NODE_ENV = 'test'

var request = require('supertest')
var chai = require('chai')
var expect = chai.expect

var app = require('../app')

describe('api endpoint test', function() {
  describe('GET /api', function() {
    it('should respond "Hello World"', function(done) {
      request(app)
      .get('/api/todo')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err

        expect(res.text).to.equal('Hello World')
        done()
      })
    })
  })

  describe('GET /api/todo/items', function() {
    it('should respond JSON Array', function(done) {
      this.timeout(5000)
      // this.timeout(30e3)
      request(app)
      .get('/api/todo/items')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err

        expect(res.body).to.be.an('array')
        done()
      })
    })
  })

  describe('POST /api/todo/item', function() {
    it('should respond {result: true, item: {_id, title, content, ...}}', function(done) {
      this.timeout(5000)

      var item = {
        title: 'TEST TITLE',
        content: 'TEST CONTENT'
      }

      request(app)
      .post('/api/todo/item')
      .send(item)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err

        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('success').to.be.true
        expect(res.body).to.have.property('item')
        expect(res.body.item).to.have.property('title').to.equal(item.title)
        expect(res.body.item).to.have.property('content').to.equal(item.content)
        expect(res.body.item).to.not.have.property('deadline')
        expect(res.body.item).to.have.property('priority').to.equal(3)
        expect(res.body.item).to.have.property('done').to.be.false

        done()
      })
    })

    it('should respond {result: true, item: {..., deadline, priority, done}}', function(done) {
      this.timeout(5000)

      var deadline = new Date()
      deadline.setDate(deadline.getDate() + 7)
      var item = {
        title: 'TEST TITLE',
        content: 'TEST CONTENT',
        deadline: deadline,
        priority: 5,
        done: true
      }

      request(app)
      .post('/api/todo/item')
      .send(item)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err

        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('success').to.equal(true)
        expect(res.body).to.have.property('item')
        expect(res.body.item).to.have.property('title').to.equal(item.title)
        expect(res.body.item).to.have.property('content').to.equal(item.content)
        expect(res.body.item).to.have.property('deadline').to.exist
        expect(res.body.item).to.have.property('priority').to.equal(item.priority)
        expect(res.body.item).to.have.property('done').to.equal(item.done)

        done()
      })
    })
  })

})
