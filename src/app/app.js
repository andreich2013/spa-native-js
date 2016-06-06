(function(win) {
  'use strict';

  var Constructor = (function() {

    return function() {

      this.models = {};
      this.views = {};

      return this;

    };

  }());

  win.app.models = new Constructor();

}(window));