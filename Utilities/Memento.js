(function(win) {
  'use strict';

  var Constructor = (function() {

    return function () {

      this._data = {};

      this.$set = function(key, value) {

        try{
            this._data.set(key, JSON.stringify(value));
        } catch(e) {

        };

      };

      this.$get = function(key) {
        var state = this._data[key];

        return state ? JSON.parse(state) : undefined;
      }

      return this;

    };

  }());

  win.Utilities().Memento = Constructor;

}(window));
