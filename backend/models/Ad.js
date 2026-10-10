const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  link: {
    type: String,
    default: '#'
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Virtual for ID mapping to work with frontend
adSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

adSchema.set('toJSON', {
  virtuals: true
});

const Ad = mongoose.model('Ad', adSchema);
module.exports = Ad;
