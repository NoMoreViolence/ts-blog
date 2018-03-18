const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  id: { type: String, required: true },
  password: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', AdminSchema);
