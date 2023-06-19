$(document).ready(function () {
  var forcedUserLogoutTimout;
  console.log("Initializing Events");
  initLocalStorage();
  initializeDate();
});

function checkIfLoggedIn(){
  let loggedInUserID = localStorage.getItem("loggedInUserID");
  if(loggedInUserID ==="null"){
    console.log("USer id is null....................................");
    return false
  }else {
    return true
  }
}

function initializeDate(){
  let isUserLoggedIn = checkIfLoggedIn();
  console.log("User is logged in or not..", isUserLoggedIn);

  const {
        host, hostname, href, origin, pathname, port, protocol, search
      } = window.location

  let pathnameArr = pathname.split("/");
  let pathName = pathnameArr[pathnameArr.length - 1];
  console.log(pathName);

  if(pathName != "loginRegister.html"){
    if(isUserLoggedIn){
      let loggedInUserID = localStorage.getItem("loggedInUserID");
     let userObj = getRegisteredUsers();
     let currrentUser = userObj[loggedInUserID];
   
     adminRestrictedPathnames = [
        "admin.html", "addNewTest.html","addQuestions.html", "userManagement.html"
     ]

     if(currrentUser.isAdmin != true && adminRestrictedPathnames.includes(pathName)){
            window.location.replace("./index.html");
      }

      initEvents();
      initElements();
      forcedUserLogoutTimout = setTimeout(logout, 1800000);
    }else {
      window.location.replace("./loginRegister.html");
    }
  } else {
    console.log("Location is  login or register....",localStorage.getItem("loggedInUserID"));
    localStorage.setItem("loggedInUserID","null");
  }
}

