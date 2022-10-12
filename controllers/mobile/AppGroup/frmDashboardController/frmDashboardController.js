define({
  students: [],
  filteredArr: [],
  currentClass: "",
  userData: {},
  usderType: "",
  maleStudentArray: [],
  femaleStudentArray: [],

  onViewCreated: function() {
    this.view.preShow = this.preShow;
  },

  onNavigate: function() {
    debugger;
    this.view.flxContent.isVisible = false;
    this.view.flxEmpty.isVisible = false;
    this.userData = voltmx.store.getItem("userInfo");
    this.usderType = voltmx.store.getItem("userType");

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
  },

  preShow: function() {
    this.view.commonHeader.flxGoBack.isVisible = false;
    this.view.commonHeader.lblTitle.text = "Hello, " + this.userData.firstName + "!";
    this.view.commonFooter.currentForm = this.getCurrentForm();
    this.view.search.skin = "slFbox";
    this.view.search.inputSearch.text = "";

    this.initAction();
    this.currentClass = this.view.ListBoxDropdown.selectedKeyValue[1].replace("Class ", "");
    this.getStudentData(this.currentClass);
  },

  getStudentData: function(filter) {
    let objSvc = voltmx.sdk.getDefaultInstance().getObjectService("StudentsDB", {
      "access": "online"
    });

    let dataObject = new voltmx.sdk.dto.DataObject("students");
    let odataUrl = "$filter=class eq " + filter;
    dataObject.odataUrl = odataUrl;

    let options = {
      "dataObject": dataObject
    };

    showLoadingScreen();
    objSvc.fetch(options, this.getStudentDataSuccess, this.getStudentDataError);
  },

  getStudentDataSuccess: function(response) {
    if (response.httpresponse.responsecode === 200) {
      this.students = response.records;
      this.filteredArr = this.students;

      this.onSorting();
      this.view.flxContent.isVisible = true;
      this.view.flxEmpty.isVisible = false;
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

  getStudentDataError: function(error) {
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

  initAction: function() {
    this.view.commonHeader.flxLogout.onClick = () => {
      //TODO
      Navigation.navigateTo("frmLogin");
    };

    this.view.ListBoxDropdown.onSelection = () => {
      this.currentClass = this.view.ListBoxDropdown.selectedKeyValue[1].replace("Class ", "");
      this.getStudentData(this.currentClass);
      this.view.search.inputSearch.text = "";
    };

    this.view.ListBoxDropdownFilter.onSelection = () => {
      this.onSorting();
    };

    this.view.search.flxSearchIcon.onTouchStart = () => {
      let searchText = this.view.search.inputSearch.text.trim();

      if (searchText.length > 0) {
        this.filteredArr = this.students.filter((student) => {
          return student.name.toLowerCase().includes(searchText.toLowerCase());
        });
      } else {
        this.filteredArr = this.students;
      }

      this.onSorting();
      this.mapStudents(this.filteredArr);
    };

    this.view.search.flxClearBtn.onTouchStart = () => {
      this.view.search.inputSearch.text = "";

      if (this.filteredArr !== this.students) {
        this.currentClass = this.view.ListBoxDropdown.selectedKeyValue[1].replace("Class ", "");
        this.getStudentData(this.currentClass);
      }
    };

    this.view.segStudents.onRowClick = (eguiWidget, sectionNumber, rowNumber, selectedState) => {
      if (sectionNumber === 0) {
        let data = this.femaleStudentArray[rowNumber];
        data.userType = this.usderType;
        Navigation.navigateTo("frmDetails", data);
      } else {
        let data = this.maleStudentArray[rowNumber];
        data.userType = this.usderType;
        Navigation.navigateTo("frmDetails", data);
      }
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

  mapStudents: function(students) {
    let mapedStudentsData = [];
    let mapedFemaleStudentsData = [];
    let mapedMaleStudentsData = [];

    this.maleStudentArray = students.filter(function(student) {
      return student.gender === "Male";
    });

    this.femaleStudentArray = students.filter(function(student) {
      return student.gender === "Female";
    });

    this.maleStudentArray.forEach(function(student, index) {
      mapedMaleStudentsData.push({
        "lbl1": {"text": student.name},
        "lbl2": {"text": "ID: " + student.id},
        "lbl3": {"text": "Age"},
        "lbl4": {"text": student.age.toString()},
        "lbl5": {"text": "Group"},
        "lbl6": {"text": student.group},
        "imgIcon" : {"src" : "man.png"},
        "template": student.gender === "Male" ? "flxRowMale" : "flxRowFemale"
      });
    });

    this.femaleStudentArray.forEach(function(student, index) {
      mapedFemaleStudentsData.push({
        "lbl1": {"text": student.name},
        "lbl2": {"text": "ID: " + student.id},
        "lbl3": {"text": "Age"},
        "lbl4": {"text": student.age.toString()},
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

    if (mapedMaleStudentsData.length < 1 && mapedFemaleStudentsData.length < 1) {
      this.view.flxContent.isVisible = false;
      this.view.flxEmpty.isVisible = true;
      return;
    }

    this.view.segStudents.setData(mapedStudentsData);
  }
});