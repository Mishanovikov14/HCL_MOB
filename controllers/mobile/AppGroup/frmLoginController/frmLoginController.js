define({ 
  onViewCreated: function() {
    this.view.preShow = this.preShow;
  },

  onNavigate: function() {
    this.view.login.resetUi();
    
	this.view.login.btnLoginOnClick = () => {
      let cred = {
        userid: "mnovik@softserveinc.com",
        password: "Kony@123"
      };
    this.onLogin(cred);
//       this.view.login.showError();
    };
  },
  
  getIdentityService: function() {
    return new kony.sdk.getDefaultInstance().getIdentityService("schoolLogin");
  },
  
  onLogin: function(credentials) {
//     componentsManager.showLoader();
    this.getIdentityService().login(credentials, this.onLoginSuccessCallback, this.onLoginErrorCallback);
  },
  
  onLoginSuccessCallback: function() {
    this.getUserAttributes();
  },
  
  onLoginErrorCallback: function(error) {
//     componentsManager.hideLoader();
    alert("something went wrong");
//     this.view.login.setDefaultState(this);
//     this.removeRememberMe();
    
//     componentsManager.showMessage("error", "Wrong credentials", 20);
  },
  
  getUserAttributes: function() {
    this.getIdentityService().getUserAttributes(
      this.getUserAttributesSuccessCallback, 
      this.getUserAttributesErrorCallback
    );
  },
  
  getUserAttributesSuccessCallback: function(response) {
//     componentsManager.hideLoader();
//     if (!response.groups.length || !response.groups.includes("Admins")) {
//       componentsManager.showMessage("error", "Don't have admin rights to log in", 20);
//       this.removeRememberMe();
//       return;
//     }
    voltmx.store.setItem("userInfo", JSON.parse(response._provider_profile));
    Navigation.navigateTo("frmDashboard");

//     var homeScreen = new voltmx.mvc.Navigation("frmHome");
//     homeScreen.navigate(null);
  },

  getUserAttributesErrorCallback: function(error) {
//     componentsManager.hideLoader();
        alert("something went wrong");

//     this.view.login.setDefaultState(this);
//     this.removeRememberMe();
    
//     componentsManager.showMessage("error", "Something went wrong", 20);
  },

  preShow: function() {

  }
});