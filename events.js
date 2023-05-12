function initEvents() {
  //Open page to add new Questionarie
  $("button#add-new-questionarie-btn").click(function () {
    console.log("Add new Questionarie button event is executing");
    window.location.href = "http://localhost:5500/addNewTest.html";
  });

  //Open questionarie
  // $(document).on("click", "button#open-edit-questionarie-btn", function () {
  //   console.log("Open Edit Questionarie event is executing....");
  //   let questionarieId = getQuestionarieID();
  //   let questionaries = getQuestionaries();
  //   Object.assign(questionaries[questionarieId], {
  //     isQuestionariePublished: false
  //   });
  //   console.log(questionaries[questionarieId].isQuestionariePublished);
  //   localStorage.setItem("questionaries", JSON.stringify(questionaries));
  //   refreshQuestionarieList();
  // });

  //Delete questionarie
  $(document).on("click", "button#delete-questionarie-btn", function () {
    console.log("Delete Questionarie button event is executing");
    let questionaryKey = $(this).parent().attr("key");
    let targetId = $("div#questionarie-grid-item-" + questionaryKey);
    console.log(
      "Removing object with id : ",
      targetId,
      " and key ",
      questionaryKey
    );
    targetId.remove();
    console.log(targetId);

    let questionaries = getQuestionaries();
    delete questionaries[questionaryKey];
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
  });

  //Delete Question from a Questionarie
  $(document).on("click", "a#delete-question-link", function () {
    console.log("Delete Question from List event is executing");
    let questionKey = $(this).attr("key");
    let targetId = $("div#question-" + questionKey);
    console.log(
      "Removing object with id : ",
      targetId,
      " and key ",
      questionKey
    );
    targetId.remove();

    //get questionarie from URL
    let questionarieId = getQuestionarieID();
    let questionaries = getQuestionaries();
    console.log(questionaries[questionarieId]["questions"][questionKey]);

    delete questionaries[questionarieId]["questions"][questionKey];
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
  });

  //Student finish button 
  $("input#student-questionarie-finish-btn").click(function () {
    console.log("Finish Questionarie button event is executing");
    let questionarieId = getQuestionarieID();
    let questionaries = getQuestionaries();
    $("#date-questionarie-attempt-" + questionarieId).text(
      getDateForQuestionarieAttempt()
    );
    if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
      let questionarieObject = questionaries[questionarieId];
      let scoreAttemptID = createNewScoreAttemptID(questionarieId);
      let scoreRecordObject = createNewScoreAttemptObject(scoreAttemptID);
      let totalQuestions = Object.keys(questionarieObject["questions"]).length;
      let scoreRecordObj = getScoreRecordObject(questionarieObject,scoreAttemptID,scoreRecordObject,totalQuestions);
      Object.assign(questionarieObject["scoreAttempts"],{[scoreAttemptID]: scoreRecordObj});
      localStorage.setItem("questionaries", JSON.stringify(questionaries));
      window.location.href = "http://localhost:5500/index.html";
    }
  });

  function getScoreRecordObject(questionarieObject,scoreAttemptID,scoreRecordObject,totalQuestions){
    let correctCount = 0, inputAnswer = 0;
    for (const questionId in questionarieObject["questions"]) {
      let questionsObj = questionarieObject["questions"][questionId];
      let correctAnswer = calculateAnswer(questionsObj.num1,questionsObj.num2,questionsObj.type);
      if(questionsObj.type == "/"){
        //call 
        let inputAnswerObj = checkAnswerForDivision(questionId,questionsObj);
        //let quotient = inputAnswerObj.inputAnswer;
        console.log("InputAnswerObject",inputAnswerObj);
        if(inputAnswerObj.quotient == correctAnswer.quotient && inputAnswerObj.remainder == correctAnswer.remainder){
          console.log("For Division, InputAnswer object is equal to CorrectAnswer Object", inputAnswerObj,correctAnswer);
          correctCount = correctCount+1;
        }
        Object.assign(scoreRecordObject[scoreAttemptID]["questions"], { [questionId] :{num1 : questionsObj.num1, num2 : questionsObj.num2,ndigit: questionsObj.ndigit,type: questionsObj.type, 
          givenAns: {"quotient":inputAnswerObj.quotient,"remainder":inputAnswerObj.remainder}, correctAns: {"quotient":correctAnswer.quotient,"remainder":correctAnswer.remainder}}});

          console.log("********Score Object for Division:",scoreRecordObject[scoreAttemptID]["questions"]);
      }else{
        if(questionsObj.type == "+" || questionsObj.type == "-"){
          inputAnswer = checkAnswerForAdditionSubtraction(questionId,questionsObj,correctAnswer);
       }else if(questionsObj.type == "x"){
         inputAnswer = checkAnswerForMultiplication(questionId,questionsObj,correctAnswer); 
       } 
       console.log("Questions-- Input Answer: ",inputAnswer);
       if (isNaN(inputAnswer) || inputAnswer == null) {
         inputAnswer = "";
       }
       if(inputAnswer == correctAnswer){
         correctCount = correctCount+1;
       }
       
       Object.assign(scoreRecordObject[scoreAttemptID]["questions"], { [questionId] :{num1 : questionsObj.num1, num2 : questionsObj.num2,ndigit: questionsObj.ndigit,type: questionsObj.type, 
         givenAns: inputAnswer, correctAns: correctAnswer}});
      }
      
    }
   Object.assign(scoreRecordObject[scoreAttemptID], { dateQuestionarie: getDateForQuestionarieAttempt(),score: correctCount + " / " + totalQuestions });
  return(scoreRecordObject[scoreAttemptID]);
  }

  //Admin Publish Button
  $("input#publish-btn").click(function (event) {
    console.log(event.delegateTarget);
    console.log("Publish event is executing");
    let questionarieId = getQuestionarieID();
    let questionaries = getQuestionaries();
    console.log(questionaries[questionarieId].isQuestionariePublished);
    Object.assign(questionaries[questionarieId], {
      isQuestionariePublished: true
    });
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
  });

  $("button#pop-up-submit-btn").click(function (event) {
    console.log("PopUp Submit button on AddNewTest page is executing");
    let testName = $("input#new-questionarie-name").val();
    let popupData = fetchPopUpData(event);
    if (popupData != null) {
      console.log("PopupData : ", popupData);
      let questionaries = JSON.parse(localStorage.getItem("questionaries"));
      let qlength = Object.keys(questionaries).length;
      if (qlength > 0) {
        qlength = Object.keys(questionaries)[qlength - 1].substring(13);
      }
      let newQuestionarieKey = "qs-20230405-0" + (parseInt(qlength) + 1);
      newQuestionariesObj = createNewQuestionarie(newQuestionarieKey,testName,popupData);
      console.log("New Questionarie", newQuestionariesObj);
      Object.assign(questionaries, newQuestionariesObj);
      console.log(questionaries);
      localStorage.setItem("questionaries", JSON.stringify(questionaries));
      window.location.href =
        "./addQuestions.html?questionarie-id=" + newQuestionarieKey;
    }
  });

  function fetchPopUpData(event) {
    let $inputs = $("#popup-form :input");
    let popupData = {};
    $inputs.each(function () {
      popupData[this.name] = $(this).val();
      console.log(popupData[this.name]);
      console.log(typeof popupData[this.name]);
    });

    if (popupData["ndigit"] != "" && popupData["num1"] != ""  &&  popupData["num2"] != "") {
      console.log("Popup data not null and validate data");
      let popupDataObj = validatePopUpData(popupData,event);
      return (popupDataObj);
    } else {
      console.log("Pop up data is null");
      return null;
    }
    
  
  }

  $("button#pop-up-submit-save-btn").click(function (event) {
    console.log("Pop up Save Btn event is executing...");
    let popupData = fetchPopUpData(event);
    if (popupData!=null){
      appendNewQuestionToList(popupData);
      $("#basicQuestionModal").modal("hide");
   } else {
       console.log("object is not defined");
   }
  });

  $("input#student-questionarie-check-btn").click(function () {
    console.log("Checking the Questionaries event is executing");
    checkQuestionarie();
    //Enable Finish Button
    $("input#student-questionarie-finish-btn").prop("disabled", false);
  });

  $("input#new-questionarie-name").keyup(function () {
    console.log("Enabling plus button on input is executing");
    let testName = $(this).val();
    let isTestNameAlreadyTaken;
    isTestNameAlreadyTaken = checkQuestionaryName(testName);
    console.log("Tast name is taken or not: ", isTestNameAlreadyTaken);

    console.log("testname is : " + testName);
    if ($(this).val().trim() != "" && !isTestNameAlreadyTaken) {
      console.log("not null");
      $("#add-new-questionarie-test-btn").prop("disabled", false);
    } else {
      $("#add-new-questionarie-test-btn").prop("disabled", true);
    }
  });
}

function onChange(obj) {
  var id = $(obj).attr("id");
  switch (id) {
    case "navbar-student-btn":
      window.location.href = "http://localhost:5500/index.html";
      break;

    case "navbar-admin-btn":
      window.location.href = "http://localhost:5500/admin.html";
      break;
  }
}

