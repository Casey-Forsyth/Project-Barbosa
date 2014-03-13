var mongoose = require('mongoose');
var ItineraryItem = require('./ItineraryItem');
var User = require('./User');

var tripSchema = new mongoose.Schema({
  name:  {type: String, default: "My Trip"},
  itinerary: [ItineraryItem.schema],
  user:[User.Schema],
  date: {type: Date, default: Date.now()},
  archived: {type: Boolean, default: false}
});

module.exports = mongoose.model('Trip', tripSchema);
