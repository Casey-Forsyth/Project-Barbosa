var mongoose = require('mongoose');

var itineraryItemSchema = new mongoose.Schema({
  title: String,
  updated: {type: Date, default: Date.now},
  scheduledAt: Date,
  location: {
    name: String,
    latitude: Number,
    longitude: Number,
  },
  description: String,
  comments: String
});

module.exports.model = mongoose.model('ItineraryItem', itineraryItemSchema);
module.exports.schema = itineraryItemSchema;
