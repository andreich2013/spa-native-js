(function(win) {
  'use strict';

  win.app.router = new win.Utilities().Router();

  var view;

  function initView(params) {
    view.destroy();

    view = new win.app.views.Movies({
      el: win.document.querySelector('.spa-content'),
      template: response.data,
      id: params.id
    });

  }

  fetch('src/app/templates/movies.html').then(function(response) {
    win.app.router
      .state({
        title: 'movies.list',
        url: '/movies',
        success: initView
      })
      .state({
        title: 'movies.item',
        url: '/movies/:id',
        success: initView
      })
      .otherwise('/movies');
  });

}(window));
