process.env.NODE_ENV = 'test'

var request = require('supertest')
var chai = require('chai')
var expect = chai.expect

var mongoose = require('mongoose')

var config = require('../config')
var Item = require('../models/item')

describe('mongoose', function() {
  var conn;
  var docs = [];

  before(function(done) {
    var mongodbUri = config.mongodb.uri
    var mongodbOptions = config.mongodb.options
    mongoose.connect(mongodbUri, mongodbOptions)

    conn = mongoose.connection
    conn.on('error', function(error) {
      throw error
    })

    conn.once('open', function() {
      conn.db.dropCollection('testitems', function() {
        done()
      })
    })
  })

  after(function(done) {
    Item.countDocuments({}, function(err, count) {
      if (err) throw err

      expect(count).to.equal(docs.length - 1)

      conn.db.dropCollection('testitems', function() {
        conn.close()
        done()
      })
    })
  })

  it('find items', function(done) {
    Item.find(function(err, docs) {
      if (err) throw err

      expect(docs).to.be.a('array')

      done()
    })
  })

  it('save item (1)', function(done) {
    var data = {
      title: 'TEST TITLE',
      content: 'TEST CONTENT',
      status: 0
    }

    var item = new Item(data)

    item.save(function(err, doc) {
      expect(doc).to.be.a('object')
      expect(doc).to.have.property('title').to.equal(data.title)
      expect(doc).to.have.property('content').to.equal(data.content)
      expect(doc).to.have.property('deadline').to.undefined
      expect(doc).to.have.property('priority').to.equal(0)
      expect(doc).to.have.property('status').to.equal(data.status)

      docs.push(doc)
      done()
    })
  })

  it('save item (2)', function(done) {
    var deadline = new Date()
    deadline.setDate(deadline.getDate() + 7)

    var data = {
      title: 'TEST TITLE',
      content: 'TEST CONTENT',
      deadline: deadline,
      priority: 4,
      status: 2
    }

    var item = new Item(data)

    item.save(function(err, doc) {
      expect(doc).to.be.a('object')
      expect(doc).to.have.property('title').to.equal(data.title)
      expect(doc).to.have.property('content').to.equal(data.content)
      expect(doc).to.have.property('deadline').to.exist
      expect(doc).to.have.property('priority').to.equal(data.priority)
      expect(doc).to.have.property('status').to.equal(data.status)

      docs.push(doc)
      done()
    })
  })

  it('save item (3)', function(done) {
    var deadline = new Date()
    deadline.setDate(deadline.getDate() + 7)

    var data = {
      title: 'TEST TITLE 3',
      content: 'TEST CONTENT 3',
      deadline: deadline,
      priority: 4,
      status: 0
    }

    var item = new Item(data)

    item.save(function(err, doc) {
      expect(doc).to.be.a('object')
      expect(doc).to.have.property('title').to.equal(data.title)
      expect(doc).to.have.property('content').to.equal(data.content)
      expect(doc).to.have.property('deadline').to.exist
      expect(doc).to.have.property('priority').to.equal(data.priority)
      expect(doc).to.have.property('status').to.equal(data.status)

      docs.push(doc)
      done()
    })
  })

  it('save item (4)', function(done) {
    var deadline = new Date()
    deadline.setDate(deadline.getDate() + 7)

    var data = {
      title: 'TEST TITLE 4',
      content: 'TEST CONTENT 4',
      deadline: deadline,
      priority: 3,
      status: 1
    }

    var item = new Item(data)

    item.save(function(err, doc) {
      expect(doc).to.be.a('object')
      expect(doc).to.have.property('title').to.equal(data.title)
      expect(doc).to.have.property('content').to.equal(data.content)
      expect(doc).to.have.property('deadline').to.exist
      expect(doc).to.have.property('priority').to.equal(data.priority)
      expect(doc).to.have.property('status').to.equal(data.status)

      docs.push(doc)
      done()
    })
  })

  it('save item (5)', function(done) {
    var deadline = new Date()
    deadline.setDate(deadline.getDate() + 7)

    var data = {
      title: 'TEST TITLE 5',
      content: 'TEST CONTENT 5',
      deadline: deadline,
      priority: 3,
      status: 0
    }

    var item = new Item(data)

    item.save(function(err, doc) {
      expect(doc).to.be.a('object')
      expect(doc).to.have.property('title').to.equal(data.title)
      expect(doc).to.have.property('content').to.equal(data.content)
      expect(doc).to.have.property('deadline').to.exist
      expect(doc).to.have.property('priority').to.equal(data.priority)
      expect(doc).to.have.property('status').to.equal(data.status)

      docs.push(doc)
      done()
    })
  })

  it('save item (6)', function(done) {
    var deadline = new Date()
    deadline.setDate(deadline.getDate() + 7)

    var data = {
      title: 'TEST TITLE 5',
      content: 'TEST CONTENT 5',
      deadline: deadline,
      priority: 4,
      status: 2
    }

    var item = new Item(data)

    item.save(function(err, doc) {
      expect(doc).to.be.a('object')
      expect(doc).to.have.property('title').to.equal(data.title)
      expect(doc).to.have.property('content').to.equal(data.content)
      expect(doc).to.have.property('deadline').to.exist
      expect(doc).to.have.property('priority').to.equal(data.priority)
      expect(doc).to.have.property('status').to.equal(data.status)

      docs.push(doc)
      done()
    })
  })

  it('aggregate', function(done) {
    var agg = [
      {
        $group: {
          _id: {
            status: '$status',
            priority: '$priority'
          },
          items: { $push: '$$ROOT' }
        },
      },
      {
        $sort: {
          '_id.status': -1,
          '_id.priority': 1,
        }
      }
    ]

    Item.aggregate(agg, function(err, docs) {
      if (err) throw err

      expect(docs).to.be.a('array')

      done()
    })
  })

  it('update item', function(done) {
    Item.findById(docs[0]._id, function(err, doc) {
      if (err) throw err

      expect(doc).to.be.a('object')

      doc.title = 'UPDATED TITLE'
      doc.content = 'UPDATED CONTENT'

      doc.save(function(e, d) {
        if (e) throw e

        expect(d).to.have.property('_id').to.deep.equal(docs[0]._id).and.deep.equal(doc._id)
        expect(d).to.have.property('title').to.equal(doc.title)
        expect(d).to.have.property('content').to.equal(doc.content)

        done()
      })
    })
  })

  it('delete item', function(done) {
    Item.deleteOne({_id: docs[1]._id}, function(err, res) {
      if (err) throw err

      expect(res).to.have.property('ok').to.equal(1)

      done()
    })
  })
})
