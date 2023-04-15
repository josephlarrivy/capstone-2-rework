
const jsonschema = require("jsonschema");
const Trip = require('../models/Trip')
const { ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError } = require('../ExpressError')

const tripItemSchema = require('../schemas/tripItemSchema.json')

const express = require("express");
const router = new express.Router();


router.get('/addTripName', async function (req, res, next) {
    console.log('hitting route')
    return res.send('hitting route')
});