$(document).ready(function () {
  // Handler for .ready() called.
  console.log("Initializing Events");
  initLocalStorage();
  //checkIfLoggedIn();
  initEvents();
  initElements();

});

// function checkIfLoggedIn(){
//   if(window.location != "signin" && window.location != "register"){
//     if(localStorage.get("loggedInUserID") == null){
//       window.location = "/signin"
//     }
//   }
// }

