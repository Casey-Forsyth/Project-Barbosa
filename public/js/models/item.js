var Item = DS.Model.extend({

  title: DS.attr('string'),

  description: DS.attr('string'),

  scheduledAt: DS.attr('date'),

  location: {
    name: DS.attr('string'),
    latitude: DS.attr('number'),
    longitude: DS.attr('number')
  }

});

module.exports = Item;

