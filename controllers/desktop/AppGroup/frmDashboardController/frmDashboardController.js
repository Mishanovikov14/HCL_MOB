define({
  userData: {},
  userType: "",
  peopleData: [],
  searchData: [],
  rowNumber: 0,
  recordsOnPage: 3,
  page: 1,
  isLastPage: false,
  isBtnVisible: true,
  isEmpty: false,

  onViewCreated: function() {
    this.view.postShow = this.postShow;
  },

  onNavigate: function() {
    this.peopleData = [];
    this.rowNumber = 0;
    this.page = 1;
    this.userData = voltmx.store.getItem("userInfo");
    this.userType = voltmx.store.getItem("userType");
    this.getPeople();
    this.view.flxMain.isVisible = false;
    this.view.dropdown.initDropdown(["Filter by name" , "Filter by age", "Filter by position"]);
    
    this.initAction();
  },

  postShow: function() {
    this.view.commonHeader.currentForm = this.getCurrentForm();
    this.view.lblTitle.text = "Hello, " + this.userData.firstName + "!";
  },
  
  initAction: function() {
    this.view.onBreakpointChange = () => {
      this.view.btnMore.isVisible =  this.isBtnVisible;
      this.view.flxEmpty.isVisible = this.isEmpty;
    };
    
    this.view.onDeviceBack = () => logout(this, "notExpired");
    
    this.view.btnMore.onClick = () => {
      this.getPeople();
    };
    
    this.view.dropdown.onRowClick = (eguiWidget, sectionNumber, rowNumber) => {
      this.rowNumber = rowNumber;
      this.peopleData = this.view.dropdown.onSelection(rowNumber, this.peopleData);
      this.mapSegData(this.peopleData);
    };
    
    this.view.segPeople.onRowClick = (eguiWidget, sectionNumber, rowNumber) => {
      let data = this.peopleData[rowNumber];
      data.userType = this.userType;
      Navigation.navigateTo("frmDetails", data);
    };
    
    this.view.search.flxSearchIcon.onTouchStart = () => {
      let searchText = this.view.search.inputSearch.text.trim();

      if (searchText.length > 0) {
        this.searchData = this.peopleData.filter((people) => {
          return people.name.toLowerCase().includes(searchText.toLowerCase());
        });

        this.isBtnVisible = false;
        this.view.btnMore.isVisible =  false;
      } else {
        this.searchData = this.peopleData;
        this.isBtnVisible = true;
        this.view.btnMore.isVisible =  this.isBtnVisible;
      }

      this.searchData = this.view.dropdown.onSelection(this.rowNumber, this.searchData);
      this.mapSegData(this.searchData);
    };

    this.view.search.flxClearBtn.onTouchStart = () => {
      let searchText = this.view.search.inputSearch.text.trim();
      this.view.search.inputSearch.text = "";

      if (searchText.length > 0 && this.searchData !== this.peopleData) {
        this.peopleData = [];
        this.page = 1;
        this.getPeople();
      }
    };
    
    let screen = document.getElementsByTagName("body");
    document.body.addEventListener('click', this.hideDropdown, false);
  },
  
  hideDropdown: function(e) {
    if (!e.target.attributes.kwp || !e.target.attributes.kwp.value.includes("frmDashboard_dropdown")) {
       this.view.dropdown.closeDropdown();
    }
  },
  
  getPeople: function() {
    let skip = (this.page - 1) * this.recordsOnPage;
    let top = this.recordsOnPage;
    let sdk = voltmx.sdk.getCurrentInstance();
    let mapService = sdk.getIntegrationService("objectServicesOrchestretion");
    let headers = null;
    let body = {
      "$top": top,
      "$skip": skip
    };

    mapService.invokeOperation("getAllPeople", headers, body, this.getPeopleSuccess, this.getPeopleError);
    showLoadingScreen();
  },

  getPeopleSuccess: function(response) {
    if (response.httpStatusCode === 0) {
      this.page++;
      
      response.teachers.forEach(teacher => {
        this.peopleData.push(teacher);
      });
      
       response.students.forEach(student => {
        this.peopleData.push(student);
      });
            
      this.peopleData = this.view.dropdown.onSelection(this.rowNumber, this.peopleData);
      this.mapSegData(this.peopleData);
      
      this.isBtnVisible = response.students.length < 3 ? false : true;
      this.view.btnMore.isVisible = this.isBtnVisible;
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
  },

  mapSegData: function(peopleData) {
    let mapedPeopleData = [];

    peopleData.forEach(function(person, index) {
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
    
    if (mapedPeopleData.length === 0) {
      this.isEmpty = true;
      this.view.flxEmpty.isVisible = this.isEmpty;
      this.view.flxMain.isVisible = false;
      this.isBtnVisible = false;
      this.view.flxBtnMore.isVisible = false;
      
      return;
    }

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
    this.isEmpty = false;
    this.view.flxEmpty.isVisible = this.isEmpty;
    this.view.flxMain.isVisible = true;
    this.isBtnVisible = true;
    this.view.flxBtnMore.isVisible = true;
  }
});