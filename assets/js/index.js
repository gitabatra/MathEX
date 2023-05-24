$(document).ready(function () {
  var forcedUserLogoutTimout;
  // Handler for .ready() called.
  console.log("Initializing Events");
  initLocalStorage();
  checkIfLoggedIn();
  // initEvents();
  // initElements();
});

// function checkIfLoggedIn(){
//   console.log("logn Id : ", localStorage.getItem("loggedInUserID"),"window location: ",window.location.href);
//   if(window.location.href != "/login.html" || window.location.href != "/register.html"){
//     if(localStorage.getItem("loggedInUserID") == null){
//       console.log("logn Id : ", localStorage.getItem("loggedInUserID"));
//       window.location.replace = "/login.html"
//     }
//   }
// }

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
  }
}

