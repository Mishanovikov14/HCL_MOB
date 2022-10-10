define({
  onViewCreated: function() {
    this.view.preShow = this.preShow;
  },

  onNavigate: function() {
  },

  preShow: function() {
    this.view.commonFooter.currentForm = this.getCurrentForm();
    this.view.commonHeader.lblTitle.text = "DIIT location";
    this.view.commonHeader.flxGoBack.onTouchStart = () => Navigation.navigateTo("frmDashboard");
  },
});