define({ 
  onViewCreated: function() {
    this.view.preShow = this.preShow;
  },

  onNavigate: function() {
    this.view.login.resetUi();

    this.view.login.btnLoginOnClick = () => {
      alert("login");
    };
  },

  preShow: function() {

  }
});