var Trip = DS.Model.extend({

  "name": DS.attr('string'),
  "date": DS.attr('date'),

  // "_id": DS.attr('string'),

});

module.exports = Trip;


var moment = require('moment');
moment().format();

Handlebars.registerHelper("formatDate", function(datetime, format) {
  // if (moment) {
  //   f = DateFormats[format];
  //   return moment(datetime).format(f);
  // }
  // else {
    return datetime;
  // }
});

var DateFormats = {
       short: "DD MMMM - YYYY",
       long: "dddd DD.MM.YYYY HH:mm"
};