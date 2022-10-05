let Navigation = (function() {
  return {
    navigateTo: function(formName, context) {
      (new voltmx.mvc.Navigation(formName)).navigate(context);
    },
  };
})();
