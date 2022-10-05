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