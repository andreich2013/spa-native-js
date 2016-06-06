(function(win) {
  'use strict';

  var Constructor = (function() {

    return function() {

      var url = win.app.config.endpoint + '/movies';

      this.list = [];
      this.item = null;

      this.fetch = function() {
        var self = this;

        self.read().then(function(data) {
          self.list = data;

          self.trigger('list:changed');
        });
      };

      this.setItem = function(id) {
        var self = this;

        self.read(id).then(function(data) {
          self.item = data;

          self.trigger('item:changed');
        });
      };

      this.create = function () {
        return win.fetch(url + '/' + id, {
          method: 'POST'
        }).then(function(response) {
          return response.data;
        });
      };

      this.read = function (id) {
        return win.fetch(url + (id ? '/' + id : ''), {
          method: 'GET'
        }).then(function(response) {
          return response.data;
        });
      };

      this.update = function (id) {
        return win.fetch(url + '/' + id, {
          method: 'PUT'
        }).then(function(response) {
          return response.data;
        });
      };

      this.delete = function (id) {
        return win.fetch(url + '/' + id, {
          method: 'DELETE'
        }).then(function(response) {
          return response.data;
        });
      };

      return this;

    }

  }());

  var observer = new win.Utilities().Observer();

  Constructor.prototype.on = observer.on;
  Constructor.prototype.off = observer.off;
  Constructor.prototype.trigger = observer.trigger;

  win.app.models.Movies = Constructor;

}(window));