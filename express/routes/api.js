var express = require('express')
var router = express.Router()

var Item = require('../models/item')

router.get('/', function(req, res) {
  res.send('Hello World')
})

router.get('/item/:_id', function(req, res) {
  Item.findById(req.params._id, function(error, doc) {
    if (error) return res.status(500).json({error: error})

    res.json(doc)
  })
})

router.get('/items', function(req, res) {
  Item.find(function(error, items) {
    if (error) return res.status(500).send({error: error})
    res.json(items)
  })
})

router.post('/item', function(req, res) {
  var item = new Item(req.body)

  item.save(function(error) {
    if (error) return res.status(500).json({error: error})
    res.json(item)
  })
})

router.put('/item', function(req, res) {
  Item.findById(req.body._id, function(error, doc) {
    if (error) return res.status(500).json({success: false, error: error})

    doc.title = req.body.title
    doc.content = req.body.content
    doc.deadline = req.body.deadline
    doc.priority = req.body.priority
    doc.done = req.body.done

    doc.save(function(e, d) {
      if (e) return res.status(500).json({success: false, error: error})

      res.json(d)
    })
  })
})

module.exports = router
