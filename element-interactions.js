function initElements() {
  //initLocalStorage();
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

// function appendScoreBtnForQuestionarie(questionarieId){
//   console.log("Appending score button on finishing the test");
//   console.log("questionary: ",questionarieId);

//       $("div#questionarie-list-col-"+questionarieId).append(`
//               <a id="score-record-${questionarieId}" href="/score_record.html?questionarie-id=${questionarieId}">
//                 <button id="open-score-questionarie-btn-${questionarieId}" class="btn btn-info px-4 mb-2">Scores <i class="fas fa-star"></i></button>   
//               </a>     
//       `);

// }

function refreshQuestionarieList() {
  let questionaries = JSON.parse(localStorage.getItem("questionaries"));
  console.log("createQuestionaries: ", questionaries);

  for (const questionarieId in questionaries) {
    
    if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
     
      let questionarieObject = questionaries[questionarieId];
      $("div#questionarie-list").append(`
      <div id="questionarie-list-item-${questionarieId}" class="row">
          <div id="questionarie-list-col-${questionarieId}" class="col">
              <label><h2 class="px-4"> ${questionarieObject["name"]} </h2></label>
              <a href="/studentQuestionary.html?questionarie-id=${questionarieId}">
                <button id="open-questionarie-btn-${questionarieId}" class="btn btn-success px-4 mb-2">Go <i class="fas fa-angle-double-right"></i></button>   
              </a>
              <a id="score-record-${questionarieId}" href="/score_record.html?questionarie-id=${questionarieId}">
              <button id="open-score-questionarie-btn-${questionarieId}" class="btn btn-info px-4 mb-2">Scores <i class="fas fa-star"></i></button>   
            </a>   
            
          </div>
      </div>
      `);

      // //Hide Score button initially
      // $("button#open-score-questionarie-btn-"+questionarieId).hide();
      // //$("button#open-score-questionarie-btn-"+questionarieId).prop("disabled",true);
      // //$("a#score-record-"+questionarieId).addClass('disabled');

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
  console.log("questionarieId",questionarieId);
  let questionarieObject = questionaries[questionarieId];
  console.log("appending new Question Data to questionaries",questionarieObject["questions"]);
  let qlength = Object.keys(questionarieObject["questions"]).length;
  console.log("Question Keys", Object.keys(questionarieObject["questions"])[qlength-1]);
  console.log("Number of Questions in this list",qlength);
  if(qlength>0){qlength = Object.keys(questionarieObject["questions"])[qlength-1].slice(-1);}
  
  //console.log("QLength --- : ", parseInt(qlength));
  let newQuestionKey = "q-20230405-0"+(parseInt(qlength)+1);
  console.log("New Question Key: ",newQuestionKey);
  console.log(questionaries[questionarieId].questions);

  questionarieObject["questions"][newQuestionKey] = popupData;
  console.log(questionarieObject["questions"][newQuestionKey]);

  Object.assign(questionaries[questionarieId], questionarieObject);
  console.log(questionaries[questionarieId]);

  localStorage.setItem("questionaries", JSON.stringify(questionaries));
 // $("#popup-form").attr("action","./addQuestions.html?questionarie-id="+questionarieId);
  window.location.href = "./addQuestions.html?questionarie-id="+questionarieId;
  //location.reload(true);

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
      }else {
        appendQuestions(
              questionId,
              countQuestion,
              nDigits,
              questionType,
              firstNum,
              secondNum
            );
      } 
      // } else if (nDigits === 2) {
      //   appendTwoDigitQuestions(
      //     questionId,
      //     countQuestion,
      //     questionType,
      //     firstNum,
      //     secondNum
      //   );
      // } else if (nDigits === 3) {
      //   //appendThreeDigitQuestions(questionId,countQuestion,questionType,firstNum,secondNum);
      // } else if (nDigits === 4) {
      //   //appendFourDigitQuestions(questionId,countQuestion,questionType,firstNum,secondNum);
      // }
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

    let totalQuestions = Object.keys(questionarieObject["questions"]).length;
    console.log("Total questions: ",totalQuestions);
    let correctCount =0;
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
      let correctAnswer = parseInt(questionarieObject.questions[questionId].correctAns);
      let inputAnswer;
      if(nDigits === 1){
        inputAnswer = parseInt($("#ones-digit-"+`${questionId}`).val().trim());
        console.log("Given Answer: ",inputAnswer);
        Object.assign(questionaries[questionarieId]["questions"][questionId], {
          givenAns: inputAnswer
        });
        
        localStorage.setItem("questionaries", JSON.stringify(questionaries));
        console.log("Question: ", questionaries[questionarieId]);
      } else if(nDigits === 2){
        onesDigitAns = $("#ones-digit-"+`${questionId}`).val().trim();
        tensDigitAns = $("#tens-digit-"+`${questionId}`).val().trim();
        inputAnswer = parseInt(tensDigitAns+onesDigitAns);
        questionarieObject.questions[questionId].givenAns = inputAnswer;
      }
      if (inputAnswer === correctAnswer) {
        correctCount = correctCount + 1;
        $("i#question-" + `${questionId}` + "-correct").show();
        $("i#question-" + `${questionId}` + "-wrong").hide();
      } else {
        $("i#question-" + `${questionId}` + "-wrong").show();
        $("i#question-" + `${questionId}` + "-correct").hide();
      }
    }
    console.log("Coorect Questions: ",correctCount);
    Object.assign(questionaries[questionarieId], {
      score: correctCount+" / "+ totalQuestions 
    });
    
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
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

function appendQuestions(
  questionId,
  countQuestion,
  nDigits,
  questionType,
  firstNum,
  secondNum
) {
  console.log("Appending Questions...............");
  let onesDigitFirstNum,
    tensDigitFirstNum,
    hundredDigitFirstNum,
    thousandDigitFirstNum,
    onesDigitSecondNum,
    tensDigitSecondNum,
    hundredDigitSecondNum,
    thousandDigitSecondNum;

    let firstNumLength = firstNum.length;
    let secondNumLength = secondNum.length;

    if(firstNumLength==1){
      thousandDigitFirstNum="";
      hundredDigitFirstNum="";
      tensDigitFirstNum ="";
      onesDigitFirstNum = firstNum[0];
    } else if (firstNumLength == 2){
      thousandDigitFirstNum="";
      hundredDigitFirstNum="";
      tensDigitFirstNum = firstNum[0];
      onesDigitFirstNum = firstNum[1];  
    } else if (firstNumLength == 3){
      thousandDigitFirstNum="";
      hundredDigitFirstNum=firstNum[0];
      tensDigitFirstNum = firstNum[1];
      onesDigitFirstNum = firstNum[2];
    } else {
      thousandDigitFirstNum=firstNum[0];
      hundredDigitFirstNum=firstNum[1];
      tensDigitFirstNum = firstNum[2];
      onesDigitFirstNum = firstNum[3];
    }
    console.log("thousand: ",thousandDigitFirstNum, "hundred: ", hundredDigitFirstNum, "tens: ",tensDigitFirstNum, "ones: ", onesDigitFirstNum);

    if(secondNumLength==1){
      thousandDigitSecondNum="";
      hundredDigitSecondNum="";
      tensDigitSecondNum ="";
      onesDigitSecondNum = secondNum[0];
    } else if (secondNumLength == 2){
      thousandDigitSecondNum="";
      hundredDigitSecondNum="";
      tensDigitSecondNum = secondNum[0];
      onesDigitSecondNum = secondNum[1];
    } else if (secondNumLength == 3){
      thousandDigitSecondNum="";
      hundredDigitSecondNum=secondNum[0];
      tensDigitSecondNum =secondNum[1];
      onesDigitSecondNum = secondNum[2];
    } else {
      thousandDigitSecondNum=secondNum[0];
      hundredDigitSecondNum=secondNum[1];
      tensDigitSecondNum =secondNum[2];
      onesDigitSecondNum = secondNum[3];
    }
    console.log("thousand: ",thousandDigitSecondNum, "hundred: ", hundredDigitSecondNum, "tens: ",tensDigitSecondNum, "ones: ", onesDigitSecondNum);

  $("div#questions-list").append(`
    <div id="question-col-${questionId}" class="col-sm-6 col-md-4">
        <div class="card text-center">
          <div class="card-header">Question ${countQuestion}</div>
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
                  <td class="text-end mx-0 px-0"><input id="carry-input-thousand-${questionId}" type="text" class="inputBox" /></td>
                  <td class="text-end mx-0 px-0"><input id="carry-input-hundred-${questionId}" type="text" class="inputBox" /></td>
                  <td class="text-end mx-0 px-0">
                    <input id="carry-input-tens-${questionId}" type="text" class="inputBox" />
                  </td>
                  <td class="text-end mx-0 px-0"><input id="carry-input-ones-${questionId}" type="text" class="inputBox" /></td>
                  
                </tr>
                <tr>
                  <td></td>
                  <td class="text-center align-bottom">${thousandDigitFirstNum}</td>
                  <td class="text-center align-bottom">${hundredDigitFirstNum}</td>
                  <td class="text-center align-bottom">${tensDigitFirstNum}</td>
                  <td class="text-center">${onesDigitFirstNum}</td>
                </tr>
                <tr>
                  <td class="text-center align-bottom">${questionType}</td>
                  <td class="text-center align-bottom">${thousandDigitSecondNum}</td>
                  <td class="text-center align-bottom">${hundredDigitSecondNum}</td>
                  <td class="text-center align-bottom">${tensDigitSecondNum}</td>
                  <td class="text-center">${onesDigitSecondNum}</td>
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
      // if(nDigits == 2){

      // }
      
      if(questionType == "+"){
        $("input#carry-input-ones-" + `${questionId}`).hide();
        if((onesDigitFirstNum+onesDigitSecondNum)<9){
          console.log("Ones Digit total is greater than 9");
          //carry-input-${questionId}
          $("input#carry-input-tens-" + `${questionId}`).hide();
          $("td#carry-text-" + `${questionId}`).hide();
        }else{
          $("input#carry-input-tens-" + `${questionId}`).show();
          $("td#carry-text-" + `${questionId}`).show();
        }
      } else if(questionType == "-"){
        console.log("Subtraction Questionarie");
        console.log("digits : ",onesDigitFirstNum,onesDigitSecondNum);
        $("td#carry-text-" + `${questionId}`).text("");
        
        if(onesDigitFirstNum >= onesDigitSecondNum){
          console.log(onesDigitFirstNum+"is greater than"+onesDigitSecondNum);
          $("input#carry-input-ones-" + `${questionId}`).hide();
        }else{
          $("input#carry-input-ones-" + `${questionId}`).show();
        }
      }
      
}

// function appendTwoDigitQuestions(
//   questionId,
//   countQuestion,
//   questionType,
//   firstNum,
//   secondNum
// ) {
//   let onesDigitFirstNum,
//     tensDigitFirstNum,
//     onesDigitSecondNum,
//     tensDigitSecondNum;
//   if (firstNum.length < 2) {
//     tensDigitFirstNum = "";
//     onesDigitFirstNum = firstNum[0];
//   } else {
//     tensDigitFirstNum = firstNum[0];
//     onesDigitFirstNum = firstNum[1];
//   }
//   console.log("FirstNumber OneDigit: ", onesDigitFirstNum);
//   console.log("FirstNumber tensDigit: ", tensDigitFirstNum);
//   if (secondNum.length < 2) {
//     tensDigitSecondNum = "";
//     onesDigitSecondNum = secondNum[0];
//   } else {
//     tensDigitSecondNum = secondNum[0];
//     onesDigitSecondNum = secondNum[1];
//   }
//   $("div#questions-list").append(`
//     <div id="question-col-${questionId}" class="col-sm-6 col-md-4">
//         <div class="card text-center">
//           <div class="card-header">Question ${countQuestion}</div>
//           <div class="card-body">
//             <table class="tableAlign">
//               <thead>
//                 <td></td>
//                 <td id="carry-text-${questionId}">Carry</td>
//                 <td id="carry-text-${questionId}">Carry</td>
//                 <td></td>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td></td>
//                   <td class="text-end">
//                   <td><input id="carry-input-hundreds-${questionId}" type="text" class="inputBox" /></td>
//                     <input id="carry-input-tens-${questionId}" type="text" class="inputBox" />
//                   </td>
//                   <td><input id="carry-input-ones-${questionId}" type="text" class="inputBox" /></td>
                  
//                 </tr>
//                 <tr>
//                   <td></td>
//                   <td class="text-center align-bottom">${hundredDigitFirstNum}</td>
//                   <td class="text-center align-bottom">${tensDigitFirstNum}</td>
//                   <td class="text-center">${onesDigitFirstNum}</td>
//                 </tr>
//                 <tr>
//                   <td class="text-center align-bottom">${questionType}</td>
//                   <td class="text-center align-bottom">${hundredDigitSecondNum}</td>
//                   <td class="text-center align-bottom">${tensDigitSecondNum}</td>
//                   <td class="text-center">${onesDigitSecondNum}</td>
//                 </tr>
//                 <tr>
//                   <td></td>
//                   <td class="text-end align-items-end alignNumbers">
//                     <input id="hundred-digit-${questionId}" class="inputBox" type="text" />
//                   </td>
//                   <td class="text-end align-items-end alignNumbers">
//                     <input id="tens-digit-${questionId}" class="inputBox" type="text" />
//                   </td>
//                   <td class="alignNumbers">
//                     <input id="ones-digit-${questionId}" class="inputBox" type="text" />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <br />
//             <i id="question-${questionId}-correct" class="fas fa-check text-success correctness-indicator"></i>
//             <i id="question-${questionId}-wrong" class="fas fa-xmark text-danger correctness-indicator"></i>
//           </div>
//         </div>
//     </div>
//       `);
      
//       if(questionType == "+"){
//         $("input#carry-input-ones-" + `${questionId}`).hide();
//         if((onesDigitFirstNum+onesDigitSecondNum)<9){
//           console.log("Ones Digit total is greater than 9");
//           //carry-input-${questionId}
//           $("input#carry-input-tens-" + `${questionId}`).hide();
//           $("td#carry-text-" + `${questionId}`).hide();
//         }else{
//           $("input#carry-input-tens-" + `${questionId}`).show();
//           $("td#carry-text-" + `${questionId}`).show();
//         }
//       } else if(questionType == "-"){
//         console.log("Subtraction Questionarie");
//         console.log("digits : ",onesDigitFirstNum,onesDigitSecondNum);
//         $("td#carry-text-" + `${questionId}`).text("");
        
//         if(onesDigitFirstNum >= onesDigitSecondNum){
//           console.log(onesDigitFirstNum+"is greater than"+onesDigitSecondNum);
//           $("input#carry-input-ones-" + `${questionId}`).hide();
//         }else{
//           $("input#carry-input-ones-" + `${questionId}`).show();
//         }
//       }
      
// }

// function initQuestionarie() {
//   console.log("Initialize Test Name....");
//   const publishEventCaptured = localStorage.getItem("isPublishBtnClicked");
//   let publishEventClickCount = localStorage.getItem("publishEventClickCount");
//   console.log(publishEventClickCount);
//   if (publishEventCaptured) {
//     createQuestionaries();
//   }
// }
