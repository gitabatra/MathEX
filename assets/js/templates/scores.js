function scoreRecord(questionarieId, questionarieName){
    return `<div id="score-record-${questionarieId}" class="row gx-3 mt-3">
    <div class="d-flex flex-wrap flex-column flex-md-row align-content-center justify-content-center">
    <div class="col text-start align-self-center">
      <h5>${questionarieName}</h5>
    </div>
    <div class="col text-end align-self-center">
      <a
        id="open-questionarie-score-record-btn"
        class="btn btn-primary saveBtn ms-3 px-4"
        data-mdb-toggle="collapse"
        href="#questionarie-score-${questionarieId}"
        role="button"
        aria-expanded="true"
        aria-controls="questionarie-score-${questionarieId}"
      >
        Show results
      </a>
    </div>
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
        Attempt #${attemptCount}
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
  
  
  function appendAttemptHeaderAdmin(questionarieId,username,questionarieDate,score,attemptCount){
    return `<div class="accordion-item">
    <h2 class="accordion-header" id="heading-${attemptCount}">
      <button class="accordion-button collapsed" type="button" data-mdb-toggle="collapse" data-mdb-target="#collapse-questionarie-score-${questionarieId}-${attemptCount}" aria-expanded="false" aria-controls="collapse-questionarie-score-${attemptCount}">
      <span class="userName">${username}</span> &nbsp;&nbsp;&nbsp;Attempt #${attemptCount}
      </button>
    </h2>
    <div id="collapse-questionarie-score-${questionarieId}-${attemptCount}" class="accordion-collapse collapse" aria-labelledby="heading-${attemptCount}" data-mdb-parent="#accordion-${questionarieId}">
      <div id="score-accordion-body-${questionarieId}-${attemptCount}" class="accordion-body">
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
  
  
  function appendScoreRecord(question,questionId,attemptCount,correctAnswer,givenAnswer){
    return `<div class="row">
    <div class="col-sm-12 col-md-4">${question}</div>
    <div class="col-sm-12 col-md-4 correctAns">Correct Answer - ${correctAnswer}</div>
    <div class="col-sm-12 col-md-4 givenAns">
      Given Answer -  ${givenAnswer}
      <i id="question-${attemptCount}-${questionId}-correct" class="fas fa-check text-success"></i>
      <i id="question-${attemptCount}-${questionId}-wrong" class="fas fa-xmark text-danger"></i>
    </div>
  </div>`
  }

  function appendScoreRecordAdmin(question,questionId,attemptId,attemptCount,correctAnswer,givenAnswer){
    return `<div class="row">
    <div class="col-sm-12 col-md-4">${question}</div>
    <div class="col-sm-12 col-md-4 correctAns">Correct Answer - ${correctAnswer}</div>
    <div class="col-sm-12 col-md-4 givenAns">
      Given Answer -  ${givenAnswer}
      <i id="question-${attemptId}-${attemptCount}-${questionId}-correct" class="fas fa-check text-success"></i>
      <i id="question-${attemptId}-${attemptCount}-${questionId}-wrong" class="fas fa-xmark text-danger"></i>
    </div>
  </div>`
  }