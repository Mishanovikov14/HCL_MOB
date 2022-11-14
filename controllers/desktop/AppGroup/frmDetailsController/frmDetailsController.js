define({
  userData: {},

  onViewCreated: function() {
    this.view.postShow = this.postShow;
  },

  onNavigate: function(data) {
    this.userData = data;
    this.initUI(data);
    this.initAction(data);
  },

  initUI: function(data) {
    this.view.lblTitle.text = data.name + " personal info";
    this.view.imgPhoto.src = data.gender.toLowerCase() === "male" ? "https://xsgames.co/randomusers/avatar.php?g=male" : "https://xsgames.co/randomusers/avatar.php?g=female";

    this.view.lblTitle1.text = "ID:";
    this.view.lblInfo1.text = data.id.toString();

    this.view.lblTitle2.text = "Gender:";
    this.view.lblInfo2.text = data.gender;

    this.view.lblTitle3.text = "Position:";
    this.view.lblInfo3.text = data.role;

    this.view.lblTitle4.text = "Age:";
    this.view.lblInfo4.text = data.age.toString();

    this.view.lblTitle5.text = "Mobile number:";
    this.view.lblInfo5.text = data.mobile_number || data.phone_number;

    this.view.btnDelete.isVisible = data.userType === "Teacher" ? true : false;

    if (data.role === "Teacher") {
      this.view.lblTitle6.text = "Experience:";
      this.view.lblInfo6.text = data.experience;
    } else {
      this.view.lblTitle6.text = "Class:";
      this.view.lblInfo6.text = data.class;
    }
  },

  initAction: function(data) {
    this.view.onDeviceBack = () => Navigation.navigateTo("frmDashboard");
    this.view.btnDelete.onClick = () => this.deletePerson(data);
  },

  postShow: function() {
    this.view.commonHeader.currentForm = this.getCurrentForm();
  },

  deletePerson: function(data) {
    let objServiceName = data.role === "Student" ? "StudentsDB" : "teacherDB";
    let dataObjectName = data.role === "Student" ? "students" : "teachers";

    let objSvc = voltmx.sdk.getDefaultInstance().getObjectService(objServiceName, {
      "access": "online"
    });

    let dataObject = new voltmx.sdk.dto.DataObject(dataObjectName);

    dataObject.addField("id", data.id);

    let options = {
      "dataObject": dataObject
    };

    showLoadingScreen();
    objSvc.deleteRecord(options, this.deleteSuccess, this.deleteError);
  },

  deleteSuccess: function(response) {
    dismissLoadingScreen();

    if (response.httpresponse.responsecode === 200) {
      Navigation.navigateTo("frmDashboard");
    } else {
      let data = {
        text: "Something went wrong!",
        type: "error",
        initialTop: "-40dp",
        finalTop: "70dp"
      };

      this.view.animatedNotification.onShow(data);
    }
  },

  deleteError: function(error) {
    dismissLoadingScreen();

    if (error.opstatus === 104) {
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
  }
});