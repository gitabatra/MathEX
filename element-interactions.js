function initElements() {
  initQuestions();
  initQuestionarie();
  initQuestionsList();
}

function initQuestions() {
  refreshQuestionarieList();
  refreshQuestionsList();
  $("i.correctness-indicator").hide();
}

function refreshQuestionarieList() {

  let questionaries = JSON.parse(localStorage.getItem("questionaries"));
  console.log("createQuestionaries: ", questionaries);

  for (const questionarieId in questionaries) {
    if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
      let questionarieObject = questionaries[questionarieId];
      $("div#questionarie-list").append(`
      <div id="questionarie-list-item-${questionarieId}" class="row">
          <div class="col">
              <label><h2 class="px-4"> ${questionarieObject["name"]} </h2></label>
              <a href="/studentQuestionary.html?questionarie-id=${questionarieId}">
                <button id="open-questionarie-btn-${questionarieId}" class="btn btn-success px-4 mb-2">Go <i class="fas fa-angle-double-right"></i></button>   
              </a>
          </div>
      </div>
      `);

      $("div#questionarie-grid")
    .append(`<div id="questionarie-grid-item-${questionarieId}" class="row">
  <div class="col text-end">
      <label><h2 class="px-4"> ${questionarieObject["name"]} </h2></label>
  </div>
  <div class="col text-start">
     <a href="/score_record.html?questionarie-id=${questionarieId}">
       <button id="open-score-record-btn" class="btn btn-info px-4 mb-2">Scores <i class="fas fa-star"></i></button>
      </a>
      <a href="/addQuestions.html?questionarie-id=${questionarieId}">
      <button id="open-edit-questionarie-btn" class="btn btn-success px-4 mb-2">Edit <i class="fas fa-edit"></i></button>
      </a>
      
      <button id="delete-questionarie-btn" class="btn btn-danger px-4 mb-2">Delete <i class="fas fa-trash-alt"></i></button>
     
  </div>
</div>`);
    }
    else {
      console.log("The following Id not found", questionarieId);
    }
  }
  // console.log("Creating questions...");
  // for (let i = 0; i <= 5; i++) {
  //   console.log("Creating question: ", i);
  //   $("div#questions-list").append(`
  //   <div id="question-col-${i}" class="col-sm-6 col-md-4">
  //       <div class="card text-center">
  //         <div class="card-header">Question 1</div>
  //         <div class="card-body">
  //           <table class="tableAlign">
  //             <thead>
  //               <td></td>
  //               <td>Carry</td>
  //               <td></td>
  //             </thead>
  //             <tbody>
  //               <tr>
  //                 <td></td>
  //                 <td class="text-end">
  //                   <input type="text" class="inputBox" />
  //                 </td>
  //                 <td></td>
  //               </tr>
  //               <tr>
  //                 <td></td>
  //                 <td class="text-center align-bottom">3</td>
  //                 <td class="text-center">6</td>
  //               </tr>
  //               <tr>
  //                 <td class="text-center align-bottom">+</td>
  //                 <td class="text-center align-bottom">1</td>
  //                 <td class="text-center">4</td>
  //               </tr>
  //               <tr>
  //                 <td></td>
  //                 <td class="text-end align-items-end alignNumbers">
  //                   <input class="inputBox" type="text" />
  //                 </td>
  //                 <td class="alignNumbers">
  //                   <input class="inputBox" type="text" />
  //                 </td>
  //               </tr>
  //             </tbody>
  //           </table>
  //           <br />
  //           <i id="question-${i}-correct" class="fas fa-check text-success correctness-indicator"></i>
  //           <i id="question-${i}-wrong" class="fas fa-xmark text-danger correctness-indicator"></i>
  //         </div>
  //       </div>
  //   </div>
  //     `);
  // }
}

function refreshQuestionsList() {
  let questionaries = JSON.parse(localStorage.getItem("questionaries"));
  let urlParams = new URLSearchParams(window.location.search);
  let questionarieId = urlParams.get("questionarie-id");
  console.log("Rendering Questions for Questionarie: ", questionarieId);
  if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
    let questionarieObject = questionaries[questionarieId];
    console.log("Questions for Questionarie: ", questionarieId, questionarieObject["questions"]);
    for (const questionId in questionarieObject["questions"]) {
      console.log("Rendering Question ", questionId, " for questionarie ", questionarieId)
      console.log(questionarieObject["questions"]);
      //${}.append()
    // $("div#questions-list").append(`
    // <div id="question-col-${questionId}" class="col-sm-6 col-md-4">
    //     <div class="card text-center">
    //       <div class="card-header">Question 1</div>
    //       <div class="card-body">
    //         <table class="tableAlign">
    //           <thead>
    //             <td></td>
    //             <td>Carry</td>
    //             <td></td>
    //           </thead>
    //           <tbody>
    //             <tr>
    //               <td></td>
    //               <td class="text-end">
    //                 <input type="text" class="inputBox" />
    //               </td>
    //               <td></td>
    //             </tr>
    //             <tr>
    //               <td></td>
    //               <td class="text-center align-bottom"></td>
    //               <td class="text-center">6</td>
    //             </tr>
    //             <tr>
    //               <td class="text-center align-bottom">+</td>
    //               <td class="text-center align-bottom">1</td>
    //               <td class="text-center">4</td>
    //             </tr>
    //             <tr>
    //               <td></td>
    //               <td class="text-end align-items-end alignNumbers">
    //                 <input class="inputBox" type="text" />
    //               </td>
    //               <td class="alignNumbers">
    //                 <input class="inputBox" type="text" />
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>
    //         <br />
    //         <i id="question-${i}-correct" class="fas fa-check text-success correctness-indicator"></i>
    //         <i id="question-${i}-wrong" class="fas fa-xmark text-danger correctness-indicator"></i>
    //       </div>
    //     </div>
    // </div>
    //   `);
    }
  }
}

function initQuestionarie() {
  console.log("Initialize Test Name....");
  const publishEventCaptured = localStorage.getItem("isPublishBtnClicked");
  let publishEventClickCount = localStorage.getItem("publishEventClickCount");
  console.log(publishEventClickCount);
  if (publishEventCaptured) {
    createQuestionaries();
  }
}

function createQuestionaries() {
//   console.log("Creating test Paper grid on Admin Page");
//   const questionarieName = localStorage.getItem("testName");
//   console.log(questionarieName);
//   $("div#questionarie-grid")
//     .append(`<div class="row questionarie-row-${publishEventClickCount}">
//   <div class="col text-end">
//       <label><h2 class="px-4"> ${questionarieName} </h2></label>
//   </div>
//   <div class="col text-start">
//       <button id="open-score-record-btn" class="btn btn-info px-4 mb-2">Scores <i class="fas fa-star"></i></button>
//       <button id="open-edit-questionarie-btn" class="btn btn-success px-4 mb-2">Edit <i class="fas fa-edit"></i></button>
//       <button id="delete-questionarie-btn" class="btn btn-danger px-4 mb-2">Delete <i class="fas fa-trash-alt"></i></button>
//   </div>
// </div>`);

// $("div#test-paper-list").append(` <div class="row">
// <div class="col">
//     <label><h2 class="px-4">${questionarieName}</h2></label>
//     <button id="open-questionarie-btn" class="btn btn-success px-4 mb-2">Go <i class="fas fa-angle-double-right"></i></button>
// </div>
// </div>`);
}

function initQuestionsList() {
  const testName = localStorage.getItem("testName");
  console.log(testName);
  $("#add-heading-questionarie").text(testName);
  console.log($("add-heading-questionarie").text);
  var firstNumber = localStorage.getItem("firstNumber");
  console.log(firstNumber);
  var secondNumber = localStorage.getItem("secondNumber");
  console.log(secondNumber);
  var inputQuestionType = localStorage.getItem("questionType");
  var inputDigits = localStorage.getItem("noOfDigits");
  displayQuestions(inputDigits,firstNumber, secondNumber, inputQuestionType);
}

function displayQuestions(inputDigits,firstNum, secondNum, inputQuestionType) {
  let operationType;
  if(inputQuestionType === "Addition"){
    operationType = " + ";
  } else if(inputQuestionType === "Subtraction") {
    operationType = " - ";
  } else if(inputQuestionType === "Multiplication") {
    operationType = " x ";
  } else if(inputQuestionType === "Division"){
    operationType = " / ";
  }
  const ques = firstNum + operationType + secondNum + " = ? ";
  $("div#question-from-popup").append(`<div class="alignQuestions">
  <label>${ques}</label>
  </div>`);
}
