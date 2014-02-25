module.exports = {
  db: 'localhost/barbosa',

  facebook: {
    clientID: '1453279814895954',
    clientSecret: 'a09037ab9a66a012e428b7ccfdadd7c7',
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true
  },

  twitter: {
    consumerKey: 'TxSKULtrqa6XR43I6YEeqQ',
    consumerSecret: 'ZrZoRV2hooWeKj2rHoUt0nm2Xe7rPhHYUyLoQp1x0',
    callbackURL: '/auth/twitter/callback',
    passReqToCallback: true
  },

  google: {
    clientID: '58067519186-5qma5qcpp0snm1285ovbmhdqh3qahq95.apps.googleusercontent.com',
    clientSecret: 'TXJK9CQsNexI5QENCC37uDN-',
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  }
};
