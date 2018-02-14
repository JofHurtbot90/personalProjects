const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  name: String,
  slug: String,
  url: String,
  games: Array,

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


module.exports = mongoose.model('Collection', collectionSchema);
