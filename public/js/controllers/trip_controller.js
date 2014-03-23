var TripController = Ember.ObjectController.extend({

  destroy: function() {
    if (!confirm('Are you sure?')) return;
    this.get('model').deleteRecord();

    root_context = this;
    this.get('model').one('didDelete', function(){
      root_context.get('target.router').transitionTo('trips');
    });

    this.get('store').commit()
  },

  addPackingItem: function() {

	  this.get('model.packinglist').pushObject( App.PackingItem.createRecord({name: itemName.value}) );
	  this.get('model').save();

	  this.get('store').commit();

  },

});

module.exports = TripController;

