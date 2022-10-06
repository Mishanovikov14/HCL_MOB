define({
  students: [
    {
      name: "Jack Sparrow",
      id: 1,
      age: 14,
      group: "Math",
      gender: "Male",
      class: "Class 9"
    },
    {
      name: "Mariya Novikova",
      id: 2,
      age: 15,
      group: "Hystory",
      gender: "Female",
      class: "Class 10"
    },
    {
      name: "Jack Richards",
      id: 3,
      age: 16,
      group: "Math",
      gender: "Male",
      class: "11",
    },
    {
      name: "Morgan Freeman",
      id: 4,
      age: 17,
      group: "History",
      gender: "Male",
      class: "Class 11"
    },
    {
      name: "Daria Novikova",
      id: 5,
      age: 13,
      group: "Hystory",
      gender: "Female",
      class: "Class 9"
    },
    {
      name: "Jack Richards",
      id: 6,
      age: 16,
      group: "Math",
      gender: "Male",
      class: "10",
    },
    {
      name: "Jack Sparrow",
      id: 7,
      age: 14,
      group: "Math",
      gender: "Male",
      class: "Class 9"
    },
    {
      name: "Mariya Novikova",
      id: 8,
      age: 15,
      group: "Hystory",
      gender: "Female",
      class: "Class 10"
    },
    {
      name: "Jack Richards",
      id: 9,
      age: 16,
      group: "Math",
      gender: "Male",
      class: "11",
    },
    {
      name: "Morgan Freeman",
      id: 10,
      age: 17,
      group: "History",
      gender: "Male",
      class: "Class 11"
    },
    {
      name: "Daria Novikova",
      id: 11,
      age: 13,
      group: "Hystory",
      gender: "Female",
      class: "Class 9"
    },
    {
      name: "Jack Richards",
      id: 12,
      age: 16,
      group: "Math",
      gender: "Male",
      class: "Class 10",
    },
    {
      name: "Jack London",
      id: 120,
      age: 16,
      group: "Math",
      gender: "Male",
      class: "Class 9",
    },
    {
      name: "Anton Richards",
      id: 13,
      age: 11,
      group: "Math",
      gender: "Male",
      class: "Class 9",
    },
    {
      name: "Arina London",
      id: 121,
      age: 16,
      group: "Math",
      gender: "Female",
      class: "Class 9",
    },
    {
      name: "Arina Richards",
      id: 14,
      age: 11,
      group: "Math",
      gender: "Female",
      class: "Class 9",
    },
  ],
  filteredArr: [],
  userData: voltmx.store.getItem("userInfo"),

  onViewCreated: function() {
    this.view.preShow = this.preShow;
  },

  onNavigate: function() {
    debugger;
    this.mapStudents(this.students);
    this.view.commonHeader.lblTitle.text = "Hello, " + this.userData.firstName + "!";

    this.view.ListBoxDropdown.masterData = [
      ["key1", "Class 9"],
      ["key2", "Class 10"],
      ["key3", "Class 11"]
    ];
    this.view.ListBoxDropdown.selectedKey = "key1";

    this.view.ListBoxDropdownFilter.masterData = [
      ["name", "By name"],
      ["age", "By age"],
      ["group", "By group"],
      ["id", "By ID"],
    ];
    this.view.ListBoxDropdownFilter.selectedKey = "name";

    this.onSelection();
    this.onSorting();
  },

  preShow: function() {
    this.view.commonHeader.flxGoBack.isVisible = false;
    this.initAction();
    this.view.commonFooter.currentForm = this.getCurrentForm();
    this.view.search.skin = "slFbox";
  },

  initAction: function() {
    this.view.commonHeader.flxLogout.onClick = () => {
      Navigation.navigateTo("frmLogin");
    };

    this.view.ListBoxDropdown.onSelection = () => {
      this.onSelection();
    };

    this.view.ListBoxDropdownFilter.onSelection = () => {
      this.onSorting();
    };
  },

  onSorting: function() {
    let slectedFilter = this.view.ListBoxDropdownFilter.selectedKeyValue[0];
    this.filteredArr.sort(function(a, b) {
      if (typeof a[slectedFilter] === 'number') {
        return a[slectedFilter] - b[slectedFilter];
      } else {
        if (a[slectedFilter] > b[slectedFilter]) {
          return 1;
        }

        if (a[slectedFilter] < b[slectedFilter]) {
          return -1;
        }
        return 0;
      }
    });

    this.mapStudents(this.filteredArr);
  },

  onSelection: function() {
    let slectedClass = this.view.ListBoxDropdown.selectedKeyValue[1];
    this.filteredArr = this.students.filter(function(student) {
      return student.class === slectedClass;
    });

    this.onSorting();
    this.mapStudents(this.filteredArr);
  },

  mapStudents: function(students) {
    let mapedStudentsData = [];
    let mapedFemaleStudentsData = [];
    let mapedMaleStudentsData = [];

    let maleStudentArray = students.filter(function(student) {
      return student.gender === "Male";
    });

    let femaleStudentArray = students.filter(function(student) {
      return student.gender === "Female";
    });

    maleStudentArray.forEach(function(student, index) {
      mapedMaleStudentsData.push({
        "lbl1": {"text": student.name},
        "lbl2": {"text": "ID: " + student.id},
        "lbl3": {"text": "Age"},
        "lbl4": {"text": Math.round(student.age)},
        "lbl5": {"text": "Group"},
        "lbl6": {"text": student.group},
        "imgIcon" : {"src" : "man.png"},
        "template": student.gender === "Male" ? "flxRowMale" : "flxRowFemale"
      });
    });

    femaleStudentArray.forEach(function(student, index) {
      mapedFemaleStudentsData.push({
        "lbl1": {"text": student.name},
        "lbl2": {"text": "ID: " + student.id},
        "lbl3": {"text": "Age"},
        "lbl4": {"text": Math.round(student.age)},
        "lbl5": {"text": "Group"},
        "lbl6": {"text": student.group},
        "imgIcon" : {"src" : "woman.png"},
        "template": student.gender === "Male" ? "flxRowMale" : "flxRowFemale"
      });
    });

    mapedStudentsData = [
      [{"template": "flxHeaderFemale", "lblGender": {"text": "Girls"}}, mapedFemaleStudentsData],
      [{"template": "flxHeaderMale", "lblGender": {"text": "Boys"}}, mapedMaleStudentsData]
    ];

    if (mapedFemaleStudentsData.length < 1) {
      mapedStudentsData = [
        [{"template": "flxHeaderMale", "lblGender": {"text": "Boys"}}, mapedMaleStudentsData]
      ];
    }

    if (mapedMaleStudentsData.length < 1) {
      mapedStudentsData = [
        [{"template": "flxHeaderFemale", "lblGender": {"text": "Girls"}}, mapedFemaleStudentsData]
      ];
    }

    this.view.segStudents.setData(mapedStudentsData);
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