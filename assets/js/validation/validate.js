 //Pop up Client-side parsley Validation
 $("#inputNumber").change(function () {
    let inputDigit = parseInt($("#inputNumber").val());
    validateInputNumbers(inputDigit);
  });


  $('input#inputNumber1').change(function(){
    let inputDigit = parseInt($("#inputNumber").val());
    validateInputNumbers(inputDigit);
  })

  $('input#inputNumber2').change(function(){
    let inputDigit = parseInt($("#inputNumber").val());
    validateInputNumbers(inputDigit);
  })

  function validateInputNumbers(inputDigit){
    if($('select#select-question-type option:selected').val() === "/"){
      $("#inputNumber1").attr("data-parsley-min", 1);
      $("#inputNumber2").attr("data-parsley-min", 1);
    }else{
      $("#inputNumber1").attr("data-parsley-min", 0);
      $("#inputNumber2").attr("data-parsley-min", 0);
    }
    
    if (inputDigit === 1) {
      $("#inputNumber1").attr("data-parsley-max", 9);
      $("#inputNumber2").attr("data-parsley-max", 9);
    } else if (inputDigit === 2) {
      $("#inputNumber1").attr("data-parsley-max", 99);
      $("#inputNumber2").attr("data-parsley-max", 99);
    } else if (inputDigit === 3) {
      $("#inputNumber1").attr("data-parsley-max", 999);
      $("#inputNumber2").attr("data-parsley-max", 999);
    } else if (inputDigit === 4) {
      $("#inputNumber1").attr("data-parsley-max", 9999);
      $("#inputNumber2").attr("data-parsley-max", 9999);
    } else {
      $("#inputNumber1").attr("data-parsley-max", 9999);
      $("#inputNumber2").attr("data-parsley-max", 9999);
    }
  }

function validatePopUpData(popupData,event){
     // validateInputNumbers();
      event.preventDefault();
      popupData["num1"] = popupData["num1"].replace(/[^0-9 ]/g, "");
      popupData["num2"] = popupData["num2"].replace(/[^0-9 ]/g, "");
      popupData["ndigit"] = popupData["ndigit"].replace(/[^0-9 ]/g, "");
      popupData["num1"] = popupData["num1"].substr(0, popupData.ndigit);
      popupData["num2"] = popupData["num2"].substr(0, popupData.ndigit);
      if (parseInt(popupData["num1"]) < parseInt(popupData["num2"]) && (popupData["type"] == "-" || popupData["type"] == "/")) {
        let number1 = parseInt(popupData["num1"]);
        popupData["num1"] = parseInt(popupData["num2"]);
        popupData["num2"] = number1;
      } else {
        popupData["num1"] = parseInt(popupData["num1"]);
        popupData["num2"] = parseInt(popupData["num2"]);
      }
      popupData["ndigit"] = parseInt(popupData["ndigit"]);
      return popupData;
   
  }

function calculateAnswer(firstNum,secondNum,type){
    if(type == "+"){
       return(parseInt(firstNum)+parseInt(secondNum));
    }else if(type == "-"){
        return (parseInt(firstNum)-parseInt(secondNum));
    }else if(type == "x"){
        return(parseInt(firstNum)*parseInt(secondNum));
    }else {
        //let correctAnsObj;
        let quotient = parseInt(firstNum)/parseInt(secondNum);
        let remainder = parseInt(firstNum)%parseInt(secondNum);
        let correctAnswer = {"quotient": parseInt(quotient),"remainder":remainder};
        return correctAnswer;
    }
}



function checkQuestionaryName(testName) {
    let questionaries = JSON.parse(localStorage.getItem("questionaries"));
    let isTestNameAvailable = false;
    for (const questionarieId in questionaries) {
      if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
        let questionarieObject = questionaries[questionarieId];
        let questionarieName = questionarieObject["name"]
          .toLowerCase()
          .replace(" ", "");
        let inputTestName = testName.toLowerCase().replace(" ", "");
        if (questionarieName == inputTestName) {
          toastr.warning("Test with the given name already exist. Please change the name");
          isTestNameAvailable = true;
        } else {
          //toastr.success("Test name is available");
        }
      }
    }
    return isTestNameAvailable;
  }

//Checking Questionarie for Student to prepare result
function checkQuestionarie() {
    let questionaries = getQuestionaries();
    let questionarieId = getQuestionarieID();
    if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
      let questionarieObject = questionaries[questionarieId];
      let inputAnswer = 0;
      for (const questionId in questionarieObject["questions"]) {
        let questionsObj = questionarieObject["questions"][questionId];
        let correctAnswer = calculateAnswer(questionsObj.num1,questionsObj.num2,questionsObj.type);
        if(questionsObj.type == "+" || questionsObj.type == "-"){
            inputAnswer = checkAnswerForAdditionSubtraction(questionId,questionsObj,correctAnswer);
            inputAnswer = (isNaN(inputAnswer) || inputAnswer == null) ? "" : inputAnswer
        } else if(questionsObj.type == "x"){
            // inputAnswer = parseInt($("#given-answer-" + `${questionId}`).val().trim()); 
            // inputAnswer = (isNaN(inputAnswer) || inputAnswer == null) ? "" : inputAnswer
            inputAnswer = checkAnswerForMultiplication(questionId,questionsObj,correctAnswer);
        } else if(questionsObj.type == "/"){
            //call function for division
          inputAnswer = checkAnswerForDivision(questionId,questionsObj);
        } 
        else {
          return;
           // console.log("Question type is not defined");
        }
        displayCorrectnessIndicator(questionId,inputAnswer,correctAnswer,questionsObj.type);
    }
  }
  }

  function checkAnswerForDivision(questionId,questionsObj){
    let divideAns = parseInt($("#given-answer-" + `${questionId}`).val().trim()); 
    divideAns = (isNaN(divideAns) || divideAns == null) ? "" : divideAns
    let remainder = parseInt($("#given-answer-remainder-" + `${questionId}`).val().trim());
    remainder = (isNaN(remainder) || remainder == null) ? "" : remainder
    let givenAnswer = {"quotient": divideAns,"remainder":remainder};
    return givenAnswer;
  }


  function checkAnswerForAdditionSubtraction(questionId,questionsObj,correctAnswer){
    let answerLength = correctAnswer.toString().length;
    if(answerLength<questionsObj.ndigit){
      answerLength = questionsObj.ndigit;
    }
    let givenInput="";
    for (let i=0; i<answerLength; i++){
        givenInput = givenInput.concat($(`input#answer-box-${questionId}-${i}`).val().trim());
    }
    return(parseInt(givenInput));
  }

  function checkAnswerForMultiplication(questionId,questionsObj,correctAnswer){
    let answerLength = correctAnswer.toString().length;
    let givenInput = "";
    for(let i=0; i<answerLength; i++){
      givenInput = givenInput.concat($(`input#final-answer-box-${questionId}-${i}`).val().trim());
    }
    return(parseInt(givenInput));
  }

  function displayCorrectnessIndicator(questionId,inputAnswer,correctAnswer,type){
    if(type == "/"){
      if(inputAnswer.quotient == correctAnswer.quotient && inputAnswer.remainder == correctAnswer.remainder){
        $("i#question-" + `${questionId}` + "-correct").show();
        $("i#question-" + `${questionId}` + "-wrong").hide();
      } else {
        $("i#question-" + `${questionId}` + "-wrong").show();
        $("i#question-" + `${questionId}` + "-correct").hide();
      }
    } else {
      if (inputAnswer === correctAnswer) {
        $("i#question-" + `${questionId}` + "-correct").show();
        $("i#question-" + `${questionId}` + "-wrong").hide();
      } else {
        $("i#question-" + `${questionId}` + "-wrong").show();
        $("i#question-" + `${questionId}` + "-correct").hide();
      }
    }
  }