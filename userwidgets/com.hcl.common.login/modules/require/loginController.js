define(["Skins"], function (skins) {

//   var componentConfig = {
//     imgCloseVisibility: true,
//     buttonsVisibility: true,
//     descriptionVisibility: false,
//     context: null,
//     titleText: "Title text",
//     descriptionText: "Description",
//     btnFirstText: "Cancel",
//     btnSecondText: "Upprove",
//     onBtnFirstCallBack: function() {
//       alert("test");
//     },
//     onBtnSecondCallBack: function() {
//       alert("test");
//     }
//   };

//   var onClose = function () {
//     this.view.setVisibility(false);
//   };

  var uiInitialization = function() {
    this.view.imgCheck.src = "uncheck.png";
    this.view.imgLogo.src = "logo.png";
    this.view.btnLogin.skin = skins.SKIN_BUTTON_MAIN;
    this.view.btnLogin.focusSkin = skins.sknBtnFocusMain;
    this.view.btnLogin.text = "Login";
    this.view.lblRememberMe.text = "Remember me";
    this.view.lblRememberMe.skin = skins.SKIN_LABEL_REGULAR;
    this.view.inputUsername.placeholder = "User name";
    this.view.inputPassword.placeholder = "Password";
  };

  return {
    constructor: function(baseConfig, layoutConfig, platformSpecificConfig) {
      this.view.imgCheck.onTouchStart = () => {
            this.view.imgCheck.src = this.view.imgCheck.src === "uncheck.png" ? "check.png" : "uncheck.png";
      };
      

      uiInitialization.call(this);
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

    // exposed
//     showModal: function() {
//       if (!this.view.isVisible) {
//         this.view.setVisibility(true);
//       }
//     }
  };
});