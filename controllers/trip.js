var mongoose = require('mongoose');
var Trip = require('../models/Trip');

/**
 * GET /trips/:id
 * Show the trip page.
 */

exports.renderTrip = function(req, res) {
  var Trip = mongoose.model('Trip');
  Trip.findById(req.params.tripid).exec(function(err, trip) {
    if (err) {
      res.status(500).json(null);
    } else {
      res.render('trips/show', {
        trip: trip
      });
    }
  });
};

/**
 * GET /api/trips/:id
 * Get a trip!
 */

exports.showTrip = function(req, res) {
  var Trip = mongoose.model('Trip');
  Trip.findById(req.params.tripid).exec(function(err, trips) {
            if (err) {
                res.status(500).json(null);
            } else {
                res.json(trips);
            }
        });
};

/**
 * GET /trips/create
 * Show the new trip page.
 */

exports.renderCreate = function(req, res) {
  res.render('trips/create', {
    title: 'Create new Trip'
  });
};

/**
 * POST /api/trips/create
 * Create a new trip!
 */

exports.createTrip = function(req, res) {
  trip = new Trip({
    name: req.body.tripname
  })
  trip.save(function(err, trip){
    if(err) return console.error(err);
  });
  res.json(trip)
};
