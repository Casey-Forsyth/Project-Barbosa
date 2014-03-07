var mongoose = require('mongoose');
var ItineraryItem = require('../models/ItineraryItem');
var Trip = require('../models/Trip');
var extend = require('util')._extend;

/**
* GET /trip/:tripid/items
* Return all itinerary items
*/

exports.listTripItinerary = function(req, res) {

  var Trip = mongoose.model('Trip');

  Trip.findById(req.params.tripid).exec(function(err, trip) {
	if (err) {
		res.status(500).json(null);
	} else {
		res.json({itinerary:trip.itinerary});
	}
  });

};

/**
* POST /trips/:tripid/items
* Create a new itinerary item
*/

exports.createItineraryItem = function(req, res) {

  Trip.findById(req.params.tripid).exec(function(err, trip) {
    if (err) {
      res.status(500).json(null);
    } else {

      trip.itinerary.push(req.body.itineraryItem);
      trip.save(function (err) {
        if (err) {
          res.status(500).json(null);
        };
        res.json({trip:trip});
      })

    }
  });

};

/**
* GET /trip/:tripid/items/:itemid
* Return an itinerary item
*/

exports.showItineraryItem = function(req, res) {

  var Trip = mongoose.model('Trip');
  Trip.findById(req.params.tripid).exec(function(err, trip) {

	if (err) {
		res.status(500).json(null);
	} else {

		var itineraryItem = trip.itinerary.id(req.params.itemid);

		if (itineraryItem) {
			res.json({itineraryItem:itineraryItem});
		} else {
			res.status(500).json(null);
		}

	}

  });

};

/**
* PUT /trip/:tripid/items/:itemid
* Update a trip.
*/

exports.updateItineraryItem = function(req, res){

  var Trip = mongoose.model('Trip');
  Trip.findById(req.params.tripid).exec(function(err, trip) {

	if (err) {
		res.status(500).json(null);
	} else {

		var itineraryItem = trip.itinerary.id(req.params.itemid);

		if (itineraryItem) {

		  itineraryItem = extend(itineraryItem, req.body.itineraryItem);

		  itineraryItem.save(function (err) {
			if (err) {
			  res.status(500).json(null);
			};
			res.json({itineraryItem:itineraryItem});
		  })

		} else {
			res.status(500).json(null);
		}

	}

  });

};

/**
* DELETE /trip/:tripid/items/:itemid
* Delete an itinerary item.
*/

exports.deleteItineraryItem = function(req, res){

  var Trip = mongoose.model('Trip');
  Trip.findById(req.params.tripid).exec(function(err, trip) {

	if (err) {
		res.status(500).json(null);
	} else {

		var itineraryItem = trip.itinerary.id(req.params.itemid);

		if (itineraryItem) {

		  itineraryItem.remove(function (err) {
			if (err) {
			  res.status(500).json(null);
			};
			res.json({});
		  })

		} else {
			res.status(500).json(null);
		}

	}

  });

};
