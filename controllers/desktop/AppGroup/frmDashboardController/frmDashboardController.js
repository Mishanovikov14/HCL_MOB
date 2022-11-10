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

  onViewCreated: function() {
    this.view.postShow = this.postShow;
  },

  onNavigate: function() {
    this.peopleData = [];
    this.rowNumber = 0;
    this.page = 1;
    this.view.btnMore.isVisible = true;
    this.userData = voltmx.store.getItem("userInfo");
    this.userType = voltmx.store.getItem("userType");
    this.getPeople();
    this.view.flxMain.isVisible = false;
    this.view.dropdown.initDropdown(["Filter by name" , "Filter by age", "Filter by position"]);
    this.view.onBreakpointChange = () => {
      this.view.btnMore.isVisible =  this.isBtnVisible;
    };
    
    this.view.dropdown.onRowClick = (eguiWidget, sectionNumber, rowNumber) => {
      this.rowNumber = rowNumber;
      this.peopleData = this.view.dropdown.onSelection(rowNumber, this.peopleData);
      this.mapSegData(this.peopleData);
    };
    this.view.search.flxSearchIcon.onTouchStart = () => {
      let searchText = this.view.search.inputSearch.text.trim();

      if (searchText.length > 0) {
        this.searchData = this.peopleData.filter((people) => {
          return people.name.toLowerCase().includes(searchText.toLowerCase());
        });

        this.view.btnMore.isVisible =  false;
      } else {
        this.searchData = this.peopleData;
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

  postShow: function() {
    this.view.commonHeader.currentForm = this.getCurrentForm();
    this.view.lblTitle.text = "Hello, " + this.userData.firstName + "!";
    this.view.btnMore.onClick = () => {
      this.getPeople();
    };
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
      
      this.isBtnVisible = response.students.length < 3 ? false : true;
      
      this.view.btnMore.isVisible =  this.isBtnVisible;
      
      this.peopleData = this.view.dropdown.onSelection(this.rowNumber, this.peopleData);
      this.mapSegData(this.peopleData);
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
  },
  
  
  //Example from Hristo
  getUsersBySelectAndPagination: function(page, recordsPerPage, successCallback) {
      var skip = (page - 1) * recordsPerPage;
      var top = page * recordsPerPage;
      var integrationService = voltmx.sdk.getDefaultInstance().getIntegrationService("ObjectStorageOrchestration");
      integrationService.invokeOperation(
        "getFilteredUserData", 
        {}, 
        {
          "$select": "user_id,first_name,last_name",
          "$filter": "status eq active and group eq members",
          "$top": top,
          "$skip": skip
        }, 
        function(response) {
          if (commonFunctionsHelper.isFunction(successCallback)) {
             successCallback(response.Users);
          }
        }, 
        function(error) {
          componentsManager.showMessage(
            "error", 
            `Something went wrong.`, 
            100,
            true
          );
        }
      );
    },
});