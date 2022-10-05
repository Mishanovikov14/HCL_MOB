define(["Skins"], function (skins) {
  let uiInitialization = function() {
    let rememberMe = voltmx.store.getItem("rememberMe");
    
    this.view.imgCheck.src = rememberMe ? "check.png" : "uncheck.png";
    this.view.imgLogo.src = "logo.png";
    this.view.btnLogin.skin = skins.SKIN_BUTTON_MAIN;
    this.view.btnLogin.focusSkin = skins.SKIN_BUTTON_FOCUS_MAIN;
    this.view.btnLogin.text = "Login";
    this.view.lblRememberMe.text = "Remember me";
    this.view.lblRememberMe.skin = skins.SKIN_LABEL_REGULAR;
    this.view.inputUsername.placeholder = "User name";
    this.view.inputPassword.placeholder = "Password";
    this.view.inputUsername.focusSkin = skins.SKIN_INPUT_MAIN;
    this.view.inputPassword.focusSkin = skins.SKIN_INPUT_MAIN;
    this.view.inputUsername.skin = skins.SKIN_INPUT_MAIN;
    this.view.inputPassword.skin = skins.SKIN_INPUT_MAIN;
    
    if (rememberMe) {
      this.view.inputUsername.text = rememberMe.userid;
      this.view.inputPassword.text = rememberMe.password;
    }

    if (voltmx.os.deviceInfo().name === "iPhone" || voltmx.os.deviceInfo().name === "android") {
      this.view.flxMain.width = "80%";
      this.view.inputUsername.placeholderSkin = skins.SKIN_INPUT_MAIN;
      this.view.inputPassword.placeholderSkin = skins.SKIN_INPUT_MAIN;
    } else {
      this.view.flxMain.width = "30%";
      this.view.inputUsername.placeholderSkin = skins.SKIN_INPUT_PLACEHOLDER_WEB;
      this.view.inputPassword.placeholderSkin = skins.SKIN_INPUT_PLACEHOLDER_WEB;
    }
  };

  return {
    constructor: function(baseConfig, layoutConfig, platformSpecificConfig) {
      uiInitialization.call(this);
    },

    initGettersSetters: function() {
    },

    showError: function() {
      debugger;
      this.view.lblErrorText.isVisible = true;
      this.view.inputPassword.text = "";
      this.view.inputUsername.text = "";
      this.view.inputUsername.skin = skins.SKIN_INPUT_ERROR;
      this.view.inputPassword.skin = skins.SKIN_INPUT_ERROR;
      this.view.inputUsername.focusSkin = skins.SKIN_INPUT_ERROR;
      this.view.inputPassword.focusSkin = skins.SKIN_INPUT_ERROR;

      if (voltmx.os.deviceInfo().name === "iPhone" || voltmx.os.deviceInfo().name === "android") {
        this.view.inputUsername.placeholderSkin = skins.SKIN_INPUT_ERROR;
        this.view.inputPassword.placeholderSkin = skins.SKIN_INPUT_ERROR;
      }
    },

    resetUi: function() {
      this.view.inputUsername.skin = skins.SKIN_INPUT_MAIN;
      this.view.inputUsername.text = "";
      this.view.inputPassword.skin = skins.SKIN_INPUT_MAIN;
      this.view.inputPassword.text = "";
    },

    onViewCreated: function() {
      this.view.postShow = this.postShow;
    },

    postShow: function() {
      this.initActions();

      if (voltmx.os.deviceInfo().name === "thinclient") {
        let inputElements = document.getElementsByTagName("input");
        let elements = Array.prototype.slice.call(inputElements);
        elements.forEach(function(element) {
          element.style.outline = "none";
        });

        this.view.skin = skins.SKIN_LOGIN_BACKGROUND_WEB;
      } else {
        this.view.skin = skins.SKIN_LOGIN_BACKGROUND;
      }
    },

    initActions: function() {
      this.view.imgCheck.onTouchStart = () => {
        this.view.imgCheck.src = this.view.imgCheck.src === "uncheck.png" ? "check.png" : "uncheck.png";
      };

      this.view.btnLogin.onClick = () => {
        let credentials = {
          userid: this.view.inputUsername.text,
          password: this.view.inputPassword.text
        };

        this.onLogin(credentials);
      };

      this.view.inputUsername.onTextChange = () => {
        this.view.inputUsername.skin = skins.SKIN_INPUT_MAIN;
        this.view.inputPassword.skin = skins.SKIN_INPUT_MAIN;
        this.view.inputUsername.focusSkin = skins.SKIN_INPUT_MAIN;
        this.view.inputPassword.focusSkin = skins.SKIN_INPUT_MAIN;

        if (voltmx.os.deviceInfo().name === "iPhone" || voltmx.os.deviceInfo().name === "android") {
          this.view.inputUsername.placeholderSkin = skins.SKIN_INPUT_MAIN;
          this.view.inputPassword.placeholderSkin = skins.SKIN_INPUT_MAIN;
        }
        
        this.view.lblErrorText.isVisible = false;
      };

      this.view.inputPassword.onTextChange = () => {
        this.view.inputUsername.skin = skins.SKIN_INPUT_MAIN;
        this.view.inputPassword.skin = skins.SKIN_INPUT_MAIN;
        this.view.inputUsername.focusSkin = skins.SKIN_INPUT_MAIN;
        this.view.inputPassword.focusSkin = skins.SKIN_INPUT_MAIN;

        if (voltmx.os.deviceInfo().name === "iPhone" || voltmx.os.deviceInfo().name === "android") {
          this.view.inputUsername.placeholderSkin = skins.SKIN_INPUT_MAIN;
          this.view.inputPassword.placeholderSkin = skins.SKIN_INPUT_MAIN;
        }

        this.view.lblErrorText.isVisible = false;
      };
    },

//     getIdentityService: function() {
//       return new voltmx.sdk.getDefaultInstance().getIdentityService("schoolLogin");
//     },

    onLogin: function(credentials) {
      let identityService = new voltmx.sdk.getDefaultInstance().getIdentityService("schoolLogin");
      identityService.login(credentials, this.onLoginSuccessCallback, this.onLoginErrorCallback);
    },

    onLoginSuccessCallback: function() {
      this.getUserAttributes();
      
      if (this.view.imgCheck.src === "check.png") {
        let credentials = {
          userid: this.view.inputUsername.text,
          password: this.view.inputPassword.text
        };
        
        voltmx.store.setItem("rememberMe", credentials);
      } else {
        voltmx.store.removeItem("rememberMe");
      }
    },

    onLoginErrorCallback: function(error) {
      this.showError();
    },

    getUserAttributes: function() {
      let identityService = new voltmx.sdk.getDefaultInstance().getIdentityService("schoolLogin");
      identityService.getUserAttributes(this.getUserAttributesSuccessCallback, this.getUserAttributesErrorCallback);
    },

    getUserAttributesSuccessCallback: function(response) {
      voltmx.store.setItem("userInfo", JSON.parse(response._provider_profile));
      Navigation.navigateTo("frmDashboard");
    },

    getUserAttributesErrorCallback: function(error) {
      alert("something went wrong");
    },
  };
});