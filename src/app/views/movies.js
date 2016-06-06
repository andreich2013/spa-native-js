(function(win) {
  'use strict';

  var Constructor = (function() {

    return function(options) {

      this.id = options.id ? id : null;
      this.el = options.el;

      this.model = new win.app.models.Movies();
      this.template = win.Utilities().template(options.template);

      this.init = function() {

        this.model.on('list:changed', this.render);
        this.model.on('item:changed', this.render);

        this.model.fetch();

        if(!!this.id) {
          this.model.setItem(this.id);
        }

      };

      thjs.render = function() {
        this.el.innerHTML = this.template(this.model);
      };

      this.destroy = function() {
        this.model.off('list:changed', this.render);
        this.model.off('item:changed', this.render);
      };

      this.init();

    }

  }());

  win.app.views.Movies = Constructor;

}(window));