(function () {
  App.Router.map(function () {
    // for the future, when we have more controllers
    // this.resource('trips', { path: '/' }, function () {
    //   this.route('new');
    // });
  });

  App.TripsRoute = Ember.Route.extend({
    model: function () {
      return this.store.find('trip');
    }
  });
})();