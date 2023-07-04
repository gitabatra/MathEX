
function appendAddSubtractQuestions(questionId,nDigits,countQuestion,questionType,firstNum,secondNum){
    $("div#questions-list").append(appendQuestionsToStudentQuestionary(questionId,countQuestion,questionType));
          appendFirstNumberInRow(questionId,firstNum,nDigits);
          appendSecondNumberInRow(questionId,secondNum,nDigits);
          appendInputBoxForAnswer(questionId,nDigits,firstNum,secondNum,questionType);   
  }
    
    function appendFirstNumberInRow(questionId,number,nDigits){
      let firstNumLength = number.length;
      for (let i = 0; i< nDigits; i++){
        if(firstNumLength == nDigits){
          $("tr#first-number-"+`${questionId}`).append(`<td id="first-number-digit-${i}" class="text-center align-bottom">${number[i]}</td>`);
        } else if(firstNumLength <nDigits){
          let calcDifference = (nDigits - firstNumLength);
          if(i<calcDifference){
            $("tr#first-number-"+`${questionId}`).append(`<td id="first-number-digit-${i}" class="text-center align-bottom"></td>`);
          }
         else{
          $("tr#first-number-"+`${questionId}`).append(`<td id="first-number-digit-${i}" class="text-center align-bottom">${number[i-calcDifference]}</td>`);
         }
        }
      }
    }
    
    function appendSecondNumberInRow(questionId,secondNumber,nDigits){
      let numLength = (secondNumber.length);
      for (let i = 0; i< nDigits; i++){
        if(numLength == nDigits){
          $("tr#second-number-"+`${questionId}`).append(`<td id="second-number-digit-${i}" class="text-center align-bottom">${secondNumber[i]}</td>`);
        } else if(numLength <nDigits){
          let calcDifference = (nDigits - numLength);
          if(i<calcDifference){
            $("tr#second-number-"+`${questionId}`).append(`<td id="second-number-digit-${i}" class="text-center align-bottom"></td>`);
          }
          else {
            $("tr#second-number-"+`${questionId}`).append(`<td id="second-number-digit-${i}" class="text-center align-bottom">${secondNumber[i-calcDifference]}</td>`);
          } 
        }
      }
    }
  
    function addSubtractAnswerInputBox(answerLength,questionId,nDigits){
      if(answerLength <= nDigits){
        $("#answer-input-box-"+`${questionId}`).append(`<td class="text-center align-bottom"></td>`);
        let calcdiff = nDigits-answerLength;
        for(let i=0;i<calcdiff; i++){
          $("#answer-input-box-"+`${questionId}`).append(`<td class="text-center align-bottom"></td>`);
        }
      }
     
      for(let i=0; i<answerLength; i++){
          $("#answer-input-box-"+`${questionId}`).append(`<td class="text-center align-bottom">
          <input id="answer-box-${questionId}-${i}" class="no-outline finalInputBox" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/>
          </td>`); 
      }
    }
    
    function appendInputBoxForAnswer(questionId,nDigits,firstNum,secondNum,questionType){
      let firstNumLength = firstNum.toString().length;
      //let secondNumLength = secondNum.toString().length;
      let answer,answerLength;
      if(questionType == "+"){
        answer = parseInt(firstNum)+parseInt(secondNum);
        answerLength = answer.toString().length;
        addSubtractAnswerInputBox(answerLength,questionId,nDigits);
      } else if(questionType == "-"){
        answer = parseInt(firstNum)-parseInt(secondNum);
        answerLength = answer.toString().length;
        addSubtractAnswerInputBox(firstNumLength,questionId,nDigits);
      }
    }
  
    function appendMultiplicationQuestions(questionId,nDigits,countQuestion,questionType,firstNum,secondNum){
      $("div#questions-list").append(appendMultiplicationQuestionsStudentQuestionary(questionId,countQuestion,questionType));
      let answer = parseInt(firstNum)*parseInt(secondNum);
      let answerLength;
      if(answer === 0){
        answerLength = nDigits;
        console.log("No of digits: ",answerLength);
      }else{
        answerLength = (answer).toString().length;
      }
      appendFirstNumberInRow(questionId,firstNum,answerLength);
      appendSecondNumberInRow(questionId,secondNum,answerLength);
       $("#answer-input-box-"+`${questionId}`).append(appendRowsForMultiplyAnswer(questionId,firstNum,secondNum,nDigits));
    }
  
    function appendRowsForMultiplyAnswer(questionId,firstNum,secondNum,nDigits){
      let totalAnswerLength;
      let firstNumLength = firstNum.toString().length;
      let secondNumLength = secondNum.toString().length;
      if(parseInt(firstNum) === 0 || parseInt(secondNum) === 0){
          //display single box to enter 0 as answer
        if(firstNumLength > secondNumLength){
          totalAnswerLength = firstNumLength;
        }else {
          totalAnswerLength = secondNumLength;
        }
        let calcdiff = nDigits-totalAnswerLength;
        $(`#multiplication-questionarie-table-${questionId}`).append(`<tr id="answer-input-box-final-${questionId}"><td class="text-center align-bottom"></td></tr>`);
        for(let i=0;i<calcdiff; i++){
          $("#answer-input-box-final-"+`${questionId}`).append(`<td class="text-center align-bottom"></td>`);
        }
        displayFinalAnswerRow(questionId,totalAnswerLength);
      } else{
        let secondNumLength = secondNum.length;
      //let totalAnswerRows = secondNumLength+1;
      totalAnswerLength = ((parseInt(firstNum)*parseInt(secondNum)).toString().length);
      let countX=0;
      if(secondNumLength == 1){
        $(`#multiplication-questionarie-table-${questionId}`).append(`<tr id="answer-input-box-final-${questionId}"><td class="text-center align-bottom"></td></tr>`);
        displayFinalAnswerRow(questionId,totalAnswerLength);
      }else {
        for(let rowCount=0; rowCount<secondNumLength; rowCount++){
          let secondNumDigit = secondNum[secondNumLength-(rowCount+1)];
          $(`#multiplication-questionarie-table-${questionId}`).append(`<tr id="answer-input-box-row-${questionId}-${rowCount}"><td class="text-center align-bottom"></td></tr>`);
          appendAnswerRowForMultiplication(questionId,firstNum,secondNumDigit,rowCount,totalAnswerLength,countX);
          countX = countX + 1;
        }
        $(`#multiplication-questionarie-table-${questionId}`).append(`<tr id="answer-input-box-final-${questionId}"><td class="text-center align-bottom"></td></tr>`);
        displayFinalAnswerRow(questionId,totalAnswerLength);
      }
      }
    }
  
    function displayFinalAnswerRow(questionId,totalAnswerLength){
      for(let i=0; i<totalAnswerLength; i++){
        $(`tr#answer-input-box-final-${questionId}`).append(` <td class="text-center align-bottom">
        <input id="final-answer-box-${questionId}-${i}" class="finalInputBox" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/>
        </td>`)
      }
    }
  
    function  appendAnswerRowForMultiplication(questionId,firstNum,secondNumDigit,rowCount,totalAnswerLength,countX){
      let multiRowLength;
      if(secondNumDigit == 0){
        multiRowLength = (firstNum.length);
      } else{
        let multiResult = parseInt(firstNum)*parseInt(secondNumDigit);
        multiRowLength = multiResult.toString().length;
      }
          let invlength = totalAnswerLength-multiRowLength;
          for(let i=0; i<(invlength-countX); i++)
          {
            $(`#answer-input-box-row-${questionId}-${rowCount}`).append(`<td class="emptyBox"></td>`);
          }
          for(let j=invlength; j<(invlength+multiRowLength); j++){
            displayAnswerRow(questionId,j,rowCount);
          }
          for(let l=0; l<countX; l++){
            $(`#answer-input-box-row-${questionId}-${rowCount}`).append(`<td class="emptyBox">x</td>`);
          }
    }
  
    function displayAnswerRow(questionId,count,rowCount){
        $(`#answer-input-box-row-${questionId}-${rowCount}`).append(`
       <td class="text-center align-bottom">
        <input id="answer-box-${count}" class="inputBox" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/>
        </td>`)
    }
  
    $(document).on("keyup", "input.finalInputBox, input.inputBox", function (e) {
     // console.log("Key up..........",$(this).next().find('input'), "MaxLength: ",this.maxLength);
        
        if (this.value.length == this.maxLength) {
          $(this).parent().next().find('input').focus();
        } 
        if (this.value.length == 0) {
          $(this).parent().prev().find('input').focus();
        } 
      //}
    });
  
  
    