define({
  onViewCreated: function() {
    this.view.preShow = this.preShow;
  },

  onNavigate: function() {
    this.view.mapWidget.mapKey = "AIzaSyBM8KyM0og7riVUwQ71I4xzl6NjzmSwtlY";

    var highAccuracyOptions = {
      enableHighAccuracy : true,
      timeout : 20000,
      maximumAge : 60000,
      useBestProvider : true
    };

    let currentPosition = voltmx.location.getCurrentPosition(this.successGetCurrentLocation, this.errorGetCurrentLocation, highAccuracyOptions);
  },

  successGetCurrentLocation: function(response) {
    let lat = response.coords.latitude;
    let lng = response.coords.longitude;

    this.getNearestSchools(lat, lng);
  },

  errorGetCurrentLocation: function(erro) {
    alert("error");
  },

  preShow: function() {
    this.view.commonFooter.currentForm = this.getCurrentForm();
    this.view.commonHeader.lblTitle.text = "Nearest schools";
    this.view.commonHeader.flxGoBack.onTouchStart = () => Navigation.navigateTo("frmDashboard");
    this.view.onDeviceBack = () => Navigation.navigateTo("frmDashboard");
    this.view.commonHeader.flxLogout.onClick = () => logout(this, "notExpired");
  },

  getNearestSchools: function(lat, lng) {
    let sdk = voltmx.sdk.getCurrentInstance();
    let mapService = sdk.getIntegrationService("GoogleMapsAPIs");
    let headers = null;
    let body = {
      latitude: lat,
      longitude: lng
    };

    showLoadingScreen();
    mapService.invokeOperation("getNearestSchool", headers, body, this.getNearestSchoolsSuccess, this.getNearestSchoolsError);
  },

  getNearestSchoolsSuccess: function(response) {
    if (response.httpStatusCode === 200) {
      let locationData = [];

      response.details.forEach(function(school, index) {
        locationData.push({
          id: index,
          lat: school.lat, 
          lon :  school.lng,
          image : "pinb.png",
          desc: "Rating: " + school.description,
          name: school.locationName.trim()
        });
      });

      this.view.mapWidget.locationData = locationData;
      this.view.mapWidget.navigateTo(this.view.mapWidget.locationData[0].id, false);
    } else {
      let data = {
        text: "Something went wrong!",
        type: "error",
        initialTop: "-40dp",
        finalTop: "70dp"
      };

      this.view.flxContent.isVisible = false;
      this.view.flxEmpty.isVisible = true;

      this.view.animatedNotification.onShow(data);
    }
    dismissLoadingScreen();
  },

  getNearestSchoolsError: function(error) {
    if (error.opstatus === 104) {
      dismissLoadingScreen();
      logout(this, "expired");
      return;
    }

    let data = {
      text: "Something went wrong!",
      type: "error",
      initialTop: "-40dp",
      finalTop: "70dp"
    };

    this.view.flxContent.isVisible = false;
    this.view.flxEmpty.isVisible = true;

    this.view.animatedNotification.onShow(data);
    dismissLoadingScreen();
  },
});