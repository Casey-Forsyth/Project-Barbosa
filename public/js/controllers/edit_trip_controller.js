var EditTripController = Ember.ObjectController.extend({

  save: function(trip) {
    this.get('store').commit();
    if (trip.id){
      this.redirectToModel();
    } else {
      trip.one('didCreate', this, function(){
        this.redirectToModel();
      });
    }
  },

  redirectToModel: function() {
    var router = this.get('target');
    var model = this.get('model');
    router.transitionTo('trip', model);
  }

});

module.exports = EditTripController;

