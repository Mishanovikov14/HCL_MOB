define({
  userData: {},
  userType: "",
  peopleData: [],

  onViewCreated: function() {
    this.view.postShow = this.postShow;
  },

  onNavigate: function() {
    this.peopleData = [];
    this.userData = voltmx.store.getItem("userInfo");
    this.userType = voltmx.store.getItem("userType");
    this.getPeople();
    this.view.flxMain.isVisible = false;
  },

  postShow: function() {
    this.view.commonHeader.currentForm = this.getCurrentForm();
    this.view.lblTitle.text = "Hello, " + this.userData.firstName + "!";
  },
  
  getPeople: function() {
    let sdk = voltmx.sdk.getCurrentInstance();
    let mapService = sdk.getIntegrationService("objectServicesOrchestretion");
    let headers = null;
    let body = {};

    mapService.invokeOperation("getAllPeople", headers, body, this.getPeopleSuccess, this.getPeopleError);
    showLoadingScreen();
  },

  getPeopleSuccess: function(response) {
    if (response.httpStatusCode === 0) {
      response.teachers.forEach(teacher => {
        this.peopleData.push(teacher);
      });
      
       response.students.forEach(student => {
        this.peopleData.push(student);
      });
      
      this.mapSegData();
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

  getPeopleError: function(error) {
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

    this.view.animatedNotification.onShow(data);
    dismissLoadingScreen();
  },

  mapSegData: function() {
    let mapedPeopleData = [];

    this.peopleData.forEach(function(person, index) {
      mapedPeopleData.push({
        "lblName": {"text": person.name},
        "lblID": {"text": person.id.toString()},
        "lblAge": {"text": person.age.toString()},
        "lblMobileNumber": {"text": person.mobile_number || person.phone_number},
        "lblRole": {"text": person.role},
        "imgArrow": {"src": "arrow_next.png"},
        "imgIcon" : {"src" : person.gender.toLowerCase() === "male" ? "man.png" : "woman.png"},
        "template": "flxPeopleInfo"
      });
    });

    let data = [
      [
        {
          "template": "flxPeopleTitle",
          "lblName": {"text": "Full name"},
          "lblId": {"text": "ID"},
          "lblAge": {"text": "Age"},
          "lblMobileNumber": {"text": "Mobile number"},
          "lblRole": {"text": "Position"},
        },
        mapedPeopleData
      ]
    ];

    this.view.segPeople.setData(data);
    this.view.flxMain.isVisible = true;
  }
});