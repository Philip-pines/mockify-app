const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema({
  description: { type: String, required: true },
  image_url: { type: String, required: true },
  profile: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  url: { type: String, required: true }
});

const FeedModel = mongoose.model('feedcollection',FeedSchema);
module.exports = FeedModel;