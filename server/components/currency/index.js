/**
 * Currency utilities
 */

'use strict';

module.exports.get = function get(amt) {
  return amt / 1000;
};

module.exports.set = function set(amt) {
  return amt * 1000;
};
