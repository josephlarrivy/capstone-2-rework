
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
  console.log(req.body)
  try {
    const validator = jsonschema.validate(req.body, tripNameSchema)
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const tripName = await Trip.addTripName({...req.body})
    // console.log(tripName)
    return res.status(201).json({'status' : 'created'})
  } catch (err) {
    if (err instanceof BadRequestError) {
      return res.status(400).json({ message: err.message });
    }
    return next(err);
  }
});



router.get('/getTrips', async function (req, res, next) {
  let username = req.query.username
  try {
    const trips = await Trip.getUserTrips(username);
    console.log('tripRoutes:', trips);
    return trips
  } catch (err) {
    if (err instanceof BadRequestError) {
      return res.status(400).json({ message: err.message });
    }
    return next(err);
  }
});

module.exports = router;