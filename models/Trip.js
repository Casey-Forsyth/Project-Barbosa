var mongoose = require('mongoose');
var ItineraryItem = require('./ItineraryItem');
var User = require('./User')
var _ = require('underscore')

var tripSchema = new mongoose.Schema({
  name:  {type: String, default: "My Trip"},
  itinerary: [ItineraryItem.schema],
  userID: {type: String, default: "0"},
  location: {type: String, default: "None"},
  date: {type: Date, default: Date.now()},
  archived: {type: Boolean, default: false}
});

tripSchema.methods.flattened = function(){
  console.log('finding user: ' + this.userID)
  User.findOne({_id: this.userID}).exec(function(err, user){
    console.log(err)
    console.log(user)
  })

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
