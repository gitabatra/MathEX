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
      // let isDateModified = checkQuestionaryUpdated(questionaries[questionaryKey].modifiedDate);
      // if(isDateModified){
        console.log("Date is modified, so creating notification..........");
        createDeleteQuestioanryNotification(questionaryKey);
      // }
    }
    delete questionaries[questionaryKey];
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
  });

  //Delete Question from a Questionarie
  $(document).on("click", "a#delete-question-link", function () {
    console.log("Delete Question from List event is executing");
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

    delete questionaries[questionarieId]["questions"][questionKey];
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
    if(questionaries[questionarieId].isQuestionariePublished){
      let isModified = checkQuestionaryUpdated(questionaries[questionarieId].modifiedDate);
      if(isModified){
        let currentDate = getSessionDate();
        Object.assign(questionaries[questionarieId], {
          isModified:true,
          modifiedDate: {
            day: currentDate[0],
            month: currentDate[1],
            year: currentDate[2]
        }
      });
      localStorage.setItem("questionaries", JSON.stringify(questionaries));
      changeQuestionaryStatus(questionaries[questionarieId]);
    }

      // Object.assign(questionaries[questionarieId],{isModified: true});
      // localStorage.setItem("questionaries", JSON.stringify(questionaries));
      // changeQuestionaryStatus(questionaries[questionarieId]);
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

  function getScoreRecordObject(questionarieObject,scoreAttemptID,scoreRecordObject,totalQuestions){
    let correctCount = 0, inputAnswer = 0;
    for (const questionId in questionarieObject["questions"]) {
      let questionsObj = questionarieObject["questions"][questionId];
      let correctAnswer = calculateAnswer(questionsObj.num1,questionsObj.num2,questionsObj.type);
      if(questionsObj.type == "/"){
        //call 
        let inputAnswerObj = checkAnswerForDivision(questionId,questionsObj);
        //let quotient = inputAnswerObj.inputAnswer;
        console.log("InputAnswerObject",inputAnswerObj);
        if(inputAnswerObj.quotient == correctAnswer.quotient && inputAnswerObj.remainder == correctAnswer.remainder){
          console.log("For Division, InputAnswer object is equal to CorrectAnswer Object", inputAnswerObj,correctAnswer);
          correctCount = correctCount+1;
        }
        Object.assign(scoreRecordObject[scoreAttemptID]["questions"], { [questionId] :{num1 : questionsObj.num1, num2 : questionsObj.num2,ndigit: questionsObj.ndigit,type: questionsObj.type, 
          givenAns: {"quotient":inputAnswerObj.quotient,"remainder":inputAnswerObj.remainder}, correctAns: {"quotient":correctAnswer.quotient,"remainder":correctAnswer.remainder}}});

          console.log("********Score Object for Division:",scoreRecordObject[scoreAttemptID]["questions"]);
      }else{
        if(questionsObj.type == "+" || questionsObj.type == "-"){
          inputAnswer = checkAnswerForAdditionSubtraction(questionId,questionsObj,correctAnswer);
       }else if(questionsObj.type == "x"){
         inputAnswer = checkAnswerForMultiplication(questionId,questionsObj,correctAnswer); 
       } 
       console.log("Questions-- Input Answer: ",inputAnswer);
       if (isNaN(inputAnswer) || inputAnswer == null) {
         inputAnswer = "";
       }
       if(inputAnswer == correctAnswer){
         correctCount = correctCount+1;
       }
       
       Object.assign(scoreRecordObject[scoreAttemptID]["questions"], { [questionId] :{num1 : questionsObj.num1, num2 : questionsObj.num2,ndigit: questionsObj.ndigit,type: questionsObj.type, 
         givenAns: inputAnswer, correctAns: correctAnswer}});
      }
      
    }
   Object.assign(scoreRecordObject[scoreAttemptID], { dateQuestionarie: getDateForQuestionarieAttempt(),score: correctCount + " / " + totalQuestions });
  return(scoreRecordObject[scoreAttemptID]);
  }

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
    $("p#questionary-status").text("Status: Published");
    $("input#publish-btn").hide();
    $("input#add-new-question-btn").hide();
  });

  $("button#pop-up-submit-btn").click(function (event) {
    console.log("PopUp Submit button on AddNewTest page is executing");
    let testName = $("input#new-questionarie-name").val();
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

  function fetchPopUpData(event) {
    let $inputs = $("#popup-form :input");
    let popupData = {};
    $inputs.each(function () {
      popupData[this.name] = $(this).val();
      console.log(popupData[this.name]);
      console.log(typeof popupData[this.name]);
    });

    if (popupData["ndigit"] != "" && popupData["num1"] != ""  &&  popupData["num2"] != "") {
      console.log("Popup data not null and validate data");
      console.log("No of digits entered in pop up: ",popupData["ndigit"]);
      if(parseInt(popupData["ndigit"])<=0 || parseInt(popupData["ndigit"])>4){
        console.log("Greater than 4...........");
        event.preventDefault();
      }else{
        let popupDataObj = validatePopUpData(popupData,event);
        return (popupDataObj);
      }
      
    } else {
      console.log("Pop up data is null");
      return null;
    }
  }

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
})

function registerNewUser(registrationData,e){
  console.log("Register new user......");
  let userObj = getRegisteredUsers();
  console.log("User Object in local Storage: ",userObj);
  //e.preventDefault();

  let ulength = Object.keys(userObj).length;
  if(ulength>0){
    ulength = Object.keys(userObj)[ulength - 1].substring(12);
  }
  let newUserId = "u-20230405-0" + (parseInt(ulength) + 1);
  console.log("new user Id: ",newUserId);
  //session date
  let sessionDateObj = getSessionDate();
  console.log("New user Id: ",newUserId);
  let newUserObj = createNewUserRegistrationObject(newUserId,registrationData,sessionDateObj);
  console.log("New USer Object On Registration: ",newUserObj);
  Object.assign(userObj, newUserObj);
  console.log("After assigning new user: ",userObj);
  localStorage.setItem("users", JSON.stringify(userObj));
  //set loggedinUserId to localstorage
  setLoggedInUserId(userObj,newUserId);
  $('#registration-form').attr('action', './index.html');
  //window.location.href = "/index.html";
}

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
  if (!isObjectEmpty){
    //check if email already exists then find login Id and save into the localstoarge
      findLoginId(loginData,event);
  }
});

function findLoginId(loginData,event){
  console.log("Find logged in user event is executing...");
  let userObj = getRegisteredUsers();
  console.log("User Object in local Storage: ",userObj);
 
  if(userObj!=null){
    let userId = Object.keys(userObj);
    console.log("user Keys: ",userId);

     for (const userId in userObj) {
      console.log("userId : ",userId);
      let email = userObj[userId].email;
      let password = userObj[userId].password;
      console.log("userId : ",userId,"email: ",email,"password: ",password,"loginData: ",loginData);
      if(loginData.email === email && loginData.password === password){
        console.log("This email id is already registered");
        //set loggedIn to true
        setLoggedInUserId(userObj,userId);
        console.log("Admin is loggin in : ",userObj,userObj[userId].isAdmin);
        if(userObj[userId].isAdmin){
          window.location.href = "./admin.html";
        } else {
          window.location.href = "./index.html";
        }
       
        // $('#login-form').attr('action', '/index.html');
        // $('#login-form').submit();
      } else{
        event.preventDefault();
        console.log("User is not registered");
        $("h2#login-status").text("Please register!!!");
      }
    }
  }
  // else{
  //   console.log("User is not registered");
  //   $("h2#login-status").text("Please register!!!");
  // }
}


$("a#navbar-notification-btn").on("click", function(event){
  window.location.href = "./notification.html";
});

$("a#navbar-logout-btn").on("click", function(event){
  logout();
});

function logout(){
  let users = getRegisteredUsers();
  let userId =  localStorage.getItem("loggedInUserID");
  console.log("logout event is executing for login Id.....",userId, users[userId].isLoggedIn);
  Object.assign(users[userId], {
    isLoggedIn: false
  });
  localStorage.setItem("users", JSON.stringify(users));
  //set userloginid to null localstorage
  localStorage.setItem("loggedInUserID",'null');
  console.log("logged in user id: ",localStorage.getItem("loggedInUserID"));
  if(forcedUserLogoutTimout != null){
    console.log("Clearing timout");
    clearTimeout(forcedUserLogoutTimout);
    forcedUserLogoutTimout = null;
  }   
  window.location.href = "./loginRegister.html";
}