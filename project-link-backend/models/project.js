const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {type: String, required: true},
  deadline: Date,
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);