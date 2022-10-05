define(["Skins"], function (skins) {
  let uiInitialization = function() {
    this.view.imgCheck.src = "uncheck.png";
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

    if (kony.os.deviceInfo().name === "iPhone" || kony.os.deviceInfo().name === "android") {
      this.view.flxMain.width = "80%";
      this.view.inputUsername.placeholderSkin = skins.SKIN_INPUT_MAIN;
      this.view.inputPassword.placeholderSkin = skins.SKIN_INPUT_MAIN;
    } else {
      this.view.flxMain.width = "30%";
      this.view.inputUsername.placeholderSkin = skins.SKIN_INPUT_PLACEHOLDER_WEB;
      this.view.inputPassword.placeholderSkin = skins.SKIN_INPUT_PLACEHOLDER_WEB;
    }
  };
  
  let initAction = function() {
    this.view.inputUsername.onBeginEditing = () => {
      this.view.inputUsername.skin = skins.SKIN_INPUT_MAIN;
      this.view.inputUsername.text = "";
    };

    this.view.inputPassword.onBeginEditing = () => {
      this.view.inputPassword.skin = skins.SKIN_INPUT_MAIN;
      this.view.inputPassword.text = "";
    };
  };

  return {
    constructor: function(baseConfig, layoutConfig, platformSpecificConfig) {
      this.view.imgCheck.onTouchStart = () => {
        this.view.imgCheck.src = this.view.imgCheck.src === "uncheck.png" ? "check.png" : "uncheck.png";
      };

      uiInitialization.call(this);
      initAction.call(this);
    },

    initGettersSetters: function() {
      //             defineGetter(this, 'titleText', () => {
      //                 return componentConfig.titleText;
      //             });
      //             defineSetter(this, 'titleText', value => {
      //                 if (value) {
      //                     componentConfig.titleText = value;
      //                 }
      //                 this.view.lblTitle.text = componentConfig.titleText;
      //             });
    },
    
    showError: function() {
      this.view.inputUsername.skin = skins.SKIN_INPUT_ERROR;
      this.view.inputPassword.skin = skins.SKIN_INPUT_ERROR;
      this.view.inputUsername.text = "Invalid user name";
      this.view.inputPassword.text = "Invalid password";
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
      if (kony.os.deviceInfo().name === "thinclient") {
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
  };
});