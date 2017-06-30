/**
 * Label model events
 */

'use strict';

import {EventEmitter} from 'events';
import Label from './label.model';
var LabelEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LabelEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Label.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LabelEvents.emit(event + ':' + doc._id, doc);
    LabelEvents.emit(event, doc);
  }
}

export default LabelEvents;
