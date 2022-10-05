define({
  students: [
    {
      name: "Jack Sparrow",
      id: "1",
      age: "10",
      group: "Math"
    },
    {
      name: "Mariya Novikova",
      id: "2",
      age: "12",
      group: "Hystory"
    },
    {
      name: "Jack Sparrow",
      id: "1",
      age: "10",
      group: "Math"
    },
    {
      name: "Mariya Novikova",
      id: "2",
      age: "12",
      group: "Hystory"
    }, {
      name: "Jack Sparrow",
      id: "1",
      age: "10",
      group: "Math"
    },
    {
      name: "Mariya Novikova",
      id: "2",
      age: "12",
      group: "Hystory"
    }, {
      name: "Jack Sparrow",
      id: "1",
      age: "10",
      group: "Math"
    },
    {
      name: "Mariya Novikova",
      id: "2",
      age: "12",
      group: "Hystory"
    }, {
      name: "Jack Sparrow",
      id: "1",
      age: "10",
      group: "Math"
    },
    {
      name: "Mariya Novikova",
      id: "2",
      age: "12",
      group: "Hystory"
    },
     {
      name: "Jack Sparrow",
      id: "1",
      age: "10",
      group: "Math"
    },
    {
      name: "Mariya Novikova",
      id: "2",
      age: "12",
      group: "Hystory"
    },
     {
      name: "Jack Sparrow",
      id: "1",
      age: "10",
      group: "Math"
    },
    {
      name: "Mariya Novikova",
      id: "2",
      age: "12",
      group: "Hystory"
    },
     {
      name: "Jack Sparrow",
      id: "1",
      age: "10",
      group: "Math"
    },
    {
      name: "Mariya Novikova",
      id: "2",
      age: "12",
      group: "Hystory"
    },
  ],
  userData: voltmx.store.getItem("userInfo"),

  onViewCreated: function() {
    this.view.preShow = this.preShow;
  },

  onNavigate: function() {
    this.mapStudents(this.students);
    this.view.commonHeader.lblTitle.text = "Hello, " + this.userData.firstName + "!";
    this.view.ListBoxDropdown.masterData = [
      ["key1", "Class 9"],
      ["key2", "Class 10"],
      ["key3", "Class 11"]
    ];
    this.view.ListBoxDropdown.selectedKey = "key1";
  },

  preShow: function() {
    this.view.commonHeader.flxGoBack.isVisible = false;
    this.initAction();
  },

  initAction: function() {
    this.view.commonFooter.btnAboutUs.onClick = () => {
      alert("About Us");
    };

    this.view.commonHeader.flxLogout.onClick = () => {
      Navigation.navigateTo("frmLogin");
    };

    this.view.ListBoxDropdown.onSelection = () => {
      alert("The selected key value of the listbox is: " + this.view.ListBoxDropdown.selectedKeyValue);
    };
  },

  mapStudents: function(students) {
    if (students && students.length > 0) {
      //       showLoadingScreen();
      let mapedStudentsData = [];
      students.forEach(function(student, index) {
        mapedStudentsData.push({
          "lbl1": {"text": student.name},
          "lbl2": {"text": "ID: " + student.id},
          "lbl3": {"text": "Age"},
          "lbl4": {"text": student.age},
          "lbl5": {"text": "Group"},
          "lbl6": {"text": student.group},
        });
      });
      this.view.segStudents.setData(mapedStudentsData);
    } else {
      //TODO
    }
    //     dismissLoadingScreen();
  },

  //   showDetails: function(eguiWidget, sectionNumber, rowNumber, selectedState) {
  //     var selectedLoan = this.loansList[rowNumber];
  //     if(selectedLoan.loan_application_status === "Saved" || selectedLoan.loan_application_status === "S") {
  //       navigateToLoansApp(QNBConstants.formName.frmApplyForEloan,selectedLoan);
  //     } else {
  //       var dataForSegment = [
  //         {"lbl1": kony.i18n.getLocalizedString("applicationNo"),
  //          "lbl2": selectedLoan.loan_appl_ref_no},
  //         {"lbl1": kony.i18n.getLocalizedString("loanType"),
  //          "lbl2": selectedLoan.loan_application_type},
  //         {"lbl1": kony.i18n.getLocalizedString("submissionDate"),
  //          "lbl2": selectedLoan.loan_start_date},
  //         {"lbl1": kony.i18n.getLocalizedString("status"),
  //          "lbl2": selectedLoan.loan_application_status},
  //         {"lbl1": kony.i18n.getLocalizedString("statusDetails"),
  //          "lbl2": selectedLoan.facility_Purpose},
  //       ];
  //       var headerToDisplay = kony.i18n.getLocalizedString("loanApplicationStatus");
  //       this.view.cmpDetailsPopUp.setSegData(dataForSegment,headerToDisplay);
  //     }
  //   },
});