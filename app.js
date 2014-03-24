/**
 * Module dependencies.
 */

var express = require('express');
var flash = require('connect-flash');
var less = require('less-middleware');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');


/**
 * Load controllers.
 */

var homeController = require('./controllers/home');
var userController = require('./controllers/user');
var tripController = require('./controllers/trip');
var itineraryItemController = require('./controllers/itinerary_item');
var packingItemController = require('./controllers/packing_item');

/**
 * API keys + Passport configuration.
 */

var secrets = require('./config/secrets');
var passportConf = require('./config/passport');

/**
 * Mongoose configuration.
 */

mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.log('✗ MongoDB Connection Error. Please make sure MongoDB is running.'.red);
  setTimeout(function() {
    mongoose.connect(secrets.db);
  }, 5000);
});

var app = express();
module.exports = app;

/**
 * Express configuration.
 */
app.locals.cacheBuster = Date.now();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.compress());
app.use(express.favicon());
if (process.env.NODE_ENV=='development' || !process.env.NODE_ENV)
  app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(expressValidator());
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret code' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(flash());
app.use(less({ src: __dirname + '/public', compress: true }));
app.use(app.router);
app.use(express.static( path.join(__dirname, 'public'), { maxAge: 864000000 } ));
app.use(function(req, res) {
	res.status(404);
  res.render('404', { status: 404 });
});
app.use(express.errorHandler());

/**
 * Application routes.
 */

app.get('/', homeController.index);

app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.post('/signup', userController.postSignup);

app.param('tripid', tripController.load)
app.post('/trips', tripController.createTrip);
app.get( '/trips', tripController.listTrips);
app.get( '/trips/:tripid', tripController.showTrip);
app.put( '/trips/:tripid', tripController.updateTrip);
app.delete( '/trips/:tripid', tripController.deleteTrip);

app.param('itemid', itineraryItemController.load)
app.get('/items', itineraryItemController.listTripItineraryItems);
app.post('/items', itineraryItemController.createItineraryItem);
app.get('/items/:itemid', itineraryItemController.showItineraryItem);
app.put('/items/:itemid', itineraryItemController.updateItineraryItem);
app.delete('/items/:itemid', itineraryItemController.deleteItineraryItem);

app.post('/packing_items', packingItemController.createPackingItem);
app.get('/packing_items', packingItemController.getPackingItems);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
