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

  if(pathname != "/loginRegister.html"){
    if(isUserLoggedIn){
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
      forcedUserLogoutTimout = setTimeout(logout, 1800000);
    }else {
      window.location.replace("./loginRegister.html");
    }
  } else {
    console.log("Location is  login or register....",localStorage.getItem("loggedInUserID"));
    localStorage.setItem("loggedInUserID","null");
  }
}




// $(document).ready(function () {
//   var forcedUserLogoutTimout;
//   console.log("Initializing Events");
//   initLocalStorage();
//   checkIfLoggedIn();
// });

// function checkIfLoggedIn(){
//   const {
//     host, hostname, href, origin, pathname, port, protocol, search
//   } = window.location

//   if(pathname != "/loginRegister.html"){
//     console.log("Location is not login or register....",localStorage.getItem("loggedInUserID"));
//     if(!("loggedInUserID" in localStorage) || (localStorage.getItem("loggedInUserID") === "null")){
//       console.log("Item doesn't exist in localstorage");
//       window.location.replace("./loginRegister.html");
//    }else{
//      console.log("Item exists in localstoarge");
//      forcedUserLogoutTimout = setTimeout(logout, 1800000);
//      let loggedInUserID = localStorage.getItem("loggedInUserID");
//      let userObj = getRegisteredUsers();
//      let currrentUser = userObj[loggedInUserID];
   
//      adminRestrictedPathnames = [
//         "/admin.html", "/addNewTest.html","/addQuestions.html", "/userManagement.html"
//      ]
//      if(currrentUser.isAdmin != true && adminRestrictedPathnames.includes(pathname)){
//       window.location.replace("./index.html");
//      }

//      initEvents();
//      initElements();
//    }
//   }else {
//     console.log("Location is  login or register....",localStorage.getItem("loggedInUserID"));
//    localStorage.setItem("loggedInUserID","null");
//   }
// }

