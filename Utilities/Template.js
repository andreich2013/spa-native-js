(function(win) {
  'use strict';

  var Constructor = (function() {

    var DELIMETERS = /<%([^%>]+)?%>/g;

    return function(text) {
      var html = text.replace(/\"/g, '\\"'),
          source = '\"',
          offset = 0,
          match, code, fn;

      while(match = DELIMETERS.exec(html)) {
        source += html.substring(offset, match.index) + "\"+" + match[1] + "+\"";

        offset = match.index + match[0].length;
      }

      source += text.substring(offset) + "\"";

      code = source .replace(/\r/g, '\\r')
                    .replace(/\t/g, '\\t')
                    .replace(/\n/g, '\\n');

      fn = new Function("a", 'return ' + code + ';');

      return function(data, context) {
        return fn.apply(context || null, [data]);
      };

    };

  }());

  win.Utilities.template = Constructor;

}(window));
