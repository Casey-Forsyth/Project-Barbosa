var mongoose = require('mongoose');
var Trip = require('../models/Trip');
var extend = require('util')._extend;
var _ = require('underscore');

/**
 * Load a trip.
 */

exports.load = function(req, res, next, tripid){
  Trip.findById(tripid, function(err, trip) {
    if (err)
      req.err = err
    else if (!trip)
      req.err = new Error('Trip not found')
    else
      req.trip = trip
    next()
  })
 }

/**
 * PUT /trips/:id
 * Update a trip.
 */

exports.updateTrip = function(req, res){
  if (!req.trip) return res.status(404).json(null);

  updated_trip = extend(req.trip, req.body.trip)
  updated_trip.save(function (err) {
    if (err) res.status(500).json(null)
    res.json( { trip: updated_trip } );
  })
}

/**
 * DELETE /trips/:id
 * Delete a trip.
 */

exports.deleteTrip = function(req, res){
  if (!req.trip) return res.status(404).json(null);

  trip.archived = true
  trip.save(function (err) {
    if (err) res.status(500).json(null)
    res.json({})
  })
}

/**
 * GET /trips/:id
 * Get a trip!
 */

exports.showTrip = function(req, res) {
  if (!req.trip) return res.status(404).json(null);

  res.json(req.trip.flattened())
};

/**
 * GET /trips
 * Get all trips
 */

exports.listTrips = function(req, res) {
  var Trip = mongoose.model('Trip')
  archived = req.query.archived || false
  Trip.find({archived: archived}).exec(function(err, trips) {
    if (err) {
      res.status(500).json(null);
    } else {
      res.json({'trips':trips});
    }
  })
}

/**
 * POST /trips
 * Create a new trip!
 */

exports.createTrip = function(req, res) {
  trip = new Trip(req.body.trip)
  trip.save(function(err, trip){
    if(err)
      res.status(500).json(null)
    else
      res.json({trip:trip})
  })
};
