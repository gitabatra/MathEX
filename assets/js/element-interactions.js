function initElements() {
  const isAdmin = isUserAdmin();
  console.log("Admin or not: ",isAdmin);
  if(!isAdmin){
    $("a#navbar-admin-btn").hide();
    $("a#navbar-user-management-btn").hide();
    $("a#navbar-student-btn").addClass("active");
    $("a#navbar-admin-btn").removeClass("active");
  }else {
    $("a#navbar-admin-btn").show();
    $("a#navbar-user-management-btn").show();
    // $("a#navbar-admin-btn").addClass("active");
    // $("a#navbar-student-btn").removeClass("active");
  }
  initQuestions();
  //initUsers();
}

function initQuestions() {
  refreshQuestionarieList();
  refreshQuestionsList();
  refreshScoreRecord();
  $("i.correctness-indicator").hide();
}

  
function isUserAdmin(){
  if("loggedInUserID" in localStorage){
    let users = getRegisteredUsers();
    console.log("user Objects: ",users);
    console.log("User is logged in....");
    let loggedInUserId = localStorage.getItem("loggedInUserID");
    console.log("Logged-in user Id: ",loggedInUserId);
    
    let userObj = users[loggedInUserId];
    console.log("Loggedin user Object: ",userObj);
    console.log("Loggedin user Object: ",userObj,"Admin or not: ",userObj.isAdmin);
    return (userObj.isAdmin);
  }
}


function refreshQuestionarieList() {
  //console.log("Refreshing questionaries : ", userId);
  let questionaries = getQuestionaries();
  let users = getRegisteredUsers();
    let loggedInUserId = localStorage.getItem("loggedInUserID");
    console.log("Logged-in user Id: ",loggedInUserId);
    let userObj = users[loggedInUserId];
    console.log("User Object: ",userObj);
  console.log("createQuestionaries: ", questionaries);
  for (const questionarieId in questionaries) {
    let scoreId = questionarieId+"_"+loggedInUserId;
    if(typeof userObj["scores"][scoreId] === 'undefined' || userObj["scores"][scoreId]=== "null"){
      Object.assign(userObj["scores"],{[scoreId]: {"scoreAttempts":{}}});
      localStorage.setItem("users", JSON.stringify(users));
      console.log("Null object: ",userObj["scores"]);
    }else{
      console.log("already defined");
    }
    if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
      let questionarieObject = questionaries[questionarieId];
      console.log("questionary object: ",questionarieObject,"published: ",questionarieObject["isQuestionariePublished"]);
      if (questionarieObject.isQuestionariePublished) {
        let hide_score_button =
        JSON.stringify(userObj["scores"][scoreId]["scoreAttempts"]) == '{}' ? "hidden" : "";
        $("div#questionarie-list").append(questionarieListItem(questionarieId, questionarieObject["name"], hide_score_button));
        if(questionarieObject.isModified){
           $(`div#questionarie-list-item-${questionarieId}`).hide();
        }
      } else {
        console.log("Publish button is not clicked.........................");
    }
        $("div#questionarie-grid")
          .append(questionarieListItemAdmin(questionarieId, questionarieObject["name"]));
         
    } else {
      console.log("The following Id not found", questionarieId);
    }
  }
}

//Appending questions to Questionarie by taking input from pop up
function appendNewQuestionToList(popupData) {
  let questionaries = getQuestionaries();
  let questionarieId = getQuestionarieID();
  console.log("questionarieId", questionarieId);
  let questionarieObject = questionaries[questionarieId];

  let qlength = Object.keys(questionarieObject["questions"]).length;
  if(qlength>0){
    qlength = Object.keys(questionarieObject["questions"])[qlength - 1].substring(12);
  }
  let newQuestionKey = "q-20230405-0" + (parseInt(qlength) + 1);
  console.log("Pop up data while appending for Admin: ",popupData);
  questionarieObject["questions"][newQuestionKey] = popupData;
  console.log(questionarieObject["questions"][newQuestionKey]);
  console.log("*******************************Questionary is published or not: ",questionarieObject.isQuestionariePublished);
  let isModified;
  if(questionarieObject.isQuestionariePublished){
    console.log("Questionarie is already published so modify the date...");
    //check the date
    console.log("Creation date: ",questionarieObject.modifiedDate);
    let isModified = checkQuestionaryUpdated(questionarieObject.modifiedDate);
    //modify the date and set isModified to true
    if(isModified){
      //let currentDate = getSessionDate();
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
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
    changeQuestionaryStatus(questionarieId);
    }
  }
  appendQuestionForAdmin(newQuestionKey, popupData.type, popupData.num1, popupData.num2);
  setQuestionary(questionarieId, questionarieObject);
}


//Refresh QuestionList
function refreshQuestionsList() {
  let questionaries = getQuestionaries();
  let questionarieId = getQuestionarieID();
  console.log("Rendering Questions for Questionarie: ", questionarieId);
  if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
    let questionarieObject = questionaries[questionarieId];
    $("#add-heading-questionarie-text").text(questionarieObject["name"]);
    // let isAdmin = checkIfLoggedInUserAdmin();
    // if(isAdmin){}else
    $("#student-dashboard-questionarie-name").text(questionarieObject["name"]);
    $("input#add-heading-questionarie-text").val(questionarieObject["name"]);
    $("h3#add-heading-questionarie-student").text(questionarieObject["name"]);
    $("div#questionarie-status-row").append(questionarieStatus(questionarieId));

    if(questionarieObject.isQuestionariePublished){
      $(`span#questionary-status-${questionarieId}`).text("Published");
     
      console.log("Publish button is clicked.........................");
      $("input#publish-btn").hide();
      if(questionarieObject.isModified){
      console.log(".............questionarie is modified..............");
      changeQuestionaryStatus(questionarieId);
     //hide the questionarie for student
      // $(`div#questionarie-list-item-${questionarieId}`).hide();
      $("input#republish-btn").show();
     }
    }
    
    let countQuestion = 1;
    for (const questionId in questionarieObject["questions"]) {
      let nDigits = questionarieObject.questions[questionId].ndigit;
      let firstNum = JSON.stringify(questionarieObject.questions[questionId].num1);
      let secondNum = JSON.stringify(questionarieObject.questions[questionId].num2);
      let questionType = questionarieObject.questions[questionId].type;
      console.log("First Number: ",firstNum,"Second Number: ",secondNum);
      //insert Questions for Admin
      appendQuestionForAdmin(questionId, questionType, firstNum, secondNum);
      appendquestionForStudent(questionId,nDigits,countQuestion,questionType,firstNum,secondNum);
      countQuestion = countQuestion + 1;
      }
  }
}

 //insert Questions for Admin
function appendQuestionForAdmin(questionId, questionType, firstNum, secondNum){
  const ques = firstNum + " " + questionType + " " + secondNum + " = ? ";
  console.log("Append Question for Admin------- : ",ques);
  $("div#add-question-from-popupdata")
    .append(`<div id="question-${questionId}" class="alignQuestions p-3">
    ${ques} 
    <a id="delete-question-link" href="#" key="${questionId}" class="text-dark"><i class="fas fa-trash-alt ms-5"></i></a>   
  </div>`);
}

//Appending Questions on Student Page
function appendquestionForStudent(questionId,nDigits,countQuestion,questionType,firstNum,secondNum){
  console.log("Appending Questions for students......");
  console.log("Second Number: ",secondNum,typeof(secondNum));
  if(questionType == "+" || questionType == "-"){
    //append addition and subtraction questions
    console.log("Second Number: ",secondNum,typeof(secondNum));
    appendAddSubtractQuestions(questionId,nDigits,countQuestion,questionType,firstNum,secondNum);
  } else if(questionType == "x"){
    appendMultiplicationQuestions(questionId,nDigits,countQuestion,questionType,firstNum,secondNum);
  } else if(questionType == "/"){
    //append division questions
    console.log("Appending Division Questions");
    let correctAnswerObj = calculateAnswer(firstNum,secondNum,questionType);
    console.log("Division Questions  before Appending: ",correctAnswerObj.quotient, typeof(correctAnswerObj["quotient"].toString().length));
    $("div#questions-list").append(appendDivisionQuestions(questionId,countQuestion,firstNum,secondNum,correctAnswerObj));
  } else {
    console.log("question type is not defined or selected");
  }
}

function refreshScoreRecordAttemptAdmin(scoreRecordObject,userId,attemptId,attemptCount,questionId,countQuestion){
  console.log("Score Record Object: ",scoreRecordObject,"user Id: ",userId,"Question Id: ",questionId);
  // let attemptKey = userId+"-"+attemptId;
  // console.log("Attempt Key: ",attemptKey);
  let firstNum = scoreRecordObject.questions[questionId].num1;
  let secondNum = scoreRecordObject.questions[questionId].num2;
  let questionType = scoreRecordObject.questions[questionId].type;
  let givenAnswer = scoreRecordObject.questions[questionId].givenAns;
  let correctAnswer = scoreRecordObject.questions[questionId].correctAns;
  let question ="Q" + countQuestion + ". " +firstNum + " " + questionType + " " +secondNum;
  console.log(question);
  console.log("Given Answer: ", givenAnswer,"Correct Answer: ", correctAnswer);
  if(questionType == "/"){
    let givenInputAnswer = "Q : "+givenAnswer.quotient+" , R : "+givenAnswer.remainder;
    let calcCorrectAnswer = "Q : "+correctAnswer.quotient+" , R : "+correctAnswer.remainder;
    $("div#score-accordion-body-"+ `${attemptId}`+"-" + `${attemptCount}`)
    .append(appendScoreRecord(question,questionId,attemptCount,calcCorrectAnswer,givenInputAnswer));
    if(givenAnswer.quotient == correctAnswer.quotient && givenAnswer.remainder == correctAnswer.remainder){
      console.log("Display indicator for AttemptID: ",attemptId);
      displayCorrectSignOnScoreRecordAdmin(attemptCount,questionId,attemptId);
    } else {
      console.log("Display indicator for AttemptID: ",attemptId);
      displayWrongSignOnScoreRecordAdmin(attemptCount,questionId,attemptId);
    }
  }else {
  $("div#score-accordion-body-"+ `${attemptId}`+"-" + `${attemptCount}`)
    .append(appendScoreRecordAdmin(question,questionId,attemptId,attemptCount,correctAnswer,givenAnswer));
  if (givenAnswer === correctAnswer) {
    console.log("Score Record Check -- Question is Correct");
    console.log("Display indicator for AttemptID: ",attemptId);
    displayCorrectSignOnScoreRecordAdmin(attemptCount,questionId,attemptId);
  } else {
    console.log("Score Record Check -- Question is Wrong");
    console.log("Display indicator for AttemptID: ",attemptId);
    displayWrongSignOnScoreRecordAdmin(attemptCount,questionId,attemptId);
  }
  }
}

function displayUserNames(questionarieObject,questionarieId){
  console.log("Displaying user names");
  let users = getRegisteredUsers();
  console.log("users: ",users);
  $("div#questionarie-score-record").append( scoreRecord(questionarieId, questionarieObject["name"]));
  for(const [u_k, u_v] of Object.entries(users)){
    if(!u_v["isAdmin"]){
      console.log("id: ",u_k);
      let scoreId = questionarieId+"_"+u_k;
      console.log(`USER: ${u_v["username"]}\n${'_'.repeat(10)}`);
     // $("div#questionarie-score-record").append(scoreAdminUserNames(u_v["username"]));
      let username = u_v["username"];
      console.log("Score Objects: ", (u_v["scores"][scoreId]));
      if((u_v["scores"][scoreId]) && Object.keys(u_v["scores"][scoreId]["scoreAttempts"])!=0 ){
         let attemptCount = 1;
    for(const attemptId in (u_v["scores"][scoreId]["scoreAttempts"])){
      console.log("Attempt id: ",attemptId);
      let scoreRecordObject = (u_v["scores"][scoreId]["scoreAttempts"])[attemptId];
      $("div#accordion-"+`${questionarieId}`).append(appendAttemptHeaderAdmin(attemptId,username,scoreRecordObject.dateQuestionarie,scoreRecordObject.score,attemptCount));
      let countQuestion = 1;
      for (let questionId in scoreRecordObject["questions"]) {
        console.log("questionId: ",questionId);
        refreshScoreRecordAttemptAdmin(scoreRecordObject,u_k,attemptId,attemptCount,questionId,countQuestion);
        countQuestion = countQuestion + 1;
      }
      attemptCount = attemptCount + 1;
    }
              }else{
                console.log("Attempts are not made yet...");
              }
      
      
    }else{
      console.log("User is Admin....");
    }
    }
}


function refreshScoreRecord() {
  console.log("refreshing Score record.........................");
  let questionaries = getQuestionaries();
  let questionarieId = getQuestionarieID();
  //check user is admin or student
  let userObj = getRegisteredUsers();
  let loggedInUserId = localStorage.getItem("loggedInUserID");
  let isAdmin = userObj[loggedInUserId].isAdmin;
  console.log("Current user is Student or Admin : ",isAdmin);
  let scoreId = questionarieId+"_"+loggedInUserId;
  let scoreObject = userObj[loggedInUserId]["scores"][scoreId];
  console.log("Score Record Object....... ",scoreObject);
  //create new score object for questionary

  if(isAdmin){
    if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
      let questionarieObject = questionaries[questionarieId];
      displayUserNames(questionarieObject,questionarieId);
    }
    console.log("User is Admin..");
  }else{
    console.log("Initializing score record for Questionarie: ", questionarieId);
    if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
    let questionarieObject = questionaries[questionarieId];
    $("div#questionarie-score-record").append( scoreRecord(questionarieId, questionarieObject["name"]));
    let attemptCount = 1;
    for(const attemptId in scoreObject["scoreAttempts"]){
      let scoreRecordObject = scoreObject["scoreAttempts"][attemptId];
      $("div#accordion-"+`${questionarieId}`).prepend(appendAttemptHeader(questionarieId,scoreRecordObject.dateQuestionarie,scoreRecordObject.score,attemptCount));
      let countQuestion = 1;
      for (const questionId in scoreRecordObject["questions"]) {
        refreshScoreRecordAttempt(scoreRecordObject,attemptCount,questionId,countQuestion);
        countQuestion = countQuestion + 1;
      }
      attemptCount = attemptCount + 1;
    }
  }
  }
}

//Append Score-Record Questions
function refreshScoreRecordAttempt(scoreRecordObject,attemptCount,questionId,countQuestion){
  let firstNum = scoreRecordObject.questions[questionId].num1;
  let secondNum = scoreRecordObject.questions[questionId].num2;
  let questionType = scoreRecordObject.questions[questionId].type;
  let givenAnswer = scoreRecordObject.questions[questionId].givenAns;
  let correctAnswer = scoreRecordObject.questions[questionId].correctAns;
  let question ="Q" + countQuestion + ". " +firstNum + " " + questionType + " " +secondNum;
  console.log(question);
  console.log("Given Answer: ", givenAnswer,"Correct Answer: ", correctAnswer);
  if(questionType == "/"){
    let givenInputAnswer = "Q : "+givenAnswer.quotient+" , R : "+givenAnswer.remainder;
    let calcCorrectAnswer = "Q : "+correctAnswer.quotient+" , R : "+correctAnswer.remainder;
    $("div#score-accordion-body-" + `${attemptCount}`)
    .append(appendScoreRecord(question,questionId,attemptCount,calcCorrectAnswer,givenInputAnswer));
    if(givenAnswer.quotient == correctAnswer.quotient && givenAnswer.remainder == correctAnswer.remainder){
      displayCorrectSignOnScoreRecord(attemptCount,questionId);
    } else {
      displayWrongSignOnScoreRecord(attemptCount,questionId);
    }
  }else {
  $("div#score-accordion-body-" + `${attemptCount}`)
    .append(appendScoreRecord(question,questionId,attemptCount,correctAnswer,givenAnswer));
  if (givenAnswer === correctAnswer) {
    console.log("Score Record Check -- Question is Correct");
    displayCorrectSignOnScoreRecord(attemptCount,questionId);
  } else {
    console.log("Score Record Check -- Question is Wrong");
    displayWrongSignOnScoreRecord(attemptCount,questionId);
  }
  }
}

function displayCorrectSignOnScoreRecord(attemptCount,questionId){
   $("i#question-" + `${attemptCount}`+ "-" +`${questionId}` + "-correct").show();
  $("i#question-" + `${attemptCount}`+ "-" +`${questionId}` + "-wrong").hide();
}

function displayWrongSignOnScoreRecord(attemptCount,questionId){
  $("i#question-" + `${attemptCount}`+ "-" +`${questionId}` + "-wrong").show();
  $(`i#question-${attemptCount}-${questionId}-correct`).hide();
}

function displayCorrectSignOnScoreRecordAdmin(attemptCount,questionId,attemptId){
  console.log("Displaying correct sign for Admin........ : AttemptCount: ",attemptCount);
  $(`i#question-${attemptId}-${attemptCount}-${questionId}-correct`).show();
  $(`i#question-${attemptId}-${attemptCount}-${questionId}-wrong`).hide();
}

function displayWrongSignOnScoreRecordAdmin(attemptCount,questionId,attemptId){
  console.log("Displaying wrong sign for Admin........ : AttemptCount: ",attemptCount);
 $(`i#question-${attemptId}-${attemptCount}-${questionId}-wrong`).show();
 $(`i#question-${attemptId}-${attemptCount}-${questionId}-correct`).hide();
}