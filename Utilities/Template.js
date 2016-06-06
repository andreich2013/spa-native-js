(function(win) {
  'use strict';

  var Constructor = (function() {

    var DELIMETERS = /<%([^%>]+)?%>/g,
        OPERATORS = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;

    function add(line, js) {
      var text = "";

      js? (text += line.match(OPERATORS) ? line + '\n' : 'r.push(' + line + ');\n') :
          (text += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
          
      return text;
    }

    return function () {

      return function() {

        var code = 'var r=[];\n', 
            cursor = 0, 
            match,
            fn;

        while(match = DELIMETERS.exec(html)) {
          code += add(html.slice(cursor, match.index))(match[1], true);
          cursor = match.index + match[0].length;
        }

        code += add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';
        
        fn = new Function(code.replace(/[\r\t\n]/g, ''));

        return function() {
          return fn.apply(context || null, data)
        };

      };
      
    };

  }());

  win.Utilities().template = new Constructor();

}(window));
