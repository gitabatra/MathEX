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
          questionarieObject["score"] == "" ? "hidden" : "";
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

//Checking Questionarie for Student to prepare result
function checkQuestionarie() {
  let questionaries = getQuestionaries();
  let questionarieId = getQuestionarieID();
  console.log("Checking Questions for Questionarie: ", questionarieId);
  if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
    let questionarieObject = questionaries[questionarieId];
    console.log(questionarieObject);
    let scoreAttemptID = createNewScoreAttemptID(questionarieId);
    let scoreRecordObject = createNewScoreAttemptObject(scoreAttemptID);
    console.log(scoreAttemptID,scoreRecordObject[scoreAttemptID]);
    let totalQuestions = Object.keys(questionarieObject["questions"]).length;
    let correctCount = 0;
    let inputAnswer = 0;
    for (const questionId in questionarieObject["questions"]) {
      let questionsObj = questionarieObject["questions"][questionId];
      let correctAnswer = calculateAnswer(questionsObj.num1,questionsObj.num2,questionsObj.type);
      inputAnswer = parseInt($("#given-answer-" + `${questionId}`).val().trim()); 
      console.log("Questions-- Input Answer: ",inputAnswer);
     
      if (isNaN(inputAnswer) || inputAnswer == null) {
        inputAnswer = "";
      }
      //questionarieObject.questions[questionId].givenAns = inputAnswer;
      console.log("Given Answer: ", inputAnswer);
      console.log("correct Answer: ", correctAnswer);
     
      if (inputAnswer === correctAnswer) {
        correctCount = correctCount + 1;
        $("i#question-" + `${questionId}` + "-correct").show();
        $("i#question-" + `${questionId}` + "-wrong").hide();
      } else {
        $("i#question-" + `${questionId}` + "-wrong").show();
        $("i#question-" + `${questionId}` + "-correct").hide();
      }
     
      Object.assign(scoreRecordObject[scoreAttemptID]["questions"], { [questionId] :{num1 : questionsObj.num1, num2 : questionsObj.num2,ndigit: questionsObj.ndigit,type: questionsObj.type, givenAns: inputAnswer, correctAns: correctAnswer}
      });
      
      console.log("Questionarie Object: ", scoreRecordObject[scoreAttemptID]["questions"][questionId]);
      //console.log("questions REcord JSON Onject", questionsRecordObj);
    }

    console.log("Questionarie Object: ", scoreRecordObject[scoreAttemptID]);
    console.log("Correct Questions: ", correctCount);
    Object.assign(scoreRecordObject[scoreAttemptID], {
      score: correctCount + " / " + totalQuestions,
    });
   
   // let scoreObj = {[scoreAttemptID]: scoreRecordObject[scoreAttemptID]};
   // console.log("----Score Obj---- ",scoreAttemptID,scoreObj);
    console.log("Score Record Object----- ",scoreRecordObject[scoreAttemptID],questionarieObject);
    Object.assign(questionarieObject["scoreAttempts"],{[scoreAttemptID]: scoreRecordObject[scoreAttemptID]});
    
 // }else{
 //   console.log("Score Object is not defined");
 // }

    localStorage.setItem("questionaries", JSON.stringify(questionaries));
    console.log("Questionarie object after checking questions: ", questionaries);
  }
}

//Score -Record
function refreshScoreRecord() {
  let questionaries = getQuestionaries();
  let questionarieId = getQuestionarieID();
  console.log("Initializing score record for Questionarie: ", questionarieId);
  if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
    let questionarieObject = questionaries[questionarieId];
    console.log(questionarieObject["scoreAttempts"]);
    $("div#questionarie-score-record").append( scoreRecord(questionarieId, questionarieObject["name"]));
    let attemptCount = 1;
    for(const attemptId in questionarieObject["scoreAttempts"]){
      console.log("Score Record for Questionarie: ",questionarieId,"and score attemptId",attemptId);
      let scoreRecordObject = questionarieObject["scoreAttempts"][attemptId];
      $("div#accordion-"+`${questionarieId}`).append(appendAttemptHeader(questionarieId,scoreRecordObject.dateQuestionarie,scoreRecordObject.score,attemptCount));
      let countQuestion = 1;
      for (const questionId in scoreRecordObject["questions"]) {
        console.log("Rendering Question ",questionId," for questionarie ",questionarieId);
        // console.log("Number of Digits.... ",questionarieObject.questions[questionId].ndigit);
        // let nDigits = questionarieObject.questions[questionId].ndigit;
        let firstNum = scoreRecordObject.questions[questionId].num1;
        let secondNum = scoreRecordObject.questions[questionId].num2;
        let questionType = scoreRecordObject.questions[questionId].type;
        let givenAnswer = scoreRecordObject.questions[questionId].givenAns;
        let correctAnswer = scoreRecordObject.questions[questionId].correctAns;
        let question ="Q" + countQuestion + ". " +firstNum + " " + questionType + " " +secondNum;
        console.log(question);
        console.log("Given Answer: ", givenAnswer,"Correct Answer: ", correctAnswer);
        $("div#score-accordion-body-" + `${attemptCount}`)
          .append(appendScoreRecord(question,questionId,correctAnswer,givenAnswer));
        if (givenAnswer === correctAnswer) {
          console.log("Score Record Check -- Question is Correct");
          $("i#question-" + `${questionId}` + "-correct").show();
          $("i#question-" + `${questionId}` + "-wrong").hide();
        } else {
          console.log("Score Record Check -- Question is Wrong");
          $("i#question-" + `${questionId}` + "-wrong").show();
          $("i#question-" + `${questionId}` + "-correct").hide();
        }
        countQuestion = countQuestion + 1;
      }
      attemptCount = attemptCount + 1;
    }
  }
}


// //Score -Record
// function refreshScoreRecord() {
//   let questionaries = getQuestionaries();
//   let questionarieId = getQuestionarieID();
//   console.log("Initializing score record for Questionarie: ", questionarieId);
//   if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
//     let questionarieObject = questionaries[questionarieId];
//     console.log(questionarieObject["scoreAttempts"]);
//     $("div#questionarie-score-record").append(` <div class="row gx-3 mt-3">
//     <div class="col-sm-6 col-md-4">
//       <h3>${questionarieObject["name"]}</h3>
//     </div>
//     <div class="col-sm-6 col-md-4">
//       <a
//         class="btn btn-dark ms-3 px-4"
//         data-mdb-toggle="collapse"
//         href="#questionarie-score-${questionarieId}"
//         role="button"
//         aria-expanded="false"
//         aria-controls="questionarie-score-${questionarieId}"
//       >
//         Show results
//       </a>
//     </div>
//     ${gettest(questionarieId)}
// `);
//     // let attemptCount = 1;
//     // for(const attemptId in questionarieObject["scoreAttempts"]){
//     //   console.log("Score Record for Questionarie: ",questionarieId,"and score attemptId",attemptId);
//     //   let scoreRecordObject = questionarieObject["scoreAttempts"][attemptId];
//     //   console.log("Score Record Object ",attemptId, questionarieObject["scoreAttempts"]);
//     //   $("div#questionarie-score-"+`${questionarieId}`).append(appendAttemptHeader(attemptId,scoreRecordObject.dateQuestionarie,scoreRecordObject.score,attemptCount));
//     //   let countQuestion = 1;
//     //   for (const questionId in scoreRecordObject["questions"]) {
//     //     console.log("Rendering Question ",questionId," for questionarie ",questionarieId);
//     //     // console.log("Number of Digits.... ",questionarieObject.questions[questionId].ndigit);
//     //     // let nDigits = questionarieObject.questions[questionId].ndigit;
//     //     let firstNum = scoreRecordObject.questions[questionId].num1;
//     //     let secondNum = scoreRecordObject.questions[questionId].num2;
//     //     let questionType = scoreRecordObject.questions[questionId].type;
//     //     let givenAnswer = scoreRecordObject.questions[questionId].givenAns;
//     //     let correctAnswer = scoreRecordObject.questions[questionId].correctAns;
//     //     let question ="Q" + countQuestion + ". " +firstNum + " " + questionType + " " +secondNum;
//     //     console.log(question);
//     //     console.log("Given Answer: ", givenAnswer,"Correct Answer: ", correctAnswer);
//     //     $("div#score-accordion-body-" + `${attemptId}`)
//     //       .append(appendScoreRecord(question,questionId,correctAnswer,givenAnswer));
//     //     if (givenAnswer === correctAnswer) {
//     //       console.log("Score Record Check -- Question is Correct");
//     //       $("i#question-" + `${questionId}` + "-correct").show();
//     //       $("i#question-" + `${questionId}` + "-wrong").hide();
//     //     } else {
//     //       console.log("Score Record Check -- Question is Wrong");
//     //       $("i#question-" + `${questionId}` + "-wrong").show();
//     //       $("i#question-" + `${questionId}` + "-correct").hide();
//     //     }
//     //     countQuestion = countQuestion + 1;
//     //   }
//     //   attemptCount = attemptCount + 1;
//     // }
    
    
    
//     //Check the length of scoreAttempts objects and loop through it to add multiple attempt

//    //then for each object display score record

//     //console.log("Questions for Questionarie: ", questionarieId, questionarieObject["questions"]);
//    //.dateQuestionarie, questionaries[questionarieId].score));
    
    
//   }
// }


// function gettest(questionarieId){
//   return `    <!-- Collapsed content -->
//   <div class="collapse mt-3" id="questionarie-score-${questionarieId}">
//     <div class="accordion" id="accordionExample">
//      ${getFirstAttempt()}
     
//      ${getnextattempt()}

//     </div>
//   </div>
// </div>`
// }

// function getFirstAttempt(){
//   return ` <div class="accordion-item">
//   <h2 class="accordion-header" id="headingOne">
//     <button
//       class="accordion-button"
//       type="button"
//       data-mdb-toggle="collapse"
//       data-mdb-target="#collapse-questionarie-score"
//       aria-expanded="true"
//       aria-controls="collapse-questionarie-score"
//     >
//       Last Attempt #1
//     </button>
//   </h2>
//   <div
//     id="collapse-questionarie-score"
//     class="accordion-collapse collapse show"
//     aria-labelledby="headingOne"
//     data-mdb-parent="#accordionExample"
//   >
//     <div class="accordion-body">
//       <div class="d-flex justify-content-end">
//         <h5>20 March 2023</h5>
//         <h5 class="ms-5">Score - 4/5
//           <div class="progress">
//             <div class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
//           </div>
//         </h5>
//       </div>

//      ${getquestionsScore()}
     
//     </div>
//   </div>
// </div>`
// }


// function getnextattempt(){
//   return ` <div class="accordion-item">
//   <h2 class="accordion-header" id="headingTwo">
//     <button
//       class="accordion-button collapsed"
//       type="button"
//       data-mdb-toggle="collapse"
//       data-mdb-target="#collapseTwo"
//       aria-expanded="false"
//       aria-controls="collapseTwo"
//     >
//       Last Attempt #2
//     </button>
//   </h2>
//   <div
//     id="collapseTwo"
//     class="accordion-collapse collapse"
//     aria-labelledby="headingTwo"
//     data-mdb-parent="#accordionExample"
//   >
//     <div class="accordion-body">
//       <div class="d-flex justify-content-end">
//         <h5 class="">15 March 2023</h5>
//         <h5 class="ms-5">Score - 2/2
//           <div class="progress">
//             <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
//           </div>
//         </h5>
//       </div>

//       <div class="row">
//         <div class="col-4">Q1. 2 + 3</div>
//         <div class="col-4 correctAns">Coorect Answer - 5</div>
//         <div class="col-4 givenAns">Given Answer - 5 <i class="fas fa-check text-success"></i></div>
//       </div>
     
//     </div>
//   </div>
// </div>`
// }


// function getquestionsScore(){
// return ` <div class="row">
// <div class="col-4">Q1. 2 + 3</div>
// <div class="col-4 correctAns">Coorect Answer - 5</div>
// <div class="col-4 givenAns">Given Answer - 5  <i class="fas fa-check text-success"></i></div>
// </div>`
// }