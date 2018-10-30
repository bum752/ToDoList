var express = require('express')
var router = express.Router()

var Item = require('../models/item')

router.get('/', function(req, res) {
  res.send('Hello World')
})

router.get('/items', function(req, res) {
  Item.find(function(error, items) {
    if (error) return res.status(500).send({success: false, error: error})
    res.json(items)
  })
})

router.post('/item', function(req, res) {
  var item = new Item(req.body)

  item.save(function(error) {
    if (error) return res.status(500).json({success: false, error: error})
    res.json({success: true, item: item})
  })
})

module.exports = router
