'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import currency from '../../components/currency';

var HoldingSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  symbol: String,
  exchange: String,
  shares: Number,
  costBasis: {
    type: Number,
    default: 0,
    get: currency.get,
    set: currency.set
  },
  labels: [String],
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Holding', HoldingSchema);
