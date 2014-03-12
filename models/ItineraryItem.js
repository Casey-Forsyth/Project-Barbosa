var mongoose = require('mongoose');

var itineraryItemSchema = new mongoose.Schema({
  title: {type: String, default: ''},
  description: {type: String, default: ''},
  scheduledAt: {type: Date, default: null},
  location: {
    name: {type: String, default: ''},
    latitude: {type: Number, default: 49.89},
    longitude: {type: Number, default: -97.1},
  },
});

module.exports.model = mongoose.model('ItineraryItem', itineraryItemSchema);
module.exports.schema = itineraryItemSchema;
