const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const MONGO_URI = 'mongodb+srv://wilsontyler95:7mGSNwzR14oCSVft@cluster0.k4u8x.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

  dbName: 'onlinecalendar'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


const monthSchema = new mongoose.Schema({
  month: String,
  1: Array,
  2: Array,
  3: Array,
  4: Array,
  5: Array,
  6: Array,
  7: Array,
  8: Array,
  9: Array,
  10: Array,
  11: Array,
  12: Array,
  13: Array,
  14: Array,
  15: Array,
  16: Array,
  17: Array,
  18: Array,
  19: Array,
  20: Array,
  21: Array,
  22: Array,
  23: Array,
  24: Array,
  25: Array,
  26: Array,
  27: Array,
  28: Array,
  29: Array,
  30: Array,
  31: Array
});
const Month = mongoose.model('Month', monthSchema);

const eventSchema = new mongoose.Schema({
  event: String,
  time: String
})
const Event = mongoose.model('Event', eventSchema);

module.exports = {Month, Event, MONGO_URI};