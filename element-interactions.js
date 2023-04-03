function initElements() {
  initQuestions();
  initQuestionarie();
  initQuestionsList();
}

function initQuestions() {
  createDummyQuestions();
  $("i.correctness-indicator").hide();
}

function createDummyQuestions() {
  console.log("Creating questions...");
  for (let i = 0; i <= 5; i++) {
    console.log("Creating question: ", i);
    $("div#questions-list").append(`
    <div id="question-col-${i}" class="col-sm-6 col-md-4">
        <div class="card text-center">
          <div class="card-header">Question 1</div>
          <div class="card-body">
            <table class="tableAlign">
              <thead>
                <td></td>
                <td>Carry</td>
                <td></td>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td class="text-end">
                    <input type="text" class="inputBox" />
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td class="text-center align-bottom">3</td>
                  <td class="text-center">6</td>
                </tr>
                <tr>
                  <td class="text-center align-bottom">+</td>
                  <td class="text-center align-bottom">1</td>
                  <td class="text-center">4</td>
                </tr>
                <tr>
                  <td></td>
                  <td class="text-end align-items-end alignNumbers">
                    <input class="inputBox" type="text" />
                  </td>
                  <td class="alignNumbers">
                    <input class="inputBox" type="text" />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <i id="question-${i}-correct" class="fas fa-check text-success correctness-indicator"></i>
            <i id="question-${i}-wrong" class="fas fa-xmark text-danger correctness-indicator"></i>
          </div>
        </div>
    </div>
      `);
  }
}

function initQuestionarie() {
  console.log("Initialize Test Name....");
  const publishEventCaptured = localStorage.getItem("isPublishBtnClicked");
  let publishEventClickCount = localStorage.getItem("publishEventClickCount");
  console.log(publishEventClickCount);
  if (publishEventCaptured) {
    // for(let i)
    createQuestionaries();
  }
}

function createQuestionaries() {
  console.log("Creating test Paper grid on Admin Page");
  const questionarieName = localStorage.getItem("testName");
  console.log(questionarieName);
  $("div#questionarie-grid")
    .append(`<div class="row questionarie-row-${publishEventClickCount}">
  <div class="col text-end">
      <label><h2 class="px-4"> ${questionarieName} </h2></label>
  </div>
  <div class="col text-start">
      <button id="open-score-record-btn" class="btn btn-info px-4 mb-2">Scores <i class="fas fa-star"></i></button>
      <button id="open-edit-questionarie-btn" class="btn btn-success px-4 mb-2">Edit <i class="fas fa-edit"></i></button>
      <button id="delete-questionarie-btn" class="btn btn-danger px-4 mb-2">Delete <i class="fas fa-trash-alt"></i></button>
  </div>
</div>`);

$("div#test-paper-list").append(` <div class="row">
<div class="col">
    <label><h2 class="px-4">${questionarieName}</h2></label>
    <button id="open-questionarie-btn" class="btn btn-success px-4 mb-2">Go <i class="fas fa-angle-double-right"></i></button>
</div>
</div>`);
}

function initQuestionsList() {
  const params = new URL(document.location).searchParams;
  console.log(params);
  //const questionType =params.get("inputQuestionType"); 
  const noOfDigits = params.get("numOfDigits");
  console.log(noOfDigits);
  const firstNum = params.get("firstNumber");
  console.log(firstNum);
  const secondNum = params.get("secondNumber");
  console.log(secondNum);
  const testName = localStorage.getItem("testName");
  console.log(testName);
  $("#add-heading-questionarie").text(testName);
  console.log($("add-heading-questionarie").text);
  const inputQuestionType = localStorage.getItem("questionType");
  displayQuestions(firstNum, secondNum, inputQuestionType);
}

function displayQuestions(firstNum, secondNum, inputQuestionType) {
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
