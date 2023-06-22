function questionarieListItem(questionarieId, questionarieName, hideScoreButton) {
  return `<div id="questionarie-list-item-${questionarieId}" class="row mx-auto pt-2 pb-2 align-self-center">
  <div id="questionarie-list-col-${questionarieId}">
  <div class="d-flex flex-wrap flex-column flex-md-row align-content-center justify-content-center">
      <div class="col text-start px-md-3 align-self-center">
         <p class="fw-normal pt-md-2"> ${questionarieName} </p>
      </div>  
      <div class="col text-end px-md-3 align-self-center">
          <a href="./studentQuestionary.html?questionarie-id=${questionarieId}">
          <button id="open-questionarie-btn-${questionarieId}" class="btn btn-info px-4 questionaryGoBtn">Go <i class="fas fa-angle-double-right"></i></button>   
          </a>
          <a ${hideScoreButton} id="score-record-${questionarieId}" class="scoreCheckMsg" href="./score_record.html?questionarie-id=${questionarieId}">
          <button id="open-score-questionarie-btn-${questionarieId}" class="btn btn-outline-info px-3 score-indicator"><b>Scores</b> <i class="fas fa-star text-warning"></i></button>   
          </a>   
      </div>
  </div>
  </div>
  </div>`
}

function questionarieListItemAdmin(questionarieId, questionarieName){
  return `<div id="questionarie-grid-item-${questionarieId}" class="row mx-auto pt-2 pb-2 align-self-center">
  <div class="d-flex flex-wrap flex-column flex-md-row align-content-center justify-content-center">
  <div class="col text-start px-md-3 align-self-center">
   <p class="fw-normal pt-md-2"> ${questionarieName} </p>
 </div>
  <div class="col text-end px-md-3 align-self-center">
   <a href="./score_record.html?questionarie-id=${questionarieId}">
     <button id="open-score-record-btn" class="btn btn-info px-3 questionaryScoreRecord"><b>Scores</b> <i class="fas fa-star"></i></button>
   </a>
   <a href="./addQuestions.html?questionarie-id=${questionarieId}">
     <button id="open-edit-questionarie-btn" class="btn btn-outline-info px-4 questionaryEditBtn"><b>Edit</b> <i class="fas fa-edit"></i></button>
   </a>
   <a href="#" key="${questionarieId}">
     <button id="delete-questionarie-btn" class="btn btn-tertiary px-2 questionaryDeleteBtn"><b>Delete</b> <i class="fas fa-trash-alt"></i></button>
   </a>
   </div>
  </div>
  </div>`
}

// function questionarieStatus(questionarieId){
//   return `<div class="col-auto mt-4">
//   <p id="questionary-status-${questionarieId}" class="px-0 questionaryStatus">
//    </p>
//    </div>
//    <div class="col-auto mt-4">
//     <p><i id="questionary-modified-status-${questionarieId}" class="fas fa-rocket text-success"></i></p>
//    </div>`
// }

// Status - <span id="questionarie-status-${questionarieId}"></span>

function questionarieStatus(questionarieId){
  return `<div class="row-auto mt-4">
  <p> Status - <span id="questionary-status-${questionarieId}" class="px-0 questionaryStatus"> New
  </span></p>
   </div>`
}

// <span><i id="questionary-modified-status-${questionarieId}" class="fas fa-rocket text-success hidden"></i></span>