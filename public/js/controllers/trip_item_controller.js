var ItemController = Ember.ObjectController.extend({

  actions: {
    close: function() {
      return this.send('closeModal');
    }
  }

});

module.exports = ItemController;

