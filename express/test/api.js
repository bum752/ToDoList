process.env.NODE_ENV = 'test'

var request = require('supertest')
var chai = require('chai')
var expect = chai.expect

var app = require('../app')

describe('api endpoint test', function() {

  var items = []

  after(function(done) {
    request(app)
    .get('/api/todo/items')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err

      expect(res.body).to.be.an('array').lengthOf(items.length - 1)
      done()
    })
  })

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
    it('should respond {_id, title, content, ...}', function(done) {
      this.timeout(5000)

      var item = {
        title: 'TEST TITLE',
        content: 'TEST CONTENT',
        status: 0
      }

      request(app)
      .post('/api/todo/item')
      .send(item)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err

        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('title').to.equal(item.title)
        expect(res.body).to.have.property('content').to.equal(item.content)
        expect(res.body).to.not.have.property('deadline')
        expect(res.body).to.have.property('priority').to.equal(0)
        expect(res.body).to.have.property('status').to.equal(item.status)

        items.push(res.body)

        done()
      })
    })

    it('should respond {..., deadline, priority, status}', function(done) {
      this.timeout(5000)

      var deadline = new Date()
      deadline.setDate(deadline.getDate() + 7)
      var item = {
        title: 'TEST TITLE',
        content: 'TEST CONTENT',
        deadline: deadline,
        priority: 4,
        status: 2
      }

      request(app)
      .post('/api/todo/item')
      .send(item)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err

        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('title').to.equal(item.title)
        expect(res.body).to.have.property('content').to.equal(item.content)
        expect(res.body).to.have.property('deadline').to.exist
        expect(res.body).to.have.property('priority').to.equal(item.priority)
        expect(res.body).to.have.property('status').to.equal(item.status)

        items.push(res.body)

        done()
      })
    })
  })

  describe('PUT /api/todo/item', function() {
    it('should respond { ... }', function(done) {
      this.timeout(5000)

      var item = items[1]
      item.title = 'UPDATED TITLE'
      item.content = 'UPDATED CONTENT'

      request(app)
        .put('/api/todo/item')
        .send(item)
        .expect(200)
        .end(function(err, res) {
          if (err) throw err

          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('_id').to.equal(item._id)
          expect(res.body).to.have.property('title').to.equal(item.title)
          expect(res.body).to.have.property('content').to.equal(item.content)
          expect(res.body).to.have.property('deadline').to.equal(item.deadline)
          expect(res.body).to.have.property('priority').to.equal(item.priority)
          expect(res.body).to.have.property('status').to.equal(item.status)

          done()
        })
    })
  })

  describe('DELETE /api/todo/item', function() {
    it('should respond 204', function(done) {
      this.timeout(5000)

      request(app)
        .delete('/api/todo/item/' + items[1]._id)
        .expect(204)
        .end(function(err, res) {
          if (err) throw err
          done()
        })
    })
  })
})
