const express = require('express')
const router = new express.Router()
const ExpressError = require('../expressError')
const cats = require('../fakeDb')

router.get('/', function(req, res) {
    res.json( { cats } )
})

router.post('/', function(req, res) {
    const newCat = { name: req.body.name }
    cats.push(newCat)
    res.status(201).json({ cat: newCat })
})

router.get("/:name", function(req, res) {
    const foundCat = cats.find(cat => cat.name === req.params.name)
    if (foundCat === undefined) {
        throw new ExpressError("Cat not found", 404)
    }
    res.json({ cat: foundCat })
})

router.patch("/:name", function(req, res) {
    const foundCat = cats.find(cat => cat.name === req.params.name)
    if (foundCat === undefined) {
        throw new ExpressError("Cat not found", 404)
    }
    foundCat.name = req.body.name
    res.json({ cat: foundCat })
})

router.delete("/:name", function(req, res) {
    const foundCat = cats.findIndex(cat => cat.name === req.params.name)
    if (foundCat === -1) {
        throw new ExpressError("Cat not found", 404)
    }
    cats.splice(foundCat, 1)
    res.json({ message: "Deleted" })
})

module.exports = router