define(["Skins"], function (skins) {
  let componentConfig = {
    currentForm: "frmDashboard",
    context: {}
  };

  return {
    constructor: function(baseConfig, layoutConfig, platformSpecificConfig) {
    },

    initGettersSetters: function() {
            defineGetter(this, "currentForm", () => {
                return componentConfig.currentForm;
            });
            defineSetter(this, "currentForm", value => {
                componentConfig.currentForm = value;
                this.view.flxHrzLine1.skin = componentConfig.currentForm !== "frmDashboard" && componentConfig.currentForm !== "frmDetails" ? "slFbox" : "sknFlxSeparatorWeb";
                this.view.flxHrzLine2.skin = componentConfig.currentForm !== "frmLocation" ? "slFbox" : "sknFlxSeparatorWeb";
            });
            defineGetter(this, "context", () => {
                return componentConfig.context;
            });
            defineSetter(this, "context", value => {
                componentConfig.context = value;
            });
        },

    onViewCreated: function() {
      this.view.postShow = this.postShow;
    },

    postShow: function() {
      this.initAction();
    },
    
    initAction: function() {
      this.view.flxTitle1.onTouchStart = () => {
        if (componentConfig.currentForm !== "frmDashboard") {
          Navigation.navigateTo("frmDashboard");
        }
      };

      this.view.flxTitle2.onTouchStart = () => {
        if (componentConfig.currentForm !== "frmLocation") {
          Navigation.navigateTo("frmLocation");
        }
      };
      
      this.view.flxLogout.onTouchStart = () => {
        logout(componentConfig.context, "notExpired");
      };
    }
  };
});