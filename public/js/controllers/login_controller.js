var LoginController = Ember.Controller.extend(Ember.SimpleAuth.AuthenticationControllerMixin, {
  authenticator: 'app:authenticators:custom',
  email: '',
  password: '',

  loginFailed: false,
  isProcessing: false,

  actions: {

    authenticate: function() {
      console.log('authenticate');
      var options = {
        email: this.email,
        password: this.password
      };
      this._super(options);
    },

    loginEmail: function() {

      this.loginFailed = false;
      this.isProcessing = true;

      console.log('loginFailed: ' + this.loginFailed);
      console.log('isProcessing: ' + this.isProcessing);
      console.log('email: ' + this.get("email"));
      console.log('password: ' + this.password);

      //this.set('timeout', setTimeout(this.slowConnection.bind(this), 5000));

      //var request = $.post('/login'

      $.post("/login", {
        email: this.email,
        password: this.password
      }).done(function(data) {
        console.log(data);
      });
    }
  }

});

module.exports = LoginController;

