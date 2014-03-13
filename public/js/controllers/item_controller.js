var ItemController = Ember.ObjectController.extend({

  actions: {
    save: function() {
      this.get('store').commit();
    },
    close: function() {
      return this.send('closeModal');
    }
  }

});

module.exports = ItemController;

