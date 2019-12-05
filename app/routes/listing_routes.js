const express = require('express')
const passport = require('passport')
const Listing = require('../models/listing')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// public index
router.get('/listings', (req, res, next) => {
  Listing.find()
    .then(listings => {
      return listings.map(listing => listing.toObject())
    })
    .then(listings => res.status(200).json({ listings: listings }))
    .catch(next)
})

// user specific index
router.get('/user_listings', requireToken, (req, res, next) => {
  let search = { owner: req.user.id }
  Listing.find(search)
    .then(listings => {
      return listings.map(listing => listing.toObject())
    })
    .then(listings => res.status(200).json({ listings: listings }))
    .catch(next)
})

// show one user listing
router.get('/listings/:id', requireToken, (req, res, next) => {
  Listing.findById(req.params.id)
    .then(handle404)
    .then(listing => res.status(200).json({ listing: listing.toObject() }))
    .catch(next)
})

// create a listing
router.post('/listings', requireToken, (req, res, next) => {
  req.body.listing.owner = req.user.id

  Listing.create(req.body.listing)
    .then(listing => {
      res.status(201).json({ listing: listing.toObject() })
    })
    .catch(next)
})

// update a listing
router.patch('/listings/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.listing.owner
  Listing.findById(req.params.id)
    .populate('listing')
    .then(handle404)
    .then(listing => {
      requireOwnership(req, listing)
      return listing.updateOne(req.body.listing)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// delete a listing
router.delete('/listings/:id', requireToken, (req, res, next) => {
  Listing.findById(req.params.id)
    .populate('listing')
    .then(handle404)
    .then(listing => {
      requireOwnership(req, listing)
      listing.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
