(function(win) {
  'use strict';

  var Constructor = (function() {

    function findout(value) {
      var type = Object.prototype.toString.apply(value);

      return type.indexOf('object') === -1 ? type : type.slice(8, -1).toLowerCase(); 
    }

    return function () {

      return {

        isString: function(value) {
          return this.findout(value) === 'string';
        },

        isNumber: function(value) {
          return this.findout(value) === 'number';
        },

        isBoolean: function(value) {
          return this.findout(value) === 'boolean';
        },

        isUndefined: function(value) {
          return this.findout(value) === 'undefined';
        },

        isNull: function(value) {
          return this.findout(value) === 'null';
        },

        isObject: function(value) {
          return this.findout(value) === 'object';
        },

        isArray: function(value) {
          return this.findout(value) === 'array';
        },

        isFunction: function(value) {
          return this.findout(value) === 'function';
        }

      };
      
    };

  }());

  win.Utilities().type = new Constructor();

}(window));
