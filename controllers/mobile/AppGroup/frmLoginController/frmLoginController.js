define({ 
  isSessionExpired: null,

  onViewCreated: function() {
    this.view.postShow = this.postShow;
  },

  onNavigate: function(isSessionExpired) {
    let rememberMe = voltmx.store.getItem("rememberMe");
    
    this.view.login.resetUi();
    this.isSessionExpired = isSessionExpired;

    if (rememberMe) {
      this.view.login.usernameText = rememberMe.userid;
    }
  },

  postShow: function() {
    if (this.isSessionExpired) {
      let data = {
        text: this.isSessionExpired === "expired" ? "User session was expired" : "You successfully logout!",
        type: this.isSessionExpired === "expired" ? "error" : "success",
        initialTop: "-40dp",
        finalTop: "70dp"
      };

      this.view.animatedNotification.onShow(data);
    }
  }
});