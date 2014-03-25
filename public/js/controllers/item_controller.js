var ItemController = Ember.ObjectController.extend({

  actions: {
    save: function() {
      this.get('store').commit();
	  return this.send('closeModal');
    },
    close: function() {
      return this.send('closeModal');
    },
  },
  remove: function() {
    if (!confirm('Are you sure?')) return;
    this.get('model').deleteRecord();

    root_context = this;
    this.get('model').one('didDelete', function(){
      root_context.get('target.router').transitionTo('trips');
    });

    this.get('store').commit()
  }

});

module.exports = ItemController;

