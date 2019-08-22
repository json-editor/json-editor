export var markupTemplate = function() {
  if(!window.Mark || !window.Mark.up) return false;

  return {
    compile: function(template) {
      return function(context) {
        return window.Mark.up(template,context);
      };
    }
  };
};
