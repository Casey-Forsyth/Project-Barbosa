var User = DS.Model.extend({
  "_id": DS.attr('string')
})

DS.RESTAdapter.registerTransform('App.User', {
  deserialize: function(serialized) {
    return serialized;
  },  
  serialize: function(deserialized) {
    return deserialized;
  }   
});

module.exports = User;
