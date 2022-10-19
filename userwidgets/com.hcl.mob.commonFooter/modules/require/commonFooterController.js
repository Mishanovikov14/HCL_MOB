define(function() {
  let componentConfig = {
    currentForm: "frmDashboard",
  };

  return {
    constructor: function(baseConfig, layoutConfig, platformSpecificConfig) {
    },

    initGettersSetters: function() {
      defineGetter(this, 'currentForm', () => {
        return componentConfig.currentForm;
      });
      defineSetter(this, 'currentForm', value => {
        componentConfig.currentForm = value;
        
        this.view.imgIcon1.src = componentConfig.currentForm === "frmDashboard" ? "home.png" : "homeactive.png";
        this.view.imgIcon2.src = componentConfig.currentForm !== "frmLocation" ? "location.png" : "locationactive.png";
        this.view.imgIcon3.src = componentConfig.currentForm !== "frmWebsite" ? "website.png" : "websiteactive.png";
      });
    },

    onViewCreated: function() {
      this.view.postShow = this.postShow;
    },

    postShow: function() {
      this.initAction();
    },
    
    initAction: function() {
      this.view.flxBtn1.onTouchStart = () => {
        if (componentConfig.currentForm !== "frmDashboard") {
          Navigation.navigateTo("frmDashboard");
        }
      };

      this.view.flxBtn2.onTouchStart = () => {
        if (componentConfig.currentForm !== "frmLocation") {
          Navigation.navigateTo("frmLocation");
        }
      };

      this.view.flxBtn3.onTouchStart = () => {
        if (componentConfig.currentForm !== "frmWebsite") {
          Navigation.navigateTo("frmWebsite");
        }
      };
    }
  };
});