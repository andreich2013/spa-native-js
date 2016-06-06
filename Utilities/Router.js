(function(win) {
  'use strict';

  var Constructor = (function() {

    var _instance;

    return function() {
      if (!!_instance) {
        return _instance;
      }

      this.routes = [];

      _instance = this;

      return _instance;
    }

  }());

  Constructor.prototype.state = function (state) {

    if(!state) {
      return;
    }

    this.routes.push(state);

  };

  Constructor.prototype.goTo = function(key) {

    var route = this.routes.find(function(item) { return item.title === key; });

    if(!route) {
      return;
    }

  }

  win.Utilities().Router = Constructor;

}(window));
