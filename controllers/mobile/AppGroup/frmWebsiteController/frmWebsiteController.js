define({
  onViewCreated: function() {
    this.view.preShow = this.preShow;
  },

  onNavigate: function() {
    let urlConfig = {
      URL: "https://diit.edu.ua/",
      requestMethod: constants.BROWSER_REQUEST_METHOD_GET
    };

    this.view.browserWebSite.requestURLConfig = urlConfig;
  },

  preShow: function() {
    this.view.commonFooter.currentForm = this.getCurrentForm();
    this.view.commonHeader.lblTitle.text = "DIIT Website";
    this.view.commonHeader.flxGoBack.onTouchStart = () => Navigation.navigateTo("frmDashboard");
    this.view.onDeviceBack = () => Navigation.navigateTo("frmDashboard");
    this.view.commonHeader.flxLogout.onClick = () => logout(this, "notExpired");
  },
});