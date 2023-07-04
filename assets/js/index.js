$(document).ready(function () {
  var forcedUserLogoutTimout;
  initLocalStorage();
  initializeDate();
});

function checkIfLoggedIn(){
  let loggedInUserID = localStorage.getItem("loggedInUserID");
  if(loggedInUserID ==="null"){
    return false
  }else {
    return true
  }
}

function initializeDate(){
  let isUserLoggedIn = checkIfLoggedIn();

  const {
        host, hostname, href, origin, pathname, port, protocol, search
      } = window.location

  let pathnameArr = pathname.split("/");
  let pathName = pathnameArr[pathnameArr.length - 1];
  // console.log(pathName);

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
      initUsers();
      initEvents();
      initElements();
      forcedUserLogoutTimout = setTimeout(logout, 1800000);
    }else {
      window.location.replace("./loginRegister.html");
    }
  } else {
    localStorage.setItem("loggedInUserID","null");
  }
}

