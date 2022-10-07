define({ 

  updateStudentData: function(group, id) {
    var objSvc = kony.sdk.getDefaultInstance().getObjectService("StudentsDB", {
      "access": "online"
    });

    var dataObject = new kony.sdk.dto.DataObject("students");
    dataObject.addField("group", group);
    dataObject.addField("id", id);

    var options = {
      "dataObject": dataObject
    };

    showLoadingScreen();
    objSvc.fetch(options, this.getStudentDataSuccess, this.getStudentDataError);
  },

  updateStudentDataSuccess: function(response) {
    dismissLoadingScreen();
    if (response.httpresponse.responsecode === 200) {

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