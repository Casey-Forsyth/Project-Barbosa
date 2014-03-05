var LoginController = Ember.Controller.extend(Ember.SimpleAuth.AuthenticationControllerMixin, {
  authenticator: 'app:authenticators:custom',
  loginFailed: false,
  isProcessing: false,
  errors: [],

  actions: {

    authenticate: function() {
      var credentials = {
        action: 'login',
        email: $('#email').val(),
        password: $('#password').val()
      };
      this.set('loginFailed', false);
      this.set('isProcessing', true);
      this._super(credentials);
    },

    sessionAuthenticationSucceeded: function() {
      this.set('loginFailed', false);
      this.set('isProcessing', false);
      this.transitionToRoute('index');
    },

    sessionAuthenticationFailed: function(errors) {
      this.set('loginFailed', true);
      this.set('isProcessing', false);
      this.set('errors', errors);
    }

  }

});

module.exports = LoginController;

