/**
 * Holding model events
 */

'use strict';

import {EventEmitter} from 'events';
import Holding from './holding.model';
var HoldingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
HoldingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Holding.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    HoldingEvents.emit(event + ':' + doc._id, doc);
    HoldingEvents.emit(event, doc);
  }
}

export default HoldingEvents;
