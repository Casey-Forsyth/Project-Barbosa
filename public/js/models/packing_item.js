var PackingItem = DS.Model.extend({
  name: DS.attr('string'),
  trip: DS.belongsTo('App.Trip')
});

module.exports = PackingItem;
