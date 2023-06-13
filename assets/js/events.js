function initEvents() {
  //Open page to add new Questionarie
  $("button#add-new-questionarie-btn").click(function () {
    console.log("Add new Questionarie button event is executing");
    window.location.href = "./addNewTest.html";
  });

  //Delete questionarie
  $(document).on("click", "button#delete-questionarie-btn", function () {
    console.log("Delete Questionarie button event is executing");
    let questionaryKey = $(this).parent().attr("key");
    let targetId = $("div#questionarie-grid-item-" + questionaryKey);
    // let users = getRegisteredUsers();
    // let userId = localStorage.getItem("loggedInUserID");
    // let userObj = users[userId];
    console.log(
      "Removing object with id : ",
      targetId,
      " and key ",
      questionaryKey
    );
    targetId.remove();
    console.log(targetId);

    let questionaries = getQuestionaries();
    //if questionary was published then push notification that questionary is deleted
    if(questionaries[questionaryKey].isQuestionariePublished){
        console.log("Date is modified, so creating notification..........");
        createDeleteQuestioanryNotification(questionaryKey);
    }
    delete questionaries[questionaryKey];
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
    // Object.assign(userObj,{hasNotifications: true});
    // localStorage.setItem("users", JSON.stringify(users));
  });

  //Delete Question from a Questionarie
  $(document).on("click", "a#delete-question-link", function () {
    console.log("Delete Question from List event is executing");
    let users = getRegisteredUsers();
    let userId = localStorage.getItem("loggedInUserID");
    let userObj = users[userId];
    let questionKey = $(this).attr("key");
    let targetId = $("div#question-" + questionKey);
    console.log(
      "Removing object with id : ",
      targetId,
      " and key ",
      questionKey
    );
    targetId.remove();

    //get questionarie from URL
    let questionarieId = getQuestionarieID();
    let questionaries = getQuestionaries();
    console.log(questionaries[questionarieId]["questions"][questionKey]);
    // delete questionaries[questionarieId]["questions"][questionKey];
    // localStorage.setItem("questionaries", JSON.stringify(questionaries));
    if(questionaries[questionarieId].isQuestionariePublished){
      let isModified = checkQuestionaryUpdated(questionaries[questionarieId].modifiedDate);
      console.log("After deleting a question, check questionary is modified or not: ",isModified);
      if(isModified){
        Object.assign(questionaries[questionarieId], {isModified:true,isNotificationSent: false});
      //   let currentDate = getSessionDate();
      //   Object.assign(questionaries[questionarieId], {
      //     isModified:true,
      //     modifiedDate: {
      //       day: currentDate[0],
      //       month: currentDate[1],
      //       year: currentDate[2]
      //   }
      // });
      delete questionaries[questionarieId]["questions"][questionKey];
      localStorage.setItem("questionaries", JSON.stringify(questionaries));
      changeQuestionaryStatus(questionaries[questionarieId]);
    }
    }
  });

  $("input#student-questionarie-finish-btn").click(function () {
    console.log("Finish Questionarie button event is executing");
    let questionarieId = getQuestionarieID();
    let questionaries = getQuestionaries();
    let users = getRegisteredUsers();
     //get logged in user ID
    let loggedInUserId = localStorage.getItem("loggedInUserID");
    let userObject = users[loggedInUserId];
    console.log("user object of logged in user: ",userObject,"user: ",loggedInUserId);
    console.log("user object of logged in user: ",userObject["scores"]);

    let scoreRecordObject;
    let scoreObjectId = questionarieId+"_"+loggedInUserId;
    console.log("Logged in user id: ",loggedInUserId);
   

    if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
      if(typeof userObject["scores"][scoreObjectId] === 'undefined' || userObject["scores"][scoreObjectId]=== "null"){
        Object.assign(userObject["scores"],{[scoreObjectId]: {"scoreAttempts":{}}});
        localStorage.setItem("users", JSON.stringify(users));
        console.log("Null object: ",userObject["scores"]);
      }
      console.log("User object: ",userObject["scores"][scoreObjectId]);
            let questionarieObject = questionaries[questionarieId];
            let scoreAttemptID = createNewScoreAttemptID(questionarieId,loggedInUserId);
            let scoreRecordObject = createNewScoreAttemptObject(scoreAttemptID);
            let totalQuestions = Object.keys(questionarieObject["questions"]).length;
            let scoreRecordObj = getScoreRecordObject(questionarieObject,scoreAttemptID,scoreRecordObject,totalQuestions);
            Object.assign(userObject["scores"][scoreObjectId]["scoreAttempts"],{[scoreAttemptID]: scoreRecordObj});
            console.log("User object after assigning scores: ",userObject);
            localStorage.setItem("users", JSON.stringify(users));
            window.location.href = "./index.html";
    }
  });

  //Admin Publish Button
  $("input#publish-btn").click(function (event) {
    console.log(event.delegateTarget);
    console.log("Publish event is executing");
    let questionarieId = getQuestionarieID();
    let questionaries = getQuestionaries();
    console.log(questionaries[questionarieId].isQuestionariePublished);
    let currentDate = getSessionDate();
    console.log("Date of publishing test: ",currentDate);
    Object.assign(questionaries[questionarieId], {
      isQuestionariePublished: true, modifiedDate: {
        day: currentDate[0],
        month: currentDate[1],
        year: currentDate[2]
    }
    });
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
    //once published push notification to user that new test is available
    createNewquestioanryNotification(questionarieId);
    $(`p#questionary-status-${questionarieId}`).text("Status: Published");
    $("input#publish-btn").hide();
    $("input#add-new-question-btn").hide();
  });

  $("button#pop-up-submit-btn").click(function (event) {
    console.log("PopUp Submit button on AddNewTest page is executing");
    let testName = $("input#new-questionarie-name").val();
   // $("input#add-heading-questionarie-text").val(testName);
   
    let popupData = fetchPopUpData(event);
    if (popupData != null) {
      console.log("PopupData : ", popupData);
      let questionaries = JSON.parse(localStorage.getItem("questionaries"));
      let qlength = Object.keys(questionaries).length;
      if (qlength > 0) {
        qlength = Object.keys(questionaries)[qlength - 1].substring(13);
      }
      let newQuestionarieKey = "qs-20230405-0" + (parseInt(qlength) + 1);
      newQuestionariesObj = createNewQuestionarie(newQuestionarieKey,testName,popupData);
      console.log("New Questionarie", newQuestionariesObj);
      Object.assign(questionaries, newQuestionariesObj);
      console.log(questionaries);
      localStorage.setItem("questionaries", JSON.stringify(questionaries));
      window.location.href =
        "./addQuestions.html?questionarie-id=" + newQuestionarieKey;
    }
  });

  $("button#pop-up-submit-save-btn").click(function (event) {
    console.log("Pop up Save Btn event is executing...");
    let popupData = fetchPopUpData(event);
    if (popupData!=null){
      appendNewQuestionToList(popupData);
      $("#basicQuestionModal").modal("hide");
   } else {
       console.log("object is not defined");
   }
  });

  $("input#student-questionarie-check-btn").click(function () {
    console.log("Checking the Questionaries event is executing");
    checkQuestionarie();
    //Enable Finish Button
    $("input#student-questionarie-finish-btn").prop("disabled", false);
  });

  $("input#new-questionarie-name").keyup(function () {
    console.log("Enabling plus button on input is executing");
    let testName = $(this).val();
    let isTestNameAlreadyTaken;
    isTestNameAlreadyTaken = checkQuestionaryName(testName);
    console.log("Tast name is taken or not: ", isTestNameAlreadyTaken);

    console.log("testname is : " + testName);
    if ($(this).val().trim() != "" && !isTestNameAlreadyTaken) {
      console.log("not null");
      $("#add-new-questionarie-test-btn").prop("disabled", false);
    } else {
      $("#add-new-questionarie-test-btn").prop("disabled", true);
    }
  });

  $("input#add-heading-questionarie-text").keyup(function () {
    console.log("Enabling Rename button on input is executing");
    let testName = $(this).val();
    let isTestNameAlreadyTaken;
    isTestNameAlreadyTaken = checkQuestionaryName(testName);
    console.log("Tast name is taken or not: ", isTestNameAlreadyTaken);

    console.log("testname is : " + testName);
    if ($(this).val().trim() != "" && !isTestNameAlreadyTaken) {
      console.log("not null");
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
  console.log("Changing Questionary name..............");
  let questionarieId = getQuestionarieID();
  let questionaries = getQuestionaries();
  let questioanrieObj = questionaries[questionarieId];
  console.log("questioanry Object: ",questioanrieObj);
  let oldtestName = questioanrieObj["name"];
  console.log("Old Test Name in local Storage.......: ",oldtestName);
  let newTestName = $("input#add-heading-questionarie-text").val();
  console.log("New Test Name.......: ",newTestName);
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
  console.log("Window resizing event is executing...........");
  console.log("Width os screen: ",$( window ).width());
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
  console.log("Registration form submit event is executing....");
  //e.preventDefault();
  let $inputs = $("#registration-form :input");
  console.log("Inputs: ",$inputs);
    let registrationData = {};
 
    $inputs.each(function () {
      console.log("Form data values: ", $(this).val(), typeof( $(this).val()));
        registrationData[this.name] = $(this).val();
    });
    const isObjectEmpty =  (
        registrationData &&
        Object.keys(registrationData).length === 0 &&
        registrationData.constructor === Object
      );
    const isDataempty = (registrationData["username"]!="" && registrationData["email"]!="" && registrationData["password"]!="");
    console.log("registration data object is empty or not: ",registrationData,"Data empty",isDataempty);
    if (!isObjectEmpty && isDataempty){
      //check if email already exists then 
        registerNewUser(registrationData,e);
    }
});

$("form#login-form").on("submit", function(event) {
  console.log("Login submit event is executing...");
 // event.preventDefault();
  let $inputs = $("#login-form :input");
  console.log("Inputs: ",$inputs);
    let loginData = {};
    $inputs.each(function () {
      console.log("Login form data values: ", $(this).val(), typeof( $(this).val()));
      if(( $(this).val())!= ""){
        loginData[this.name] = $(this).val();
      }
    });
    const isObjectEmpty =  (
      loginData &&
      Object.keys(loginData).length === 0 &&
      loginData.constructor === Object
    );
  console.log("loginData data object is empty: ",isObjectEmpty);
 // if(loginData.hasOwnProperty('email') && loginData.hasOwnProperty('password'))
  if (!isObjectEmpty && loginData.hasOwnProperty('email') && loginData.hasOwnProperty('password')){
    //check if email already exists then find login Id and save into the localstoarge
    $("h6#login-status").text("");
      findLoginId(loginData,event);
  }
});