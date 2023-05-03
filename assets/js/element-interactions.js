function initElements() {
  initQuestions();
}

function initQuestions() {
  refreshQuestionarieList();
  refreshQuestionsList();
  refreshScoreRecord();
  $("i.correctness-indicator").hide();
}

function refreshQuestionarieList() {
  let questionaries = getQuestionaries();
  console.log("createQuestionaries: ", questionaries);
  for (const questionarieId in questionaries) {
    if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
      let questionarieObject = questionaries[questionarieId];
      //let hide_score_button = (('score' in questionarieObject)  &&(questionarieObject["score"] == "") ) ? "" : "hidden";
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
  $("div#questions-list").append(appendMultiplicationQuestions(questionId,countQuestion,questionType,firstNum,secondNum));
  let inputBoxID = $("input#given-answer-"+`${questionId}`);
  if(nDigits == 1 || nDigits == 2){
    inputBoxID.attr("class","inputBox");
  } else if(nDigits == 3){
    inputBoxID.attr("class","inputBox3digit");
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
      $("div#accordion-"+`${questionarieId}`).append(appendAttemptHeader(questionarieId,scoreRecordObject.dateQuestionarie,scoreRecordObject.score,attemptCount));
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
  $("div#score-accordion-body-" + `${attemptCount}`)
    .append(appendScoreRecord(question,questionId,attemptCount,correctAnswer,givenAnswer));
  if (givenAnswer === correctAnswer) {
    console.log("Score Record Check -- Question is Correct");
    $("i#question-" + `${attemptCount}`+ "-" +`${questionId}` + "-correct").show();
    $("i#question-" + `${attemptCount}`+ "-" +`${questionId}` + "-wrong").hide();
  } else {
    console.log("Score Record Check -- Question is Wrong");
    $("i#question-" + `${attemptCount}`+ "-" +`${questionId}` + "-wrong").show();
    $(`i#question-${attemptCount}-${questionId}-correct`).hide();
  }
}