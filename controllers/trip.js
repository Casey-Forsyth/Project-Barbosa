var mongoose = require('mongoose');
var Trip = require('../models/Trip');

/**
 * Load
 */

exports.load = function(req, res, next, id){
  Trip.load(id, function (err, trip) {
    if (err) return next(err)
    if (!trip) return next(new Error('not found'))
    req.trip = trip
    next()
  })
}

/**
 * GET /trips/:id
 * Get a trip!
 */

exports.showTrip = function(req, res) {
  var Trip = mongoose.model('Trip');
  Trip.findById(req.params.tripid).exec(function(err, trips) {
            if (err) {
                res.render('error', {
                    status: 500
                });
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
 * POST /trips/create
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
