var TripController = Ember.ObjectController.extend({

  deletePackingItem: function(packingItem) {

    if (confirm('Are you sure?')){
    	packingItem.deleteRecord();
    	this.get('store').commit();
	}

  },

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

	  this.get('model.packingItems').pushObject( App.PackingItem.createRecord({name: itemName.value}) );
	  this.get('model').save();

	  this.get('store').commit();

	  itemName.value = '';

  },

});

module.exports = TripController;

