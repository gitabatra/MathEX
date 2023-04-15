function initElements() {
  initLocalStorage();
  initQuestions();
  //appendDataToQuestionarie();
  //initQuestionsList();
}

function initQuestions() {
  refreshQuestionarieList();
  refreshQuestionsList();
  refreshScoreRecord();
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
      <a href="#" key="${questionarieId}">
      <button id="delete-questionarie-btn" class="btn btn-danger px-4 mb-2">Delete <i class="fas fa-trash-alt"></i></button>
      <a>
     
  </div>
</div>`);
    } else {
      console.log("The following Id not found", questionarieId);
    }
  }
}


function appendQuestionsToList(popupData){
  let questionaries = JSON.parse(localStorage.getItem("questionaries"));
  let urlParams = new URLSearchParams(window.location.search);
  let questionarieId = urlParams.get("questionarie-id");
  let questionarieObject = questionaries[questionarieId];
  console.log("appending new Question Data to questionaries",questionarieObject["questions"]);
  let qlength = Object.keys(questionarieObject["questions"]).length;
  console.log("Question Keys", Object.keys(questionarieObject["questions"])[qlength-1]);
  console.log("Number of Questions in this list",qlength);
  qlength = Object.keys(questionarieObject["questions"])[qlength-1].slice(-1);
  //console.log("QLength --- : ", parseInt(qlength));
  let newQuestionKey = "q-20230405-0"+(parseInt(qlength)+1);
  console.log("New Question Key: ",newQuestionKey);
  console.log(questionaries[questionarieId].questions);

  questionarieObject["questions"][newQuestionKey] = popupData;
  console.log(questionarieObject["questions"][newQuestionKey]);

  Object.assign(questionaries[questionarieId], questionarieObject);
  console.log(questionaries[questionarieId]);

  localStorage.setItem("questionaries", JSON.stringify(questionaries));
  location.reload(true);
}


function refreshQuestionsList() {
  let questionaries = JSON.parse(localStorage.getItem("questionaries"));
  let urlParams = new URLSearchParams(window.location.search);
  let questionarieId = urlParams.get("questionarie-id");
  console.log("Rendering Questions for Questionarie: ", questionarieId);
  if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
    let questionarieObject = questionaries[questionarieId];
    $("#add-heading-questionarie").text(questionarieObject["name"]);
    console.log(
      "Questions for Questionarie: ",
      questionarieId,
      questionarieObject["questions"]
    );
    let countQuestion = 1;
    for (const questionId in questionarieObject["questions"]) {
      console.log(
        "Rendering Question ",
        questionId,
        " for questionarie ",
        questionarieId
      );
      console.log(
        "Number of Digits.... ",
        questionarieObject.questions[questionId].ndigit
      );
      let nDigits = questionarieObject.questions[questionId].ndigit;
      let firstNum = JSON.stringify(
        questionarieObject.questions[questionId].num1
      );
      let secondNum = JSON.stringify(
        questionarieObject.questions[questionId].num2
      );
      let questionType = questionarieObject.questions[questionId].type;
      //insertQuestionsForAdmin
      const ques = firstNum + " " + questionType + " " + secondNum + " = ? ";
      $("div#add-question-from-popupdata").append(`<div id="question-${questionId}" class="alignQuestions">
        ${ques} 
        
        <a id="delete-question-link" href="#" key="${questionId}" class="text-dark"><i class="fas fa-trash-alt ms-5"></i></a>   
    
      </div>`);

      if (nDigits === 1) {
        appendOneDigitQuestions(
          questionId,
          countQuestion,
          questionType,
          firstNum,
          secondNum
        );
      } else if (nDigits === 2) {
        appendTwoDigitQuestions(
          questionId,
          countQuestion,
          questionType,
          firstNum,
          secondNum
        );
      } else if (nDigits === 3) {
        //appendThreeDigitQuestions(questionId,countQuestion,questionType,firstNum,secondNum);
      } else if (nDigits === 4) {
        //appendFourDigitQuestions(questionId,countQuestion,questionType,firstNum,secondNum);
      }
      countQuestion = countQuestion + 1;
    }
  }
}

function checkQuestionarie() {
  let questionaries = JSON.parse(localStorage.getItem("questionaries"));
  let urlParams = new URLSearchParams(window.location.search);
  let questionarieId = urlParams.get("questionarie-id");
  console.log("Checking Questions for Questionarie: ", questionarieId);
  if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
    let questionarieObject = questionaries[questionarieId];
    console.log(
      "Questions for Questionarie: ",
      questionarieId,
      questionarieObject["questions"]
    );
    //let countQuestion =1;
    for (const questionId in questionarieObject["questions"]) {
      console.log(
        "Rendering Question ",
        questionId,
        " for questionarie ",
        questionarieId
      );
      console.log(
        "Number of Digits.... ",
        questionarieObject.questions[questionId].ndigit
      );
      let nDigits = questionarieObject.questions[questionId].ndigit;
      let firstNum = JSON.stringify(
        questionarieObject.questions[questionId].num1
      );
      let secondNum = JSON.stringify(
        questionarieObject.questions[questionId].num2
      );
      let questionType = questionarieObject.questions[questionId].type;
      //let givenAnswer = questionarieObject.questions[questionId].givenAns;
      let correctAnswer = parseInt(questionarieObject.questions[questionId].correctAns);
      let inputAnswer;
      if(nDigits === 1){
        inputAnswer = ($("#ones-digit-"+`${questionId}`).val().trim());
        questionarieObject.questions[questionId].givenAns = inputAnswer;
        inputAnswer = parseInt(questionarieObject.questions[questionId].givenAns);
        console.log();
      } else if(nDigits === 2){
        onesDigitAns = $("#ones-digit-"+`${questionId}`).val().trim();
        tensDigitAns = $("#tens-digit-"+`${questionId}`).val().trim();
        inputAnswer = parseInt(tensDigitAns+onesDigitAns);
        questionarieObject.questions[questionId].givenAns = inputAnswer;
      }
      if (inputAnswer === correctAnswer) {
        $("i#question-" + `${questionId}` + "-correct").show();
      } else {
        $("i#question-" + `${questionId}` + "-wrong").show();
      }
    }
  }
}

function refreshScoreRecord() {
  let questionaries = JSON.parse(localStorage.getItem("questionaries"));
  let urlParams = new URLSearchParams(window.location.search);
  let questionarieId = urlParams.get("questionarie-id");
  console.log("Initializing score record for Questionarie: ", questionarieId);
  if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
    let questionarieObject = questionaries[questionarieId];
    console.log(
      "Questions for Questionarie: ",
      questionarieId,
      questionarieObject["questions"]
    );
    //console.log("Questions for Questionarie: ", questionarieId, questionarieObject["questions"]);
    $("div#questionarie-score-record").append(`<div class="row gx-3 mt-3">
      <div class="col-sm-6 col-md-4">
        <h3>${questionarieObject["name"]}</h3>
      </div>
      <div class="col-sm-6 col-md-4">
        <a
          id="open-questionarie-score-btn"
          class="btn btn-dark ms-3 px-4"
          data-mdb-toggle="collapse"
          href="#questionarie-score-${questionarieId}"
          role="button"
          aria-expanded="false"
          aria-controls="questionarie-score-${questionarieId}"
        >
          Show results
        </a>
      </div>

      <!-- Collapsed content -->
      <div class="collapse mt-3" id="questionarie-score-${questionarieId}">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#collapse-questionarie-score"
                aria-expanded="true"
                aria-controls="collapse-questionarie-score"
              >
                Last Attempt #1
              </button>
            </h2>
            <div
              id="collapse-questionarie-score"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-mdb-parent="#accordionExample"
            >
              <div id="score-accordion-body-${questionarieId}" class="accordion-body">
              <div class="d-flex justify-content-end">
              <h5 class="">15 March 2023</h5>
              <h5 class="ms-5">Score - 2/2
                <div class="progress">
                  <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </h5>
            </div>
              </div>
        </div>
      </div>
    </div>
  </div>
</div>`);
    let countQuestion = 1;
    for (const questionId in questionarieObject["questions"]) {
      console.log(
        "Rendering Question ",
        questionId,
        " for questionarie ",
        questionarieId
      );
      console.log(
        "Number of Digits.... ",
        questionarieObject.questions[questionId].ndigit
      );
      let nDigits = questionarieObject.questions[questionId].ndigit;
      let firstNum = JSON.stringify(
        questionarieObject.questions[questionId].num1
      );
      let secondNum = JSON.stringify(
        questionarieObject.questions[questionId].num2
      );
      let questionType = questionarieObject.questions[questionId].type;
      let givenAnswer = questionarieObject.questions[questionId].givenAns;
      let correctAnswer = questionarieObject.questions[questionId].correctAns;
      let question =
        "Q" +
        countQuestion +
        ". " +
        firstNum +
        " " +
        questionType +
        " " +
        secondNum;
      console.log(question);
      console.log("Given Answer: ", givenAnswer);
      console.log("Correct Answer: ", correctAnswer);
      // if (givenAnswer === correctAnswer) {
      //   $("i#question-" + `${questionId}` + "-correct").show();
      // } else {
      //   $("i#question-" + `${questionId}` + "-wrong").show();
      // }
      $("div#score-accordion-body-" + `${questionarieId}`)
        .append(`<div class="row">
        <div class="col-4">${question}</div>
        <div class="col-4 correctAns">Coorect Answer - ${correctAnswer}</div>
        <div class="col-4 givenAns">
          Given Answer -  ${givenAnswer}
          <i id="question-${questionId}-correct" class="fas fa-check text-success correctness-indicator"></i>
          <i id="question-${questionId}-wrong" class="fas fa-xmark text-danger correctness-indicator"></i>
        </div>
      </div>`);
      countQuestion = countQuestion + 1;
    }
  }
}

function appendOneDigitQuestions(
  questionId,
  countQuestion,
  questionType,
  firstNum,
  secondNum
) {
  
  console.log("Appending one digit Questions----");
  console.log("questionId",questionId);
  let onesDigitFirstNum = firstNum;
  console.log("First Digit--- ",onesDigitFirstNum);
  let onesDigitSecondNum = secondNum;
  console.log("onesDigitSecondNum Digit--- ",onesDigitSecondNum);
  $("div#questions-list").append(`
    <div id="question-col-${questionId}" class="col-sm-6 col-md-4">
        <div class="card text-center">
          <div class="card-header">Question ${countQuestion}</div>
          <div class="card-body">
            <table class="tableAlign">
              <tbody>
              <tr>
                <td></td>
                <td class="text-center">${onesDigitFirstNum}</td>
              </tr>
              <tr>
                <td class="text-center align-bottom">${questionType}</td>
                <td class="text-center">${onesDigitSecondNum}</td>
              </tr>
              <tr>
                <td></td>
                <td class="text-end align-items-end alignNumbers">
                  <input id="ones-digit-${questionId}" class="inputBox" type="text" />
                </td>
              </tr>
            </tbody>
            </table>
            <br />
            <i id="question-${questionId}-correct" class="fas fa-check text-success correctness-indicator"></i>
            <i id="question-${questionId}-wrong" class="fas fa-xmark text-danger correctness-indicator"></i>
          </div>
        </div>
    </div>
      `);
}

function appendTwoDigitQuestions(
  questionId,
  countQuestion,
  questionType,
  firstNum,
  secondNum
) {
  let onesDigitFirstNum,
    tensDigitFirstNum,
    onesDigitSecondNum,
    tensDigitSecondNum;
  if (firstNum.length < 2) {
    tensDigitFirstNum = 0;
    onesDigitFirstNum = firstNum[0];
  } else {
    tensDigitFirstNum = firstNum[0];
    onesDigitFirstNum = firstNum[1];
  }
  console.log("FirstNumber OneDigit: ", onesDigitFirstNum);
  console.log("FirstNumber tensDigit: ", tensDigitFirstNum);
  if (secondNum.length < 2) {
    tensDigitSecondNum = 0;
    onesDigitSecondNum = secondNum[0];
  } else {
    tensDigitSecondNum = secondNum[0];
    onesDigitSecondNum = secondNum[1];
  }
  $("div#questions-list").append(`
    <div id="question-col-${questionId}" class="col-sm-6 col-md-4">
        <div class="card text-center">
          <div class="card-header">Question ${countQuestion}</div>
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
                  <td class="text-center align-bottom">${tensDigitFirstNum}</td>
                  <td class="text-center">${onesDigitFirstNum}</td>
                </tr>
                <tr>
                  <td class="text-center align-bottom">${questionType}</td>
                  <td class="text-center align-bottom">${tensDigitSecondNum}</td>
                  <td class="text-center">${onesDigitSecondNum}</td>
                </tr>
                <tr>
                  <td></td>
                  <td class="text-end align-items-end alignNumbers">
                    <input id="tens-digit-${questionId}" class="inputBox" type="text" />
                  </td>
                  <td class="alignNumbers">
                    <input id="ones-digit-${questionId}" class="inputBox" type="text" />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <i id="question-${questionId}-correct" class="fas fa-check text-success correctness-indicator"></i>
            <i id="question-${questionId}-wrong" class="fas fa-xmark text-danger correctness-indicator"></i>
          </div>
        </div>
    </div>
      `);
}

// function initQuestionarie() {
//   console.log("Initialize Test Name....");
//   const publishEventCaptured = localStorage.getItem("isPublishBtnClicked");
//   let publishEventClickCount = localStorage.getItem("publishEventClickCount");
//   console.log(publishEventClickCount);
//   if (publishEventCaptured) {
//     createQuestionaries();
//   }
// }
