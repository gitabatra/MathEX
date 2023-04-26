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
  let questionaries = JSON.parse(localStorage.getItem("questionaries"));
  console.log("createQuestionaries: ", questionaries);

  for (const questionarieId in questionaries) {
    if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
      let questionarieObject = questionaries[questionarieId];
      //let hide_score_button = (('score' in questionarieObject)  &&(questionarieObject["score"] == "") ) ? "" : "hidden";
      console.log("questionary object: ",questionarieObject,"published: ",questionarieObject["isQuestionariePublished"]);
      if (!(questionarieObject.isQuestionariePublished)) {
        console.log("Publish button is not clicked.........................");
      } else {
        console.log(
          "Publishquestionarie set to :",
          questionarieObject.isQuestionariePublished
        );
        let hide_score_button =
          questionarieObject["score"] == "" ? "hidden" : "";
        $("div#questionarie-list").append(`
      <div id="questionarie-list-item-${questionarieId}" class="row">
          <div id="questionarie-list-col-${questionarieId}" class="col">
              <label><h2 class="px-4"> ${questionarieObject["name"]} </h2></label>
              <a href="/studentQuestionary.html?questionarie-id=${questionarieId}">
                <button id="open-questionarie-btn-${questionarieId}" class="btn btn-success px-4 mb-2">Go <i class="fas fa-angle-double-right"></i></button>   
              </a>
              <a ${hide_score_button} id="score-record-${questionarieId}" class="scoreCheckMsg" href="/score_record.html?questionarie-id=${questionarieId}">
              <button id="open-score-questionarie-btn-${questionarieId}" class="btn btn-info px-4 mb-2 score-indicator">Scores <i class="fas fa-star"></i></button>   
            </a>   
            
          </div>
      </div>
      `);
    }
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

//Appending questions to Questionarie by taking input from pop up

function appendNewQuestionToList(popupData) {
  let questionaries = JSON.parse(localStorage.getItem("questionaries"));
  let urlParams = new URLSearchParams(window.location.search);
  let questionarieId = urlParams.get("questionarie-id");
  console.log("questionarieId", questionarieId);
  let questionarieObject = questionaries[questionarieId];
  console.log(
    "appending new Question Data to questionaries",
    questionarieObject["questions"]
  );
  let qlength = Object.keys(questionarieObject["questions"]).length;
  console.log("Question Length: ",qlength);
  console.log(
    "Question Keys",
    Object.keys(questionarieObject["questions"])[qlength - 1]
  );

  if(qlength>0){
    qlength = Object.keys(questionarieObject["questions"])[qlength - 1].substring(12);
  }
  
  console.log("Number of Questions in this list", qlength);
  console.log("QLength --- : ", parseInt(qlength));
  let newQuestionKey = "q-20230405-0" + (parseInt(qlength) + 1);
  console.log("New Question Key: ", newQuestionKey);
  console.log(questionaries[questionarieId].questions);

  questionarieObject["questions"][newQuestionKey] = popupData;
  console.log(questionarieObject["questions"][newQuestionKey]);

  console.log("PopUpData Number 1: ",popupData.num1,"Number 2: ", popupData.num2);

  appendQuestionForAdmin(newQuestionKey, popupData.type, popupData.num1, popupData.num2);

  Object.assign(questionaries[questionarieId], questionarieObject);
  console.log(questionaries[questionarieId]);

  localStorage.setItem("questionaries", JSON.stringify(questionaries));
}


//Refresh QuestionList
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
      let firstNum = JSON.stringify(questionarieObject.questions[questionId].num1);
      let secondNum = JSON.stringify(questionarieObject.questions[questionId].num2);
      let questionType = questionarieObject.questions[questionId].type;
      console.log("First Number: ",firstNum,"Second Number: ",secondNum);
      //insert Questions for Admin
      appendQuestionForAdmin(questionId, questionType, firstNum, secondNum);
    
      //insert Questions for Student
      appendQuestionsForStudent(
        questionId,
        countQuestion,
        nDigits,
        questionType,
        firstNum,
        secondNum
      );
      countQuestion = countQuestion + 1;
      }
      
   // }
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


//Checking Questionarie for Student to prepare result
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

    let totalQuestions = Object.keys(questionarieObject["questions"]).length;
    console.log("Total questions: ", totalQuestions);
    let correctCount = 0;
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
      // let nDigits = questionarieObject.questions[questionId].ndigit;
      // let firstNum = JSON.stringify(
      //   questionarieObject.questions[questionId].num1
      // );
      // let secondNum = JSON.stringify(
      //   questionarieObject.questions[questionId].num2
      // );
      // let questionType = questionarieObject.questions[questionId].type;
      let correctAnswer = parseInt(
        questionarieObject.questions[questionId].correctAns
      );
      let inputAnswer = 0;
        onesDigitAns = $("#ones-digit-" + `${questionId}`)
          .val()
          .trim();
        console.log("One Digit: ",onesDigitAns);

        tensDigitAns = $("#tens-digit-" + `${questionId}`)
          .val()
          .trim();
        console.log("Tens Digit: ",tensDigitAns);

        hundredDigitAns = $("#hundred-digit-" + `${questionId}`)
          .val()
          .trim();
        console.log("Hundred Digit: ",hundredDigitAns);
        
        thousandDigitAns = $("#thousand-digit-" + `${questionId}`)
          .val()
          .trim();
        console.log("Thousand Digit: ",thousandDigitAns);

        inputAnswer = parseInt(
          thousandDigitAns + hundredDigitAns + tensDigitAns + onesDigitAns
        );

      if (isNaN(inputAnswer) || inputAnswer == null) {
        inputAnswer = "";
      }
      questionarieObject.questions[questionId].givenAns = inputAnswer;
      console.log("Given Answer: ", inputAnswer);

      if (inputAnswer === correctAnswer) {
        correctCount = correctCount + 1;
        $("i#question-" + `${questionId}` + "-correct").show();
        $("i#question-" + `${questionId}` + "-wrong").hide();
      } else {
        $("i#question-" + `${questionId}` + "-wrong").show();
        $("i#question-" + `${questionId}` + "-correct").hide();
      }
      Object.assign(questionaries[questionarieId]["questions"][questionId], {
        givenAns: inputAnswer,
      });

      console.log("Question: ", questionaries[questionarieId]);
    }
    console.log("Correct Questions: ", correctCount);
    Object.assign(questionaries[questionarieId], {
      score: correctCount + " / " + totalQuestions,
    });

    localStorage.setItem("questionaries", JSON.stringify(questionaries));
  }
}

//Score -Record
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
              <h5 id="date-questionarie-attempt-${questionarieId}" class="">${questionaries[questionarieId].dateQuestionarie}</h5>
              <h5 id="score-${questionarieId}" class="ms-5">Score - ${questionaries[questionarieId].score}
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
      let firstNum = questionarieObject.questions[questionId].num1;
      let secondNum = questionarieObject.questions[questionId].num2;
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
      console.log("Given Answer: ", givenAnswer,"Correct Answer: ", correctAnswer);

      $("div#score-accordion-body-" + `${questionarieId}`)
        .append(`<div class="row">
        <div class="col-4">${question}</div>
        <div class="col-4 correctAns">Correct Answer - ${correctAnswer}</div>
        <div class="col-4 givenAns">
          Given Answer -  ${givenAnswer}
          <i id="question-${questionId}-correct" class="fas fa-check text-success"></i>
          <i id="question-${questionId}-wrong" class="fas fa-xmark text-danger"></i>
        </div>
      </div>`);
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
  }
}

// Append Questions to Student Questionarie
function appendQuestionsForStudent(
  questionId,
  countQuestion,
  nDigits,
  questionType,
  firstNum,
  secondNum
) {
  console.log("Appending Questions...............");
  console.log("First No: ",firstNum,"type of first no: ",typeof(firstNum));

  let firstNumLength = firstNum.length;
  let secondNumLength = secondNum.length;
  let firstNumber = getDigits(firstNumLength,firstNum);
  let secondNumber = getDigits(secondNumLength,secondNum);

  $("div#questions-list").append(`
    <div id="question-col-${questionId}" class="col-sm-6 col-md-4">
        <div class="card text-center">
          <div class="card-header">Question ${countQuestion}</div>
          <div id="borrow-subtraction" class="ui-widget-content">
                  <i  id="" class="fas fa-sm fa-slash draggable"></i>
                  <i  id="" class="fas fa-sm fa-slash draggable"></i>
                  <i  id="" class="fas fa-sm fa-slash draggable"></i>
                  <i  id="" class="fas fa-sm fa-slash draggable"></i>
          </div>

          <div class="card-body">
            <table class="tableAlign">
              <thead>
                <td></td>
                <td id="carry-text-${questionId}"></td>
                <td id="carry-text-${questionId}"></td>
                <td id="carry-text-${questionId}"></td>
                <td></td>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td class="text-end mx-0 px-0"><input id="carry-input-thousand-${questionId}" type="text" class="inputBox"/></td>
                  <td class="text-end mx-0 px-0"><input id="carry-input-hundred-${questionId}" type="text" class="inputBox"/></td>
                  <td class="text-end mx-0 px-0">
                  <input id="carry-input-tens-${questionId}" type="text" class="inputBox"/>
                  </td>
                  <td class="text-end mx-0 px-0"><input id="carry-input-ones-${questionId}" type="text" class="inputBox"/></td>
                  
                </tr>
                <tr>
                  <td></td>
                  <td class="text-center align-bottom">${firstNumber.thousandDigit}</td>
                  <td class="text-center align-bottom">${firstNumber.hundredDigit}</td>
                  <td class="text-center align-bottom">${firstNumber.tensDigit}</td>
                  <td class="text-center">${firstNumber.onesDigit}</td>
                </tr>
                <tr>
                  <td class="text-center align-bottom">${questionType}</td>
                  <td class="text-center align-bottom">${secondNumber.thousandDigit}</td>
                  <td class="text-center align-bottom">${secondNumber.hundredDigit}</td>
                  <td class="text-center align-bottom">${secondNumber.tensDigit}</td>
                  <td class="text-center">${secondNumber.onesDigit}</td>
                </tr>
                <tr>
                <tr>
                  <td></td>
                  <td class="text-end mx-0 px-0">
                  <input id="thousand-digit-${questionId}" class="inputBox" type="text" />
                </td>
                  <td class="text-end mx-0 px-0">
                    <input id="hundred-digit-${questionId}" class="inputBox" type="text" />
                  </td>
                  <td class="text-end mx-0 px-0">
                    <input id="tens-digit-${questionId}" class="inputBox" type="text" />
                  </td>
                  <td class="mx-0 px-0">
                    <input id="ones-digit-${questionId}" class="inputBox" type="text" />
                  </td>
                  </tr>
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

  $(".draggable").draggable({ cancel: null });
  $("div#borrow-subtraction").hide();
  
  hideInputBoxForDigits(questionId, nDigits);
  

  // if(questionType == "+"){
  //   $("input#carry-input-ones-" + `${questionId}`).hide();
  //   if((onesDigitFirstNum+onesDigitSecondNum)<9){
  //     console.log("Ones Digit total is greater than 9");
  //     //carry-input-${questionId}
  //     $("input#carry-input-tens-" + `${questionId}`).hide();
  //     $("td#carry-text-" + `${questionId}`).hide();
  //   }else{
  //     $("input#carry-input-tens-" + `${questionId}`).show();
  //     $("td#carry-text-" + `${questionId}`).show();
  //   }
  // } else if(questionType == "-"){
  //   console.log("Subtraction Questionarie");
  //   console.log("digits : ",onesDigitFirstNum,onesDigitSecondNum);
  //   $("td#carry-text-" + `${questionId}`).text("");

  //   if(onesDigitFirstNum >= onesDigitSecondNum){
  //     console.log(onesDigitFirstNum+"is greater than"+onesDigitSecondNum);
  //     $("input#carry-input-ones-" + `${questionId}`).hide();
  //   }else{
  //     $("input#carry-input-ones-" + `${questionId}`).show();
  //   }
  // }
}

//Get Digits from input Number
function getDigits(numberLength,number){
  let numberObj = {thousandDigit:"", hundredDigit:"", tensDigit:"", onesDigit:""};

  if (numberLength == 1) {
    numberObj.onesDigit = number[0];
  } else if (numberLength == 2) {
    numberObj.tensDigit = number[0];
    numberObj.onesDigit = number[1];
  } else if (numberLength == 3) {
    numberObj.hundredDigit = number[0];
    numberObj.tensDigit = number[1];
    numberObj.onesDigit = number[2];
  } else {
    numberObj.thousandDigit = number[0];
    numberObj.hundredDigit = number[1];
    numberObj.tensDigit = number[2];
    numberObjonesDigit = number[3];
  }
  return (numberObj);
}

function hideInputBoxForDigits(questionId, nDigits) {
  console.log("Hiding input Box for each question is executing.......");
  console.log("Question Id",questionId,"No. of Digits: ",nDigits);
  $("input#carry-input-thousand-" + `${questionId}`).hide();
  $("input#carry-input-hundred-" + `${questionId}`).hide();
  $("input#carry-input-tens-" + `${questionId}`).hide();
  $("input#carry-input-ones-" + `${questionId}`).hide();

  $("input#thousand-digit-" + `${questionId}`).hide();
  $("input#hundred-digit-" + `${questionId}`).hide();
  $("input#tens-digit-" + `${questionId}`).hide();
  $("input#ones-digit-" + `${questionId}`).hide();
  if (nDigits == 1) {
    $("input#ones-digit-" + `${questionId}`).show();
  } else if (nDigits == 2) {
    $("input#carry-input-tens-" + `${questionId}`).show();
    $("input#carry-input-ones-" + `${questionId}`).show();

    $("input#ones-digit-" + `${questionId}`).show();
    $("input#tens-digit-" + `${questionId}`).show();
  } else if (nDigits == 3) {
    $("input#carry-input-tens-" + `${questionId}`).show();
    $("input#carry-input-ones-" + `${questionId}`).show();
    $("input#carry-input-hundred-" + `${questionId}`).show();

    $("input#ones-digit-" + `${questionId}`).show();
    $("input#tens-digit-" + `${questionId}`).show();
    $("input#hundred-digit-" + `${questionId}`).show();
  } else {
    $("input#carry-input-thousand-" + `${questionId}`).show();
    $("input#carry-input-hundred-" + `${questionId}`).show();
    $("input#carry-input-tens-" + `${questionId}`).show();
    $("input#carry-input-ones-" + `${questionId}`).show();

    $("input#thousand-digit-" + `${questionId}`).show();
    $("input#hundred-digit-" + `${questionId}`).show();
    $("input#tens-digit-" + `${questionId}`).show();
    $("input#ones-digit-" + `${questionId}`).show();
  }
}
