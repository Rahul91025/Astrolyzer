const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['zodiac_lookup', 'ai_chat', 'palm_analysis'],
    },
    request: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    response: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    collection: 'data',
  }
);

module.exports = mongoose.model('Data', dataSchema);
