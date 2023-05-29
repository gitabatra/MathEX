
function appendAddSubtractQuestions(questionId,nDigits,countQuestion,questionType,firstNum,secondNum){
  console.log("QuestionType: ",questionType);
  console.log("second number type", secondNum,typeof(secondNum));
  $("div#questions-list").append(appendQuestionsToStudentQuestionary(questionId,countQuestion,questionType));
        appendFirstNumberInRow(questionId,firstNum,nDigits);
        appendSecondNumberInRow(questionId,secondNum,nDigits);
        appendInputBoxForAnswer(questionId,nDigits,firstNum,secondNum,questionType);   
}

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
  
  function appendFirstNumberInRow(questionId,number,nDigits){
    console.log("First Number---",number," No of Digits: ",nDigits);
    console.log("first number type", typeof(number));
    let firstNumLength = number.length;
    console.log("Length of Second number: ", firstNumLength);
    for (let i = 0; i< nDigits; i++){
      if(firstNumLength == nDigits){
        console.log("Length of first number is equal to number of Digits");
        $("tr#first-number-"+`${questionId}`).append(`<td id="first-number-digit-${i}" class="text-center align-bottom">${number[i]}</td>`);
      } else if(firstNumLength <nDigits){
        console.log("Length of first number is less than the number of Digits");
        let calcDifference = (nDigits - firstNumLength);
        console.log("Difference in Length: ",calcDifference);
        if(i<calcDifference){
          console.log("i ",i,"is less than calcDifference",calcDifference);
          $("tr#first-number-"+`${questionId}`).append(`<td id="first-number-digit-${i}" class="text-center align-bottom"></td>`);
        }
       else{
        $("tr#first-number-"+`${questionId}`).append(`<td id="first-number-digit-${i}" class="text-center align-bottom">${number[i-calcDifference]}</td>`);
       }
      }
    }
  }
  
  function appendSecondNumberInRow(questionId,secondNumber,nDigits){
    console.log("First Number--- No of Digits: ",nDigits);
    console.log("Second number type", secondNumber, typeof(secondNumber.toString()));
    let numLength = (secondNumber.length);
    console.log("Length of Second number: ", numLength);
    for (let i = 0; i< nDigits; i++){
      if(numLength == nDigits){
        $("tr#second-number-"+`${questionId}`).append(`<td id="second-number-digit-${i}" class="text-center align-bottom">${secondNumber[i]}</td>`);
      } else if(numLength <nDigits){
        let calcDifference = (nDigits - numLength);
        console.log("Difference in Length: ",calcDifference);
        if(i<calcDifference){
          console.log("i ",i,"is less than calcDifference",calcDifference);
          $("tr#second-number-"+`${questionId}`).append(`<td id="second-number-digit-${i}" class="text-center align-bottom"></td>`);
        }
        else {
          console.log("Value of second Number at position: ",i, secondNumber[i-calcDifference]);
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
    console.log("ADD / Subtract -- maximum input Boxes for answer ",answerLength);
    for(let i=0; i<answerLength; i++){
      console.log("AnswerLength: ",answerLength);
     
        console.log("AnswerLength is equal to number of Digits.");
        $("#answer-input-box-"+`${questionId}`).append(`<td class="text-center align-bottom">
        <input id="answer-box-${questionId}-${i}" class="no-outline finalInputBox" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/>
        </td>`); 
    }
  }
  
  function appendInputBoxForAnswer(questionId,nDigits,firstNum,secondNum,questionType){
    console.log("QuestionType: ",questionType);
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
    console.log("Multiply Answer length: ",answerLength);
    appendFirstNumberInRow(questionId,firstNum,answerLength);
    appendSecondNumberInRow(questionId,secondNum,answerLength);
     $("#answer-input-box-"+`${questionId}`).append(appendRowsForMultiplyAnswer(questionId,firstNum,secondNum,nDigits));
  }

  function appendMultiplicationQuestionsStudentQuestionary(questionId,countQuestion,questionType){
    return(`<div id="question-col-${questionId}" class="col-sm-6 col-md-12 col-lg-6 col-xl-4">
    <div class="card text-center">
    <div class="card-header">Question ${countQuestion}</div>
    <div class="card-body">
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

  function appendRowsForMultiplyAnswer(questionId,firstNum,secondNum,nDigits){
    console.log("InputBox for Multiplication.......");
    console.log("First number and Second Number", firstNum, typeof(firstNum),secondNum, typeof(secondNum));
    let totalAnswerLength;
    let firstNumLength = firstNum.toString().length;
    let secondNumLength = secondNum.toString().length;
    if(parseInt(firstNum) === 0 || parseInt(secondNum) === 0){
        //display single box to enter 0 as answer
        console.log("One of the number is zero---------------");
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
    console.log("second number, Length of Second Number: ",secondNum, secondNumLength);
    totalAnswerLength = ((parseInt(firstNum)*parseInt(secondNum)).toString().length);
    let countX=0;
    if(secondNumLength == 1){
      $(`#multiplication-questionarie-table-${questionId}`).append(`<tr id="answer-input-box-final-${questionId}"><td class="text-center align-bottom"></td></tr>`);
      displayFinalAnswerRow(questionId,totalAnswerLength);
    }else {
      for(let rowCount=0; rowCount<secondNumLength; rowCount++){
        let secondNumDigit = secondNum[secondNumLength-(rowCount+1)];
        console.log("Second number digit: ",secondNum[secondNumLength-(rowCount+1)]);
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
    console.log("Total Length in Final box: ",totalAnswerLength);
    for(let i=0; i<totalAnswerLength; i++){
      $(`tr#answer-input-box-final-${questionId}`).append(` <td class="text-center align-bottom">
      <input id="final-answer-box-${questionId}-${i}" class="finalInputBox" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/>
      </td>`)
    }
  }

  function  appendAnswerRowForMultiplication(questionId,firstNum,secondNumDigit,rowCount,totalAnswerLength,countX){
    let multiRowLength;
    if(secondNumDigit == 0){
      console.log("Second Number Digit : ", secondNumDigit, "Length of first number: ",firstNum.length);
      multiRowLength = (firstNum.length);

    } else{
      let multiResult = parseInt(firstNum)*parseInt(secondNumDigit);
      console.log("First number: ",firstNum,"second number digit: ",secondNumDigit);
      multiRowLength = multiResult.toString().length;
    }
       
        console.log("Length of calculated answer: ",multiRowLength, "TotalLength of Answer",totalAnswerLength);
        let invlength = totalAnswerLength-multiRowLength;
        console.log("Length of Invisible boxes: ",invlength);
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
  // $("").on('keyup', function() {
    console.log("Keycode for pressed key : ", e.keyCode);
    console.log("Key up..........",$(this).next().find('input'), "MaxLength: ",this.maxLength);
    
      if(e.keyCode == 8){
        console.log("Backspace key is pressed");
      } 
      
      if (this.value.length == this.maxLength) {
        $(this).parent().next().find('input').focus();
      } 
      if (this.value.length == 0) {
        $(this).parent().prev().find('input').focus();
      } 
    //}
  });


  