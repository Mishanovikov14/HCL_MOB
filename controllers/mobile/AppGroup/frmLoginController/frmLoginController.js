define({ 
  onNavigate: function() {  
    this.view.login.resetUi();
    
    let rememberMe = voltmx.store.getItem("rememberMe");
    
    if (rememberMe) {
      this.view.login.passwordText = rememberMe.password;
      this.view.login.usernameText = rememberMe.userid;
    }
  },
});