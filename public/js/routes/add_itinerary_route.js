var Trip = require('../models/trip');

var AddItineraryRoute = Ember.Route.extend({

  model: function() {
    return AddItinerary;
  }

});

module.exports = AddItineraryRoute;

