function showLoadingScreen() {
  voltmx.application.showLoadingScreen(
    "",
    "",
    constants.LOADING_SCREEN_POSITION_FULL_SCREEN,
    true,
    true,
    null
  );
}

function dismissLoadingScreen() {
  voltmx.application.dismissLoadingScreen();
}

function logout(context, isSessionExpired) {
  let identityService = new voltmx.sdk.getDefaultInstance().getIdentityService("schoolLogin");
  let successCallback = (respons) => {
    dismissLoadingScreen();
    Navigation.navigateTo("frmLogin", isSessionExpired);
  };
  let errorCallback = (error) => {
    dismissLoadingScreen();
    let data = {
      text: "Something went wrong!",
      type: "error",
      initialTop: "-40dp",
      finalTop: "70dp"
    };

    context.view.animatedNotification.onShow(data);
  };
  
  showLoadingScreen();
  identityService.logout(successCallback, errorCallback);
}