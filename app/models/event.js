var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  id: Number,
  name: String

});

module.exports = mongoose.model('Event',eventSchema);
