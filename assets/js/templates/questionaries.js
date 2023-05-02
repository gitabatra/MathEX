function questionarieListItem(questionarieId, questionarieName, hideScoreButton) {
    return `<div id="questionarie-list-item-${questionarieId}" class="row">
        <div id="questionarie-list-col-${questionarieId}" class="col">
            <label><h2 class="px-4"> ${questionarieName} </h2></label>
            <a href="/studentQuestionary.html?questionarie-id=${questionarieId}">
            <button id="open-questionarie-btn-${questionarieId}" class="btn btn-success px-4 mb-2">Go <i class="fas fa-angle-double-right"></i></button>   
            </a>
            <a ${hideScoreButton} id="score-record-${questionarieId}" class="scoreCheckMsg" href="/score_record.html?questionarie-id=${questionarieId}">
            <button id="open-score-questionarie-btn-${questionarieId}" class="btn btn-info px-4 mb-2 score-indicator">Scores <i class="fas fa-star"></i></button>   
        </a>   
        </div>
    </div>`
}

function questionarieListItemAdmin(questionarieId, questionarieName){
    return `<div id="questionarie-grid-item-${questionarieId}" class="row">
    <div class="col text-end">
     <label><h2 class="px-4"> ${questionarieName} </h2></label>
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
    </div>`
}

function scoreRecord(questionarieId, questionarieName){
  return `<div id="score-record-${questionarieId}" class="row gx-3 mt-3">
  <div class="col-sm-6 col-md-4">
    <h3>${questionarieName}</h3>
  </div>
  <div class="col-sm-6 col-md-4">
    <a
      id="open-questionarie-score-btn"
      class="btn btn-dark ms-3 px-4"
      data-mdb-toggle="collapse"
      href="#questionarie-score-${questionarieId}"
      role="button"
      aria-expanded="true"
      aria-controls="questionarie-score-${questionarieId}"
    >
      Show results
    </a>
  </div>
  <div class="collapse mt-3" id="questionarie-score-${questionarieId}">
  <div class="accordion" id="accordion-${questionarieId}">
  
  </div>
  </div>
</div>`
}

function appendAttemptHeader(questionarieId,questionarieDate,score,attemptCount){
  return `<div class="accordion-item">
  <h2 class="accordion-header" id="heading-${attemptCount}">
    <button class="accordion-button collapsed" type="button" data-mdb-toggle="collapse" data-mdb-target="#collapse-questionarie-score-${attemptCount}" aria-expanded="false" aria-controls="collapse-questionarie-score-${attemptCount}">
      Last Attempt #${attemptCount}
    </button>
  </h2>
  <div id="collapse-questionarie-score-${attemptCount}" class="accordion-collapse collapse" aria-labelledby="heading-${attemptCount}" data-mdb-parent="#accordion-${questionarieId}">
    <div id="score-accordion-body-${attemptCount}" class="accordion-body">
    <div class="d-flex justify-content-end">
      <h5 id="date-questionarie-attempt-${attemptCount}" class="">${questionarieDate}</h5>
      <h5 id="score-${attemptCount}" class="ms-5">Score - ${score}
        <div class="progress">
           <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </h5>
    </div>
  </div>
</div>
</div>`
}


function appendScoreRecord(question,questionId,correctAnswer,givenAnswer){
  return `<div class="row">
  <div class="col-4">${question}</div>
  <div class="col-4 correctAns">Correct Answer - ${correctAnswer}</div>
  <div class="col-4 givenAns">
    Given Answer -  ${givenAnswer}
    <i id="question-${questionId}-correct" class="fas fa-check text-success"></i>
    <i id="question-${questionId}-wrong" class="fas fa-xmark text-danger"></i>
  </div>
</div>`
}

// function appendMultiplicationQuestions(questionId,countQuestion,questionType,firstNum,secondNum){
// return `<div id="question-col-${questionId}" class="col-sm-6 col-md-4">
// <div class="card text-center">
//     <div class="card-header">Question ${countQuestion}</div>
//     <div class="card-body">
//         <div class="col">
//             <div class="row mx-2">
//               <div class="col-sm-4"> </div>
//               <div class="col-sm-4 px-4 text-end">${firstNum}</div>
//             </div>
//             <div class="row mx-2">
//               <div class="col-sm-4 text-end px-0">${questionType}</i></div>
//               <div class="col-sm-4 px-4 text-end">${secondNum}</div>
//             </div>
//             <div class="row mx-2">
//               <div class="col-sm-4"> </div>
//               <div class="col-sm-4 px-1 text-end"><input id="given-answer-${questionId}" type="text" style="width:65px; text-align:center" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/></div>
//             </div>
//         </div><br />
//         <i id="question-${questionId}-correct" class="fas fa-check text-success correctness-indicator"></i>
//         <i id="question-${questionId}-wrong" class="fas fa-xmark text-danger correctness-indicator"></i>
//     </div>
//   </div>        
// </div>`
// }

function appendMultiplicationQuestions(questionId,countQuestion,questionType,firstNum,secondNum){
  return `<div id="question-col-${questionId}" class="col-sm-6 col-md-4">
  <div class="card text-center">
      <div class="card-header">Question ${countQuestion}</div>
      <div class="card-body">
          <div class="col text-center">
              <div class="row d-flex justify-content-center">
                <div class="col-auto mx-1"> </div>
                <div class="col-auto px-2 text-end numberBox">${firstNum}</div>
              </div>
              <div class="row d-flex justify-content-center">
                <div class="col-auto text-end mx-0">${questionType}</div>
                <div class="col-auto px-2 text-end numberBox">${secondNum}</div>
              </div>
              <div class="row d-flex justify-content-center">
                <div class="col-auto mx-1"> </div>
                <div class="col-auto px-0 text-end numberBox"><input id="given-answer-${questionId}" type="text" class="inputBox4digit" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/></div>
              </div>
          </div><br />
          <i id="question-${questionId}-correct" class="fas fa-check text-success correctness-indicator"></i>
          <i id="question-${questionId}-wrong" class="fas fa-xmark text-danger correctness-indicator"></i>
      </div>
    </div>        
  </div>`
  }

