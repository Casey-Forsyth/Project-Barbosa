var Trip = require('../models/trip');

var ItineraryRoute = Ember.Route.extend({

  model: function() {
    return Itinerary;
  }

});

module.exports = ItineraryRoute;

