var Item = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  scheduledAt: DS.attr('date'),
  locationName: DS.attr('string'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number')
});

module.exports = Item;

