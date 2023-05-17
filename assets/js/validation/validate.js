 //Pop up Client-side parsley Validation
 $("#inputNumber").change(function () {
    let inputDigit = parseInt($("#inputNumber").val());
    $("#inputNumber1").attr("data-parsley-min", 1);
    $("#inputNumber2").attr("data-parsley-min", 1);
    if (inputDigit === 1) {
      console.log("digit 1");
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
    }
  });

function validatePopUpData(popupData,event){
  console.log("Validating popup data.....");
   
      console.log("Validating popup data.....");
      event.preventDefault();
      popupData["num1"] = popupData["num1"].replace(/[^0-9 ]/g, "");
      popupData["num2"] = popupData["num2"].replace(/[^0-9 ]/g, "");
      popupData["ndigit"] = popupData["ndigit"].replace(/[^0-9 ]/g, "");
      popupData["num1"] = popupData["num1"].substr(0, popupData.ndigit);
      popupData["num2"] = popupData["num2"].substr(0, popupData.ndigit);
      if (parseInt(popupData["num1"]) < parseInt(popupData["num2"]) && (popupData["type"] == "-" || popupData["type"] == "/")) {
        console.log("Number 1 is smaller than number 2");
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
    console.log("First Number: ",firstNum,typeof(firstNum));
    if(type == "+"){
       return(parseInt(firstNum)+parseInt(secondNum));
    }else if(type == "-"){
        return (parseInt(firstNum)-parseInt(secondNum));
    }else if(type == "x"){
        return(parseInt(firstNum)*parseInt(secondNum));
    }else {
        //let correctAnsObj;
        console.log("Division....");
        let quotient = parseInt(firstNum)/parseInt(secondNum);
        let remainder = parseInt(firstNum)%parseInt(secondNum);
        let correctAnswer = {"quotient": parseInt(quotient),"remainder":remainder};
        console.log(correctAnswer);
        return correctAnswer;
    }
}



function checkQuestionaryName(testName) {
    console.log("Checking Questionarie name already exist or not");
    let questionaries = JSON.parse(localStorage.getItem("questionaries"));
    let isTestNameAvailable = false;
    for (const questionarieId in questionaries) {
      if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
        let questionarieObject = questionaries[questionarieId];
        console.log(questionarieObject.name);
        let questionarieName = questionarieObject["name"]
          .toLowerCase()
          .replace(" ", "");
        let inputTestName = testName.toLowerCase().replace(" ", "");
        if (questionarieName == inputTestName) {
          console.log("testname already exists");
          toastr.warning("Test with the given name already exist. Please change the name");
          isTestNameAvailable = true;
        } else {
          //toastr.success("Test name is available");
          console.log("Questionary name is available");
        }
      }
    }
    return isTestNameAvailable;
  }

//Checking Questionarie for Student to prepare result
function checkQuestionarie() {
    let questionaries = getQuestionaries();
    let questionarieId = getQuestionarieID();
    console.log("Checking Questions for Questionarie: ", questionarieId);
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
          console.log("Given Answer For Division : ",inputAnswer);
        } else {
            console.log("Question type is not defined");
        }
        displayCorrectnessIndicator(questionId,inputAnswer,correctAnswer,questionsObj.type);
    }
  }
  }

  function checkAnswerForDivision(questionId,questionsObj){
    console.log("Checking given answer for Division.....questionObject",questionsObj);
    let divideAns = parseInt($("#given-answer-" + `${questionId}`).val().trim()); 
    divideAns = (isNaN(divideAns) || divideAns == null) ? "" : divideAns
    let remainder = parseInt($("#given-answer-remainder-" + `${questionId}`).val().trim());
    remainder = (isNaN(remainder) || remainder == null) ? "" : remainder
    let givenAnswer = {"quotient": divideAns,"remainder":remainder};
    console.log("Given Answers for Division Question:",divideAns,remainder,givenAnswer);
    return givenAnswer;
  }


  function checkAnswerForAdditionSubtraction(questionId,questionsObj,correctAnswer){
    console.log("Checking given answer for Addition.....questionObject",questionsObj);
    
    let answerLength = correctAnswer.toString().length;
    if(answerLength<questionsObj.ndigit){
      answerLength = questionsObj.ndigit;
      console.log("Length of answer digits: ",answerLength);
    }
    console.log("Answer Length: ",answerLength);
    let givenInput="";
    for (let i=0; i<answerLength; i++){
        givenInput = givenInput.concat($(`input#answer-box-${questionId}-${i}`).val().trim());
    }
    console.log("Given Input: ",givenInput);
    return(parseInt(givenInput));
  }

  function checkAnswerForMultiplication(questionId,questionsObj,correctAnswer){
    console.log("Checking given answer for Multiplication.....questionObject",questionsObj);
    let answerLength = correctAnswer.toString().length;
    let givenInput = "";
    for(let i=0; i<answerLength; i++){
      givenInput = givenInput.concat($(`input#final-answer-box-${questionId}-${i}`).val().trim());
    }
    console.log("Given Input: ",givenInput);
    return(parseInt(givenInput));
  }

  function displayCorrectnessIndicator(questionId,inputAnswer,correctAnswer,type){
    console.log("While displaying correctness Indicator, inputAnswer and correctAnswer: ",inputAnswer,correctAnswer);
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