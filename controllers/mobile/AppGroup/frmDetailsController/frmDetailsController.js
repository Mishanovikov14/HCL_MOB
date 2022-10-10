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
    this.view.imgProfile.src = params.gender === "Male" ? "man.png" : "woman.png";
    this.view.radioButtonStudentGroup.selectedKey = params.group === "Math" ? "key2" : "key1";
    this.view.radioButtonStudentGroup.onSelection = () => this.updateStudentData(params.group, params.id);
  },

  preShow: function() {
    this.view.commonFooter.currentForm = this.getCurrentForm();
    this.view.commonHeader.lblTitle.text = "Student profile";
    this.view.commonHeader.flxGoBack.onTouchStart = () => Navigation.navigateTo("frmDashboard");
  },

  updateStudentData: function(group, id) {
    var objSvc = voltmx.sdk.getDefaultInstance().getObjectService("StudentsDB", {
      "access": "online"
    });

    var dataObject = new voltmx.sdk.dto.DataObject("students");
    dataObject.addField("group", group);
    dataObject.addField("id", id);

    var options = {
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
      //TODO
      alert("Something wwent wrong");
    }
  },

  updateStudentDataError: function(error) {
    dismissLoadingScreen();
    //TODO
  },


});