var mongoose = require('mongoose');
var ItineraryItem = require('./ItineraryItem');
var PackingItem = require('./PackingItem');
var User = require('./User')
var _ = require('underscore')

var tripSchema = new mongoose.Schema({
  name:  {type: String, default: "My Trip"},
  itinerary: [ItineraryItem.schema],
  packingList: [PackingItem.schema],
  userID: {type: String, default: "0"},
  location: {type: String, default: "None"},
  date: {type: Date, default: Date.now()},
  archived: {type: Boolean, default: false}
});

tripSchema.methods.flattened = function(){
  return {
    trip: {
      _id: this._id,
      name: this.name,
      location: this.location,
      user: this.userID,
      archived: this.archived,
      itinerary_ids: _.pluck(this.itinerary, '_id'),
    },
    items: this.itinerary
  }
}

module.exports = mongoose.model('Trip', tripSchema);
