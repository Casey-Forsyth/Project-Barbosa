var ItemController = Ember.ObjectController.extend({

  actions: {
    save: function() {
      this.get('store').commit();
	  return this.send('closeModal');
    },
    close: function() {
      return this.send('closeModal');
    },
    remove: function() {
      if (!confirm('Are you sure?')) return;
      this.get('model').deleteRecord();
      this.get('store').commit();
      return this.send('closeModal');
    }
  }	
  


});

module.exports = ItemController;

