var mongoose = require('mongoose');
var Trip = require('../models/Trip');
var extend = require('util')._extend;

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
  var Trip = mongoose.model('Trip');
  Trip.findById(req.params.tripid).exec(function(err, trip) {
    if (err) {
      res.status(500).json(null);
    } else {
      trip = extend(trip, req.body.trip)
      trip.save(function (err) {
        if (err) {
          res.status(500).json(null);
        };
        res.json({trip:trip});
      })
    }
  });
}

/**
 * DELETE /trips/:id
 * Delete a trip.
 */

exports.deleteTrip = function(req, res){
  if (!req.trip) return res.status(404).json(null);

  trip.remove(function (err) {
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
  res.json({trip: req.trip})
};

/**
 * GET /trips
 * Get all trips
 */

exports.listTrips = function(req, res) {
  var Trip = mongoose.model('Trip');
  Trip.find().exec(function(err, trips) {
            if (err) {
                res.status(500).json(null);
            } else {
                res.json({'trips':trips});
            }
        });
};

/**
 * POST /trips
 * Create a new trip!
 */

exports.createTrip = function(req, res) {
  trip = new Trip(req.body.trip)
  trip.save(function(err, trip){
    if(err) return console.error(err);
  });
  res.json({trip:trip})
};
