function initEvents() {
  //Open page to add new Questionarie
  $("button#add-new-questionarie-btn").click(function () {
    window.location.href = "./addNewTest.html";
  });

  //Delete questionarie
  $(document).on("click", "button#delete-questionarie-btn", function () {
    let questionaryKey = $(this).parent().attr("key");
    let targetId = $("div#questionarie-grid-item-" + questionaryKey);
   
    targetId.remove();

    let questionaries = getQuestionaries();
    if(questionaries[questionaryKey].isQuestionariePublished){
        createDeleteQuestioanryNotification(questionaryKey);
    }
    delete questionaries[questionaryKey];
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
  });

  //Delete Question from a Questionarie
  $(document).on("click", "a#delete-question-link", function () {
    let users = getRegisteredUsers();
    let userId = localStorage.getItem("loggedInUserID");
    let userObj = users[userId];
    let questionKey = $(this).attr("key");
    let targetId = $("div#question-" + questionKey);
    targetId.remove();

    //get questionarie from URL
    let questionarieId = getQuestionarieID();
    let questionaries = getQuestionaries();
    
   
    if(questionaries[questionarieId].isQuestionariePublished){
      let isModified = checkQuestionaryUpdated(questionaries[questionarieId].modifiedDate);
      if(isModified){
        Object.assign(questionaries[questionarieId], {isModified:true,isNotificationSent: false});
      delete questionaries[questionarieId]["questions"][questionKey];
      localStorage.setItem("questionaries", JSON.stringify(questionaries));
      changeQuestionaryStatus(questionarieId);
    }
    }
  });
  
  $("input#student-questionarie-finish-btn").one('click',function (event) {
    event.preventDefault();
  
    let questionarieId = getQuestionarieID();
    let questionaries = getQuestionaries();
    let users = getRegisteredUsers();
     //get logged in user ID
    let loggedInUserId = localStorage.getItem("loggedInUserID");
    let userObject = users[loggedInUserId];

    let scoreRecordObject;
    let scoreObjectId = questionarieId+"_"+loggedInUserId;
   
    if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
      if(typeof userObject["scores"][scoreObjectId] === 'undefined' || userObject["scores"][scoreObjectId]=== "null"){
        Object.assign(userObject["scores"],{[scoreObjectId]: {"scoreAttempts":{}}});
        localStorage.setItem("users", JSON.stringify(users));
        
      }
    
            let questionarieObject = questionaries[questionarieId];
            let scoreAttemptID = createNewScoreAttemptID(questionarieId,loggedInUserId);
            let scoreRecordObject = createNewScoreAttemptObject(scoreAttemptID);
            let totalQuestions = Object.keys(questionarieObject["questions"]).length;
            let scoreRecordObj = getScoreRecordObject(questionarieObject,scoreAttemptID,scoreRecordObject,totalQuestions);
            Object.assign(userObject["scores"][scoreObjectId]["scoreAttempts"],{[scoreAttemptID]: scoreRecordObj});
          
            localStorage.setItem("users", JSON.stringify(users));
            window.location.href = "./index.html";
    }
  });

 

  $("button#pop-up-submit-btn").click(function (event) {
    let testName = $("input#new-questionarie-name").val();
   // $("input#add-heading-questionarie-text").val(testName);
   
    let popupData = fetchPopUpData(event);
    if (popupData != null) {
      let questionaries = JSON.parse(localStorage.getItem("questionaries"));
      let qlength = Object.keys(questionaries).length;
      if (qlength > 0) {
        qlength = Object.keys(questionaries)[qlength - 1].substring(13);
      }
      let newQuestionarieKey = "qs-20230405-0" + (parseInt(qlength) + 1);
      let newQuestionariesObj = createNewQuestionarie(newQuestionarieKey,testName,popupData);
      Object.assign(questionaries, newQuestionariesObj);
      localStorage.setItem("questionaries", JSON.stringify(questionaries));
      window.location.href =
        "./addQuestions.html?questionarie-id=" + newQuestionarieKey;
    }
  });

  $("button#pop-up-submit-save-btn").click(function (event) {
    let popupData = fetchPopUpData(event);
    if (popupData!=null){
      appendNewQuestionToList(popupData);
      $("#basicQuestionModal").modal("hide");
   } 
  //  else {
  //      console.log("object is not defined");
  //  }
  });

  $("input#student-questionarie-check-btn").one('click',function(event){
  // $("input#student-questionarie-check-btn").click(function (event) {
    event.preventDefault();
    checkQuestionarie();
    toastr.info("Checking answers...","",{positionClass: "toast-bottom-right",
    preventDuplicates: true,extendedTimeOut: 500,timeOut: 300});
    $("input#student-questionarie-check-btn").prop("disabled", true);
    //Enable Finish Button
    $("input#student-questionarie-finish-btn").prop("disabled", false);
    toastr.success("Checked succesfully!","",{positionClass: "toast-bottom-right",
    preventDuplicates: true,extendedTimeOut: 1000,timeOut: 3000});
  });

  $("input#new-questionarie-name").keyup(function () {
    let testName = $(this).val();
    let isTestNameAlreadyTaken;
    isTestNameAlreadyTaken = checkQuestionaryName(testName);

    if ($(this).val().trim() != "" && !isTestNameAlreadyTaken) {
      $("#add-new-questionarie-test-btn").prop("disabled", false);
    } else {
      $("#add-new-questionarie-test-btn").prop("disabled", true);
    }
  });

  $("input#add-heading-questionarie-text").keyup(function () {
    let testName = $(this).val();
    let isTestNameAlreadyTaken;
    isTestNameAlreadyTaken = checkQuestionaryName(testName);
    if ($(this).val().trim() != "" && !isTestNameAlreadyTaken) {
      $("button#questionarie-rename-btn").prop("disabled", false);
    } else {
      $("button#questionarie-rename-btn").prop("disabled", true);
    }
  });



$("a#navbar-notification-btn").on("click", function(event){
  window.location.href = "./notification.html";
});

$("a#navbar-logout-btn").on("click", function(event){
  logout();
});

$("button#questionarie-rename-btn").on("click", function(event){
  let questionarieId = getQuestionarieID();
  let questionaries = getQuestionaries();
  let questioanrieObj = questionaries[questionarieId];
  let oldtestName = questioanrieObj["name"];
  let newTestName = $("input#add-heading-questionarie-text").val();
   Object.assign(questionaries[questionarieId],{name: newTestName});
   localStorage.setItem("questionaries", JSON.stringify(questionaries));
});


$("a#student-dashboard-link").on("click", function(event){
  let loggedInUserID = localStorage.getItem("loggedInUserID");
  let users = getRegisteredUsers();
  let userObj = users[loggedInUserID];
  if(userObj.isAdmin){
     window.location.href = "./admin.html";
  }
  else{
    window.location.href = "./index.html";
  }
});

//window resize event
$( window ).on( "resize", function() {
  let width = $( window ).width();
  let height = $( window ).height();
  if(width<768){
   localStorage.setItem("screenWidth", width);
   $("div#user-data-table").hide();
   $("div#small-screen-user-list").show();
  } else {
    $("div#user-data-table").show();
    $("div#small-screen-user-list").hide();
  }
} );

}

function onChange(obj) {
  var id = $(obj).attr("id");
  switch (id) {
    case "navbar-student-btn":
      window.location.href = "./index.html";
      break;

    case "navbar-admin-btn":
      window.location.href = "./admin.html";
      break;

    case "navbar-user-management-btn":
      window.location.href = "./userManagement.html";
      break;
  }
}

$("form#registration-form").on("submit", function(e){
  //console.log("Registration form submit event is executing....");
  let $inputs = $("#registration-form :input");
    let registrationData = {};
    $inputs.each(function () {
        registrationData[this.name] = $(this).val();
    });
    const isObjectEmpty =  (
        registrationData &&
        Object.keys(registrationData).length === 0 &&
        registrationData.constructor === Object
      );
    const isDataempty = (registrationData["username"]!="" && registrationData["email"]!="" && registrationData["password"]!="");
    if (!isObjectEmpty && isDataempty){
      //check if email already exists then 
        registerNewUser(registrationData,e);
    }
});

$("form#login-form").on("submit", function(event) {
 // event.preventDefault();
  let $inputs = $("#login-form :input");
  
    let loginData = {};
    $inputs.each(function () {
      
      if(( $(this).val())!= ""){
        loginData[this.name] = $(this).val();
      }
    });
    const isObjectEmpty =  (
      loginData &&
      Object.keys(loginData).length === 0 &&
      loginData.constructor === Object
    );
 
  if (!isObjectEmpty && loginData.hasOwnProperty('email') && loginData.hasOwnProperty('password')){
    //check if email already exists then find login Id and save into the localstoarge
    $("h6#login-status").text("");
      findLoginId(loginData,event);
  }
});

 //Admin Publish Button
 $("input#publish-btn").one('click', function(event){
  event.preventDefault();
  let questionarieId = getQuestionarieID();
  let questionaries = getQuestionaries();
  let currentDate = getSessionDate();
  Object.assign(questionaries[questionarieId], {
    isQuestionariePublished: true, modifiedDate: {
      day: currentDate[0],
      month: currentDate[1],
      year: currentDate[2]
  }
  });
  localStorage.setItem("questionaries", JSON.stringify(questionaries));
  toastr.info("Publishing Questionary for Student...","",{positionClass: "toast-bottom-right",
  preventDuplicates: true,extendedTimeOut: 500,timeOut: 500});
  //once published push notification to user that new test is available
  createNewquestioanryNotification(questionarieId);
  $(`span#questionary-status-${questionarieId}`).text("Published");
  $(`span#questionary-status-${questionarieId}`).addClass("questionaryStatus");
  $("input#publish-btn").hide();
  $("input#add-new-question-btn").hide();
  toastr.success("Published succesfully.","",{positionClass: "toast-bottom-right",
  preventDuplicates: true,extendedTimeOut: 1000,timeOut: 3000});
});