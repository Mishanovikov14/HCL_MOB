define(function() {
  let dropdownData = [];

  return {
    constructor: function(baseConfig, layoutConfig, platformSpecificConfig) {
    },

    initGettersSetters: function() {

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
    },

    initDropdown: function(data) {
      dropdownData = data;
      this.view.lblTitle.text = dropdownData[0];
      this.mapSegData(dropdownData);
    },

    onSelection: function(rowNumber, peopleData) {
      this.view.lblTitle.text = dropdownData[rowNumber];
      this.view.flxDropdownData.isVisible = false;

      let selectedFilter = this.view.lblTitle.text.replace("Filter by ", "") === "position" ? "role" : this.view.lblTitle.text.replace("Filter by ", "");
      peopleData.sort(function(a, b) {
        if (typeof a[selectedFilter] === 'number') {
          return a[selectedFilter] - b[selectedFilter];
        } else {
          if (a[selectedFilter] > b[selectedFilter]) {
            return 1;
          }

          if (a[selectedFilter] < b[selectedFilter]) {
            return -1;
          }
          return 0;
        }
      });

      return peopleData;
    },

    closeDropdown: function() {
      this.view.flxDropdownData.isVisible = false;
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