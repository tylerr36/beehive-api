const express = require('express')
const passport = require('passport')
const Rsvp = require('../models/rsvp')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// Index RSVP

router.get('/rsvps', requireToken, (req, res, next) => {
  let search = { owner: req.user.id }
  Rsvp.find(search)
    .populate('listing')
    .then(rsvps => {
      return rsvps.map(rsvp => rsvp.toObject())
    })
    .then(rsvps => res.status(200).json({ rsvps: rsvps }))
    .catch(next)
})

// Show one RSVP
router.get('/rsvps/:id', requireToken, (req, res, next) => {
  Rsvp.findById(req.params.id)
    .populate('listing')
    .then(handle404)
    .then(rsvp => res.status(200).json({ rsvp: rsvp.toObject() }))
    .catch(next)
})

// Create an RSVP
router.post('/rsvps', requireToken, (req, res, next) => {
  req.body.rsvp.owner = req.user.id

  Rsvp.create(req.body.rsvp)
    .then(rsvp => {
      res.status(201).json({ rsvp: rsvp.toObject() })
    })
    .catch(next)
})

// Update RSVP
router.patch('/rsvps/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.rsvp.owner
  Rsvp.findById(req.params.id)
    .then(handle404)
    .then(rsvp => {
      requireOwnership(req, rsvp)
      return rsvp.updateOne(req.body.rsvp)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Delete RSVP
router.delete('/rsvps/:id', requireToken, (req, res, next) => {
  Rsvp.findById(req.params.id)
    .populate('listing')
    .then(handle404)
    .then(rsvp => {
      requireOwnership(req, rsvp)
      rsvp.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
