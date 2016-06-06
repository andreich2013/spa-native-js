(function(win) {
  'use strict';

  var Constructor = (function() {

    var _instance;

    return function() {
      if (!!_instance) {
        return _instance;
      }

      _instance = this;

      return _instance;
    }

  }());

  win.Utilities = new Constructor();

}(window));
