define({
  onViewCreated: function() {
    this.view.preShow = this.preShow;
  },

  onNavigate: function() {
  },

  preShow: function() {
    this.view.commonFooter.currentForm = this.getCurrentForm();
  }
});