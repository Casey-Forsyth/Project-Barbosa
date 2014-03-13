var Trip = DS.Model.extend({

  "name": DS.attr('string'),
  "date": DS.attr('date'),
  "user": DS.attr('string'),

  // "_id": DS.attr('string'),

});

module.exports = Trip;

