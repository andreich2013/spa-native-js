(function(win) {
  'use strict';

  var PATTERN = /\/\:([^\/]+)?/g;

  var Constructor = (function() {

    var _instance;

    return function() {
      if (!!_instance) {
        return _instance;
      }

      var self = this;

      function findElement(el, fn) {
        if(fn(el)) {
          return el;
        }

        if(el.parentElement) {
          return findElement(el.parentElement, fn);
        }

        return null;
      }

      this.states = [];

      this.otherwise = null;

      win.onpopstate = function(event) {
        self.getState(win.location.pathname);
      };

      win.document.addEventListener('click', function(e) {
        var link = findElement(e.target, function(el) {
          return el.tagName === 'A';
        });

        if(!!link) {
          e.preventDefault();

          self.navigate(link.pathname);
        }

      }, false);

      _instance = this;

      return _instance;
    }

  }());

  var observer = new win.Utilities.Observer();

  Constructor.prototype.on = observer.on;
  Constructor.prototype.off = observer.off;
  Constructor.prototype.trigger = observer.trigger;

  Constructor.prototype.extractParameters = function(state, search) {
    var params = state.pattern.exec(search).slice(1);

    return params.map(function(param, i) {
      return param ? decodeURIComponent(param) : null;
    });
  };

  Constructor.prototype.getState = function(search) {

    var state = this.states.find(function(item) {
      return item.pattern.test(search);
    });

    if(!state) {
      this.navigate(this.otherwise, {
        replace: true
      });
      return;
    }

    var params = this.extractParameters(state, search);

    this.trigger('state:' + state.title, params);
  }

  Constructor.prototype.navigate = function(url, options) {
    if(!options) {
      options = {};
    }

    var method = options.replace ? 'replaceState' : 'pushState';

    win.history[method](options.state || null, null, url);
    this.getState(win.location.pathname);
  }

  Constructor.prototype.start = function() {
    this.getState(win.location.pathname);
  }

  win.Utilities.Router = Constructor;

}(window));
