var Trip = DS.Model.extend({

  "name": DS.attr('string'),
  "date": DS.attr('string'),
  "user": DS.attr('App.User'),
  "location": DS.attr('string'),
  "itinerary": DS.hasMany('App.Item', {async: true}),
  "packingItems": DS.hasMany('App.PackingItem', {async: true}),
  "archived": DS.attr('boolean')

});

module.exports = Trip;


Ember.Handlebars.helper('makeMap', function(trip) {
  return new Handlebars.SafeString('<img class="media-object" src="http://maps.googleapis.com/maps/api/staticmap?center=' +trip.get('location')+ '&zoom=5&size=64x64&sensor=false" alt="...">');
}, 'location');


Ember.Handlebars.helper('makeMapLarge', function(trip) {
  return new Handlebars.SafeString('<img class="media-object" src="http://maps.googleapis.com/maps/api/staticmap?center=' + trip + '&zoom=5&size=298x298&sensor=false" alt="...">');
}, 'location');
