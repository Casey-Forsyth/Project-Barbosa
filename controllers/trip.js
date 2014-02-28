var mongoose = require('mongoose');
var Trip = require('../models/Trip');
var extend = require('util')._extend;

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
  var Trip = mongoose.model('Trip');
  Trip.findById(req.params.tripid).exec(function(err, trip) {
    if (err) {
      res.status(500).json(null);
    } else {
      trip.remove(function (err) {
        if (err) {
          res.status(500).json(null);
        };
        res.json({});
      })
    }
  });
}

/**
 * GET /trips/:id
 * Get a trip!
 */

exports.showTrip = function(req, res) {
  var Trip = mongoose.model('Trip');
  Trip.findById(req.params.tripid).exec(function(err, trips) {
            if (err) {
                res.status(500).json(null);
            } else {
                res.json({trip:trips});
            }
        });
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
  trip = new Trip(req.body.trip)
  trip.save(function(err, trip){
    if(err) return console.error(err);
  });
  res.json({trip:trip})
};
