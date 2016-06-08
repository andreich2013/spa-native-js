(function(win) {
  'use strict';

  var Constructor = (function() {

    return function(options) {

      this.id = options.id ? options.id : null;
      this.el = options.el;

      this.model = new win.app.models.Movies();

      this.init = function() {

        this.model.on('list:changed', this.render);
        this.model.on('item:changed', this.render);

        this.model.fetch();

        if(!!this.id) {
          this.model.setItem(this.id);
        }

      };

      this.render = function() {
        var moviesList = this.model.list.map(function(item) {
              return options.templates.item(item);
            }),
            video;

        if(this.model.item) {
          this.model.item.sourcesList = this.model.item.streams.map(function(item) {
            return options.templates.source(item);
          }).join("");

          video = options.templates.video(this.model.item);
        }

        this.el.innerHTML = options.templates.layout({
          video: video,
          moviesList: moviesList.join("")
        });
      }.bind(this);

      this.destroy = function() {
        this.model.off('list:changed', this.render);
        this.model.off('item:changed', this.render);
      };

      this.init();

    }

  }());

  win.app.views.Movies = Constructor;

}(window));