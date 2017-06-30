/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import UserEvents from './user.events';

// Model events to emit
var events = ['save', 'remove'];

export function register(socket, io) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('user:' + event, socket, io);

    UserEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket, io) {
  return function(doc) {
    // console.log(`Emitting: ${event} to ${socket.id}`);
    // console.log(`Emitting: ${event} to ${socket.client.id}`);
    // socket.broadcast.to(socket.id).emit(event, doc);

    // socket.to(socket.id).emit(event, doc);
    // socket.to(doc._id).emit('Testing');
    // socket.emit(event, doc);
    // io.of('/').to(socket.id).emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    UserEvents.removeListener(event, listener);
  };
}
