define({ 
  onViewCreated: function() {
    this.view.preShow = this.preShow;
  },

  onNavigate: function(params) {
    this.view.lblAge.text = params.age.toString();
    this.view.lblClass.text = params.class.toString();
    this.view.lblFullName.text = params.name;
    this.view.lblGroup.text = params.group;
    this.view.lblHobby.text = params.hobby;
    this.view.lblId.text = params.id.toString();
    this.view.lblPhoneNumber.text = params.phone_number; 
    this.view.flxChangeGroup.isVisible = params.userType === "Teacher" ? true : false;  
    this.view.flxCamera.isVisible = params.userType === "Teacher" ? true : false;      
    this.view.imgProfile.src = params.gender === "Male" ? "man.png" : "woman.png";
    this.view.radioButtonStudentGroup.selectedKey = params.group === "Math" ? "key2" : "key1";

    this.view.radioButtonStudentGroup.onSelection = () => {
      this.updateStudentData(params, this.view.radioButtonStudentGroup.selectedKeyValue[1]);
    };
    this.view.commonHeader.flxLogout.onClick = () => logout(this, "notExpired");
    this.view.flxCamera.onTouchStart = this.checkCameraPermissions;
    this.view.cameraWidget.onCapture = this.onCapture;
  },

  preShow: function() {
    this.view.commonFooter.currentForm = this.getCurrentForm();
    this.view.commonHeader.lblTitle.text = "Student profile";
    this.view.commonHeader.flxGoBack.onTouchStart = () => Navigation.navigateTo("frmDashboard");
    this.view.onDeviceBack = () => Navigation.navigateTo("frmDashboard");
  },

  updateStudentData: function(params, group) {
    let objSvc = voltmx.sdk.getDefaultInstance().getObjectService("StudentsDB", {
      "access": "online"
    });

    let dataObject = new voltmx.sdk.dto.DataObject("students");
    dataObject.addField("group", group);
    dataObject.addField("id", params.id);

    let options = {
      "dataObject": dataObject
    };

    showLoadingScreen();
    objSvc.update(options, this.updateStudentDataSuccess, this.updateStudentDataError);
  },

  updateStudentDataSuccess: function(response) {
    dismissLoadingScreen();
    if (response.httpresponse.responsecode === 200) {
      this.view.lblGroup.text = this.view.radioButtonStudentGroup.selectedKeyValue[1];
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

  updateStudentDataError: function(error) {
    if (error.opstatus === 104) {
      dismissLoadingScreen();
      logout(this, "expired");
      return;
    }

    dismissLoadingScreen();
    let data = {
      text: "Something went wrong!",
      type: "error",
      initialTop: "-40dp",
      finalTop: "70dp"
    };

    this.view.animatedNotification.onShow(data);
  },

  checkCameraPermissions: function() {
    let result = voltmx.application.checkPermission(voltmx.os.RESOURCE_CAMERA);
    
    if (result.status === voltmx.application.PERMISSION_GRANTED) {
      this.view.cameraWidget.openCamera();
    } else {
      voltmx.application.requestPermission(voltmx.os.RESOURCE_CAMERA, this.requestPermission.bind(this));
    }
  },

  requestPermission: function(response) {
    if (response.status === voltmx.application.PERMISSION_GRANTED) {
      this.view.cameraWidget.openCamera();
    } else {
      let data = {
        text: "Please turn on camera permission!",
        type: "error",
        initialTop: "-40dp",
        finalTop: "70dp"
      };

      this.view.animatedNotification.onShow(data);
    }
  },

  onCapture: function(camera, metadata) {
    let imgBase64 = this.view.cameraWidget.base64;

    this.view.cameraWidget.closeCamera();

    if (imgBase64 === null) {
      return;
    }

    let imgInRawBytes = voltmx.convertToRawBytes(imgBase64);
    let imgObj = voltmx.image.createImage(imgInRawBytes);
    this.view.imgProfile.src = imgObj;
  }
});