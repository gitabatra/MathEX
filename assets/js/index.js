$(document).ready(function () {
  var forcedUserLogoutTimout;
  // Handler for .ready() called.
  console.log("Initializing Events");
  initLocalStorage();
  checkIfLoggedIn();
  // initEvents();
  // initElements();
});


function checkIfLoggedIn(){
  if(window.location.href != "http://localhost:5500/login.html" && window.location.href != "http://localhost:5500/register.html"){
    console.log("Location is not login or register....");
    if(!("loggedInUserID" in localStorage) || (localStorage.getItem("loggedInUserID") === "null")){
      console.log("Item doesn't exist in localstorage");
      //console.log("logn Id : ", localStorage.getItem("loggedInUserID"));
      window.location.replace("http://localhost:5500/login.html");
   }else{
     console.log("Item exists in localstoarge");
     forcedUserLogoutTimout = setTimeout(logout, 1800000);
     initEvents();
     initElements();
   }
  }else {
    console.log("Location is login or Register");
  }
}

