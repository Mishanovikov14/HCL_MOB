define({
  userData: {},
  userType: "",
  
  onViewCreated: function() {
    this.view.postShow = this.postShow;
  },

  onNavigate: function() {
    this.userData = voltmx.store.getItem("userInfo");
    this.userType = voltmx.store.getItem("userType");
  },

  postShow: function() {
    this.view.commonHeader.currentForm = this.getCurrentForm();
  }
});