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
  <div class="d-flex flex-wrap flex-column flex-md-row  align-content-sm-center justify-content-md-evenly justify-content-lg-between">
  <div class="col text-center">
   <label><h2 class="px-4"> ${questionarieName} </h2></label>
 </div>
  <div class="col text-center">
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
  </div>
  </div>`
}


  function appendDivisionQuestions(questionId,countQuestion,firstNum,secondNum,correctAnswerObj){
    return `<div id="question-col-${questionId}" class="col-sm-6 col-md-12 col-lg-6 col-xl-4">
    <div class="card text-center">
      <div class="card-header">Question ${countQuestion}</div>
      <div class="card-body">
          <div class="col text-center">
              <div class="row mx-2 d-flex justify-content-center">
                <div class="col-auto mx-0">${firstNum}</div>
                <div class="col-auto mx-0"><i class="fas fa-divide"></i></div>
                <div class="col-auto mx-0">${secondNum}</div>
                <div class="col-auto mx-0">=</div>
                <div class="col-auto px-0 text-end numberBox"><input id="given-answer-${questionId}" type="text" class="inputDivisionBox" maxlength="${(correctAnswerObj["quotient"].toString().length)}" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/></div>
              </div>
              <br>
              <div class="row mx-2 d-flex justify-content-center"></div>
              <div class="row mx-2 d-flex justify-content-center">
                <div class="col-auto text-end mx-0">Remainder</div>
                <div class="col-auto mx-0 text-end numberBox">=</div>
                <div class="col-auto px-0 text-end numberBox"><input id="given-answer-remainder-${questionId}" type="text" class="inputRemainderBox" maxlength="${(correctAnswerObj["remainder"].toString().length)}" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/></div>
              </div>
              
          </div><br />
          <i id="question-${questionId}-correct" class="fas fa-check text-success correctness-indicator"></i>
          <i id="question-${questionId}-wrong" class="fas fa-xmark text-danger correctness-indicator"></i>
      </div>
    </div>        
  </div>`
    }
