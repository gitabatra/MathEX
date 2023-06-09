function questionarieListItem(questionarieId, questionarieName, hideScoreButton) {
    return `<div id="questionarie-list-item-${questionarieId}" class="row">
        <div id="questionarie-list-col-${questionarieId}" class="col">
            <label><h2 class="px-4"> ${questionarieName} </h2></label>
            <a href="./studentQuestionary.html?questionarie-id=${questionarieId}">
            <button id="open-questionarie-btn-${questionarieId}" class="btn btn-success px-4 mb-2">Go <i class="fas fa-angle-double-right"></i></button>   
            </a>
            <a ${hideScoreButton} id="score-record-${questionarieId}" class="scoreCheckMsg" href="./score_record.html?questionarie-id=${questionarieId}">
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
   <a href="./score_record.html?questionarie-id=${questionarieId}">
     <button id="open-score-record-btn" class="btn btn-info px-4 mb-2 questionaryScoreRecord">Scores <i class="fas fa-star"></i></button>
   </a>
   <a href="./addQuestions.html?questionarie-id=${questionarieId}">
     <button id="open-edit-questionarie-btn" class="btn btn-success px-4 mb-2 questionaryEditBtn">Edit <i class="fas fa-edit"></i></button>
   </a>
   <a href="#" key="${questionarieId}">
     <button id="delete-questionarie-btn" class="btn btn-danger px-4 mb-2 questionaryDeleteBtn">Delete <i class="fas fa-trash-alt"></i></button>
   <a>
   </div>
  </div>
  </div>`
}

function questionarieStatus(questionarieId){
  return `<div class="col-auto">
  <p id="questionary-status-${questionarieId}" class="px-2 questionaryStatus">
   </p>
   </div>
   <div class="col-auto">
    <p id="questionary-modified-status-${questionarieId}" class="px-2"></p>
   </div>`
}