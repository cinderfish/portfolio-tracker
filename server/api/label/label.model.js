'use strict';

import mongoose from 'mongoose';

var LabelSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Label', LabelSchema);
