const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // ensures one profile per user
  },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  company: { type: String },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
