var Trip = DS.Model.extend({

  "name": DS.attr('string'),
  "itinerary": DS.hasMany('App.Item', {async: true}),
  "archived": DS.attr('boolean')

});

module.exports = Trip;

