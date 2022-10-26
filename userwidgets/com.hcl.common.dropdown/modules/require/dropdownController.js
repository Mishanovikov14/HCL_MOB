define(["Skins"], function (skins) {
  let componentConfig = {
    currentForm: "frmDashboard",
    context: {}
  };
  
  let dropdownData = [];

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
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
    },
    
    preShow: function() {
      
    },

    postShow: function() {
      this.initAction();
    },
    
    initAction: function() {
      this.view.flxMain.onTouchStart = () => {
        this.view.flxDropdownData.isVisible = this.view.flxDropdownData.isVisible ? false : true;
      };
      
      this.view.segDropdown.onRowClick = (eguiWidget, sectionNumber, rowNumber, selectedState) => {
        this.view.lblTitle.text = dropdownData[rowNumber];
        this.view.flxDropdownData.isVisible = false;
      };
    },
    
    initDropdown: function(data) {
      dropdownData = data;
      this.view.lblTitle.text = dropdownData[0];
      this.mapSegData(dropdownData);
    },
    
    mapSegData: function() {
    let mapedData = [];

    dropdownData.forEach(function(option, index) {
      mapedData.push({
        "lblOption": {"text": option},
      });
    });

    this.view.segDropdown.setData(mapedData);
  }
  };
});