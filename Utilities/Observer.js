(function(win) {
  'use strict';

  var Constructor = (function() {

    return function () {

      return {

        on: function(eventName, handler, context) {

          if (!this._eventHandlers) {
              this._eventHandlers = [];
          }

          if (!this._eventHandlers[eventName]) {
              this._eventHandlers[eventName] = [];
          }
          
          this._eventHandlers[eventName].push({fn: handler, ctx: context});

        },

        off: function(eventName, handler) {

          if (!this._eventHandlers || !this._eventHandlers[eventName]) {
              return;
          }

          var handlers = this._eventHandlers[eventName];

          for(let i = 0, length = handlers.length; i < handlers.length; i++) {
              if (handlers[i].fn == handler) {
                  handlers.splice(i--, 1);
              }
          }

        },

        trigger: function(eventName) {

          if (!this._eventHandlers || !this._eventHandlers[eventName]) {
              return;
          }

          var args = Array.prototype.slice.call(arguments, 1);

          this._eventHandlers[eventName].forEach(function(handler) {
              handler.fn.apply(handler.ctx || this, args);
          }, this);

        }

      };

    };

  }());

  win.Utilities.Observer = Constructor;

}(window));
