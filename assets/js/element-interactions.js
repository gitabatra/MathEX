function initElements() {
  const isAdmin = isUserAdmin();
  console.log("Admin or not: ",isAdmin);
  if(!isAdmin){
    $("a#navbar-admin-btn").hide();
  }else {
    $("a#navbar-admin-btn").show();
  }
 // checkUserLoggedIn();
  initQuestions();
}

function initQuestions() {
  refreshQuestionarieList();
  refreshQuestionsList();
  refreshScoreRecord();
  $("i.correctness-indicator").hide();
}

// function checkUserLoggedIn(){
//   let users = getRegisteredUsers();
//   let userId = getUserID();
  
//   if(userId!=null ){
//     $("a#navbar-admin-btn").hide();
//     let isAdmin = users[userId].isAdmin;
//     console.log("Logged in User id is : ",userId,"User is admin or not: ",isAdmin); //&& !isAdmin
//    // initQuestions(userId);
//   } 
//   // else {
//   //   window.location.href = "/login.html";
//   // }
// }
  
function isUserAdmin(){
  if("loggedInUserID" in localStorage){
    console.log("User is logged in....");
    const loggedInUserId = localStorage.getItem("loggedInUserID");
    console.log("Logged-in user Id: ",loggedInUserId);
    const users = getRegisteredUsers();
    const userObj = users[loggedInUserId];
    console.log("Loggedin user Object: ",userObj,"Admin or not: ",userObj.isAdmin);
    return (userObj.isAdmin);
  }
}


function refreshQuestionarieList() {
  //console.log("Refreshing questionaries : ", userId);
  let questionaries = getQuestionaries();
  console.log("createQuestionaries: ", questionaries);
  for (const questionarieId in questionaries) {
    if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
      let questionarieObject = questionaries[questionarieId];
      console.log("questionary object: ",questionarieObject,"published: ",questionarieObject["isQuestionariePublished"]);
      if (!(questionarieObject.isQuestionariePublished)) {
        console.log("Publish button is not clicked.........................");
      } else {
        let hide_score_button =
          JSON.stringify(questionarieObject["scoreAttempts"]) == '{}' ? "hidden" : "";
        $("div#questionarie-list").append(questionarieListItem(questionarieId, questionarieObject["name"], hide_score_button));
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
    $("#add-heading-questionarie").text(questionarieObject["name"]);
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
    .append(`<div id="question-${questionId}" class="alignQuestions">
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


//Score -Record
function refreshScoreRecord() {
  let questionaries = getQuestionaries();
  let questionarieId = getQuestionarieID();
  console.log("Initializing score record for Questionarie: ", questionarieId);
  if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
    let questionarieObject = questionaries[questionarieId];
    $("div#questionarie-score-record").append( scoreRecord(questionarieId, questionarieObject["name"]));
    let attemptCount = 1;
    for(const attemptId in questionarieObject["scoreAttempts"]){
      let scoreRecordObject = questionarieObject["scoreAttempts"][attemptId];
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