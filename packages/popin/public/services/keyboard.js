'use strict';

angular.module('mean').service('KeyboardService', function($document) {

var keyboardMap = {
  97: '1',
  98: '2',
  99: '3',
  100: '4',
  101: '5',
  102: '6',
  103: '7',
  104: '8',
  105: '9'
};

this.init = function() {
  var self = this;
  this.keyEventHandlers = [];
  $document.bind('keydown', function(evt) {
    var key = keyboardMap[evt.which];

    if (key) {
      // An interesting key was pressed
      evt.preventDefault();
      self._handleKeyEvent(key, evt);
    }
  });
};

this.on = function(cb) {
  this.keyEventHandlers.push(cb);
};

this._handleKeyEvent = function(key, evt) {
  var callbacks = this.keyEventHandlers;
  if (!callbacks) {
    return;
  }

  evt.preventDefault();

  if (callbacks) {
    for (var x = 0; x < callbacks.length; x++) {
      var cb = callbacks[x];
      cb(key, evt);
    }
  }
};

});
