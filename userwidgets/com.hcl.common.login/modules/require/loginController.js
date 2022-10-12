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

    showError: function(erroeText) {
      this.view.lblErrorText.isVisible = true;
      this.view.lblErrorText.text = erroeText;
      this.view.inputPassword.text = "";
      this.view.inputUsername.text = "";
      this.view.inputUsername.skin = skins.SKIN_INPUT_ERROR;
      this.view.inputPassword.skin = skins.SKIN_INPUT_ERROR;
      this.view.inputUsername.focusSkin = skins.SKIN_INPUT_ERROR;
      this.view.inputPassword.focusSkin = skins.SKIN_INPUT_ERROR;
      this.view.inputUsername.setFocus(true);

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
      this.view.preShow = this.preShow;
    },

    preShow: function() {
      if (voltmx.os.deviceInfo().name === "thinclient") {
        this.view.skin = skins.SKIN_LOGIN_BACKGROUND_WEB;
      } else {
        this.view.skin = skins.SKIN_LOGIN_BACKGROUND;
      }
    },

    postShow: function() {
      this.initActions();

      if (voltmx.os.deviceInfo().name === "thinclient") {
        let inputElements = document.getElementsByTagName("input");
        let elements = Array.prototype.slice.call(inputElements);
        elements.forEach(function(element) {
          element.style.outline = "none";
        });
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

        if (this.view.inputPassword.text.length === 0 && this.view.inputUsername.text.length === 0) {
          this.showError("Username and password is required");
          return;
        }

        if (this.view.inputUsername.text.length === 0) {
          this.view.lblErrorText.isVisible = true;
          this.view.lblErrorText.text = "Username is required";
          this.view.inputPassword.text = "";
          this.view.inputUsername.text = "";
          this.view.inputUsername.skin = skins.SKIN_INPUT_ERROR;
          this.view.inputUsername.focusSkin = skins.SKIN_INPUT_ERROR;
          this.view.inputUsername.setFocus(true);

          if (voltmx.os.deviceInfo().name === "iPhone" || voltmx.os.deviceInfo().name === "android") {
            this.view.inputUsername.placeholderSkin = skins.SKIN_INPUT_ERROR;
          }
          return;
        }

        if (this.view.inputPassword.text.length === 0) {
          this.view.lblErrorText.isVisible = true;
          this.view.lblErrorText.text = "Password is required";
          this.view.inputPassword.text = "";
          this.view.inputPassword.skin = skins.SKIN_INPUT_ERROR;
          this.view.inputPassword.focusSkin = skins.SKIN_INPUT_ERROR;
          this.view.inputPassword.setFocus(true);

          if (voltmx.os.deviceInfo().name === "iPhone" || voltmx.os.deviceInfo().name === "android") {
            this.view.inputPassword.placeholderSkin = skins.SKIN_INPUT_ERROR;
          }
          return;
        }

        showLoadingScreen();
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
      if (error.mfcode === "Auth-4") {
        this.showError("Invalid username or password");
      } else {
        let data = {
          text: "Something went wrong!",
          type: "error",
          initialTop: "-40dp",
          finalTop: "70dp"
        };

        this.view.animatedNotification.onShow(data);
      }

      dismissLoadingScreen();
    },

    getUserAttributes: function() {
      let identityService = new voltmx.sdk.getDefaultInstance().getIdentityService("schoolLogin");
      identityService.getUserAttributes(this.getUserAttributesSuccessCallback, this.getUserAttributesErrorCallback);
    },

    getUserAttributesSuccessCallback: function(response) {
      voltmx.store.setItem("userInfo", JSON.parse(response._provider_profile));
      voltmx.store.setItem("userType", response.groups[0]);

      dismissLoadingScreen();
      Navigation.navigateTo("frmDashboard");
    },

    getUserAttributesErrorCallback: function(error) {
      let data = {
        text: "Something went wrong!",
        type: "error",
        initialTop: "-40dp",
        finalTop: "70dp"
      };

      this.view.animatedNotification.onShow(data);
      dismissLoadingScreen();
    },
  };
});