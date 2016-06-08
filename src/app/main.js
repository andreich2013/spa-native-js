(function(win) {
  'use strict';

  win.app.router = new win.Utilities.Router();

  var router = new window.Utilities.Router(),
      templates = {
        layout: window.Utilities.template(document.querySelector('#movies-template').innerHTML),
        video: window.Utilities.template(document.querySelector('#movies-video-template').innerHTML),
        source: window.Utilities.template(document.querySelector('#movies-video-source-template').innerHTML),
        item: window.Utilities.template(document.querySelector('#movies-item-template').innerHTML)
      },
      view;

  function initView(params) {
    if(view) {
      view.destroy();
    }

    view = new win.app.views.Movies({
      el: win.document.querySelector('.spa-content'),
      templates: templates,
      id: params[0]
    });

  }

  router
      .states
      .splice(0, 0,
          {
              title: 'movies.list',
              pattern: /^\/movies$/
          },
          {
              title: 'movies.item',
              pattern: /^\/movies\/([^\/?]+)$/
          }
      );

  router.otherwise = '/movies';

  router.on('state:movies.list', function(args) {
      initView(args);
  });

  router.on('state:movies.item', function(args) {
      initView(args);
  });

  router.start();

}(window));
