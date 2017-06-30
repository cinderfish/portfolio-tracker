'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import currency from '../../components/currency';

var TransactionSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  symbol: String,
  exchange: String,
  type: {
    type: String,
    enum: ['buy', 'sell', 'split', 'deposit', 'withdrawal'],
  },
  shares: Number,
  commission: {
    type: Number,
    default: 0,
    get: currency.get,
    set: currency.set
  },
  costBasis: {
    type: Number,
    default: 0,
    get: currency.get,
    set: currency.set
  },
  labels: [String],
  date: {
    type: Date,
    default: Date.now
  },
  note: String,
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Transaction', TransactionSchema);
