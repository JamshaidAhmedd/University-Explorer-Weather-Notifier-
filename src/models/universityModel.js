const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  web_pages: [String],
  alpha_two_code: String,
  domains: [String],
});

module.exports = mongoose.model('University', universitySchema);
