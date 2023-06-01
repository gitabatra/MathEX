
function appendQuestionsToStudentQuestionary(questionId,countQuestion,questionType){
  return`<div id="question-col-${questionId}" class="col-sm-6 col-md-12 col-lg-6 col-xl-4">
  <div class="card text-center">
    <div class="card-header">Question ${countQuestion}</div>
    <div class="card-body">
      <table class="tableAlign">
        <tbody>
          <tr id="first-number-${questionId}">
          <td class="text-center align-bottom"></td>  
          </tr>
          <tr id="second-number-${questionId}"> 
          <td class="text-center align-bottom">${questionType}</td>
          </tr>
          <tr id="answer-input-box-${questionId}">
          
          </tr>
        </tbody>
      </table>
      <br />
      <i id="question-${questionId}-correct" class="fas fa-check text-success correctness-indicator"></i>
      <i id="question-${questionId}-wrong" class="fas fa-xmark text-danger correctness-indicator"></i>
    </div>
  </div>
</div>`
}


  function appendMultiplicationQuestionsStudentQuestionary(questionId,countQuestion,questionType){
    return(`<div id="question-col-${questionId}" class="col-sm-6 col-md-12 col-lg-6 col-xl-4">
    <div class="card text-center w-100">
    <div class="card-header">Question ${countQuestion}</div>
    <div class="card-body table-responsive-sm">
      <table class="tableAlign">
        <tbody id="multiplication-questionarie-table-${questionId}">
          <tr id="first-number-${questionId}">
            <td class="text-center align-bottom"></td>
          </tr>  
          <tr id="second-number-${questionId}"> 
            <td class="text-center align-bottom">${questionType}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <i id="question-${questionId}-correct" class="fas fa-check text-success correctness-indicator"></i>
      <i id="question-${questionId}-wrong" class="fas fa-xmark text-danger correctness-indicator"></i>
    </div>
  </div>
  </div>
`)
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
  