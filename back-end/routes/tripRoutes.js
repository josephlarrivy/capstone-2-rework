
const jsonschema = require("jsonschema");
const Trip = require('../models/Trip')
const { ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError } = require('../ExpressError')

const tripNameSchema = require('../schemas/tripNameSchema.json')

const express = require("express");
const router = new express.Router();

router.post('/addTripName', async function (req, res, next) {
  // console.log(req)
  try {
    const validator = jsonschema.validate(req.body, tripNameSchema)
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
      console.log('this is the error')
    }
    const tripName = await Trip.addTripName({...req.body})
    console.log(tripName)
    return res.status(201).json({'status' : 'created'})
  } catch (err) {
    if (err instanceof BadRequestError) {
      return res.status(400).json({ message: err.message });
    }
    return next(err);
  }
});

router.get('/getTrips', async function (req, res, next) {
  // console.log(req)
  try {
    const trips = await Trip.getUserTrips({...req.body})
    console.log('tripRoutes:', trips)
  } catch (err) {
    if (err instanceof BadRequestError) {
      return res.status(400).json({ message: err.message });
    }
    return next(err);
  }
})

module.exports = router;