define(["Skins"], function (skins) {
  let componentConfig = {
    currentForm: "frmDashboard",
    context: {}
  };

  return {
    constructor: function(baseConfig, layoutConfig, platformSpecificConfig) {
    },

    initGettersSetters: function() {
//             defineGetter(this, 'currentForm', () => {
//                 return componentConfig.currentForm;
//             });
//             defineSetter(this, 'currentForm', value => {
//                 componentConfig.currentForm = value;
//                 this.view.flxHrzLine1.skin = componentConfig.currentForm !== 'frmDashboard' ? 'slFbox' : 'sknFlxSeparatorWeb';
//                 this.view.flxHrzLine2.skin = componentConfig.currentForm !== 'frmLocation' ? 'slFbox' : 'sknFlxSeparatorWeb';
//             });
//             defineGetter(this, 'context', () => {
//                 return componentConfig.context;
//             });
//             defineSetter(this, 'context', value => {
//                 componentConfig.context = value;
//             });
        },

    onViewCreated: function() {
      this.view.postShow = this.postShow;
    },

    postShow: function() {
      this.initAction();
    },
    
    initAction: function() {
      this.view.onTouchStart = () => {
        this.view.flxDropdownData.isVisible = this.view.flxDropdownData.isVisible ? false : true;
      };
    }
  };
});