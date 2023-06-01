$(document).ready(function () {
  var forcedUserLogoutTimout;
  // Handler for .ready() called.
  console.log("Initializing Events");
  initLocalStorage();
  checkIfLoggedIn();
});


function checkIfLoggedIn(){
  const {
    host, hostname, href, origin, pathname, port, protocol, search
  } = window.location

  // if(pathname != "/login.html" && pathname != "/register.html"){
  if(pathname != "/loginRegister.html"){
    console.log("Location is not login or register....");
    if(!("loggedInUserID" in localStorage) || (localStorage.getItem("loggedInUserID") === "null")){
      console.log("Item doesn't exist in localstorage");
      window.location.replace("./loginRegister.html");
   }else{
     console.log("Item exists in localstoarge");
     forcedUserLogoutTimout = setTimeout(logout, 1800000);
     let loggedInUserID = localStorage.getItem("loggedInUserID");
     let userObj = getRegisteredUsers();
     let currrentUser = userObj[loggedInUserID];
   
     adminRestrictedPathnames = [
        "/admin.html", "/addNewTest.html","/addQuestions.html", "/userManagement.html"
     ]
     if(currrentUser.isAdmin != true && adminRestrictedPathnames.includes(pathname)){
      window.location.replace("./index.html");
     }

     initEvents();
     initElements();
   }
  }else {
    console.log("Location is login or Register");
  }
}

