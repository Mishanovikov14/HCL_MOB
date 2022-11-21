define({
  isAllFilled: true,

  onViewCreated: function() {
    this.view.postShow = this.postShow;
  },

  onNavigate: function() {
    this.initUI();
    this.initAction();
  },

  initUI: function() {
    this.view.lblTitle.text = "Add student (all fields are required)";

    this.view.inputFullname.text = "";
    this.view.inputAge.text = "";
    this.view.inputClass.text = "";
    this.view.inputGender.text = "";
    this.view.inputGroup.text = "";
    this.view.inputHobby.text = "";
    this.view.inputPhoneNumber.text = "";

    for (let i = 1; i < 8; i++) {
      this.view["flxInput" + i].skin = "sknFlxWithBorderRounded";
    }
  },

  initAction: function(data) {
    this.view.onDeviceBack = () => Navigation.navigateTo("frmDashboard");
    this.view.btnAddStudent.onClick = () => this.addStudent();

    this.view.inputFullname.onTextChange = () => {
      this.view.flxInput1.skin = "sknFlxWithBorderRounded";
    };

    this.view.inputAge.onTextChange = () => {
      this.view.flxInput3.skin = "sknFlxWithBorderRounded";
    };

    this.view.inputClass.onTextChange = () => {
      this.view.flxInput2.skin = "sknFlxWithBorderRounded";
    };

    this.view.inputGender.onTextChange = () => {
      this.view.flxInput4.skin = "sknFlxWithBorderRounded";
    };

    this.view.inputGroup.onTextChange = () => {
      this.view.flxInput6.skin = "sknFlxWithBorderRounded";
    };

    this.view.inputHobby.onTextChange = () => {
      this.view.flxInput7.skin = "sknFlxWithBorderRounded";
    };

    this.view.inputPhoneNumber.onTextChange = () => {
      this.view.flxInput5.skin = "sknFlxWithBorderRounded";
    };
  },

  postShow: function() {
    this.view.commonHeader.currentForm = this.getCurrentForm();
  },

  addStudent: function() {
    let objServiceName = "StudentsDB";
    let dataObjectName = "students";
    this.isAllFilled = true;

    if (this.view.inputFullname.text === "") {
      this.view.flxInput1.skin = "sknFlxWithBorderRoundedError";
      this.isAllFilled = false;
    }

    if (this.view.inputClass.text === "") {
      this.view.flxInput2.skin = "sknFlxWithBorderRoundedError";
      this.isAllFilled = false;
    }

    if (this.view.inputAge.text === "") {
      this.view.flxInput3.skin = "sknFlxWithBorderRoundedError";
      this.isAllFilled = false;
    }

    if (this.view.inputGender.text === "") {
      this.view.flxInput4.skin = "sknFlxWithBorderRoundedError";
      this.isAllFilled = false;
    }

    if (this.view.inputPhoneNumber.text === "") {
      this.view.flxInput5.skin = "sknFlxWithBorderRoundedError";
      this.isAllFilled = false;
    }

    if (this.view.inputGroup.text === "") {
      this.view.flxInput6.skin = "sknFlxWithBorderRoundedError";
      this.isAllFilled = false;
    }

    if (this.view.inputHobby.text === "") {
      this.view.flxInput7.skin = "sknFlxWithBorderRoundedError";
      this.isAllFilled = false;
    }

    if (this.isAllFilled) {
      let objSvc = voltmx.sdk.getDefaultInstance().getObjectService(objServiceName, {
        "access": "online"
      });

      let dataObject = new voltmx.sdk.dto.DataObject(dataObjectName);

      dataObject.addField("name", this.view.inputFullname.text);
      dataObject.addField("class", this.view.inputClass.text);
      dataObject.addField("age", this.view.inputAge.text);
      dataObject.addField("gender", this.view.inputGender.text);
      dataObject.addField("phone_number", this.view.inputPhoneNumber.text);
      dataObject.addField("group", this.view.inputGroup.text);
      dataObject.addField("hobby", this.view.inputHobby.text);

      let options = {
        "dataObject": dataObject
      };

      showLoadingScreen();
      objSvc.create(options, this.createSuccess, this.createError);
    }
  },

  createSuccess: function(response) {
    dismissLoadingScreen();

    this.view.setContentOffset({x:"0%",y:"0%"}, true);

    if (response.httpresponse.responsecode === 200) {
      this.initUI();

      let data = {
        text: "Student was successfully added!",
        type: "success",
        initialTop: "-40dp",
        finalTop: "70dp"
      };

      this.view.animatedNotification.onShow(data);
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

  createError: function(error) {
    dismissLoadingScreen();
    
    this.view.setContentOffset({x:"0%",y:"0%"}, true);

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