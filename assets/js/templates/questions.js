//  //insert Questions for Admin
//  function appendQuestionForAdmin(questionId, questionType, firstNum, secondNum){
//     const ques = firstNum + " " + questionType + " " + secondNum + " = ? ";
  
//     console.log("Append Question for Admin------- : ",ques);
//     $("div#add-question-from-popupdata")
//       .append(`<div id="question-${questionId}" class="alignQuestions">
//       ${ques} 
      
//       <a id="delete-question-link" href="#" key="${questionId}" class="text-dark"><i class="fas fa-trash-alt ms-5"></i></a>   
  
//     </div>`);
//   }


// // Append Questions to Student Questionarie
// function appendQuestionsForStudent(
//     questionId,
//     countQuestion,
//     nDigits,
//     questionType,
//     firstNum,
//     secondNum
//   ) {
//     //console.log("Appending Questions...............");
//     //console.log("First No: ",firstNum,"type of first no: ",typeof(firstNum));
//     let firstNumLength = firstNum.length;
//     let secondNumLength = secondNum.length;
//     let firstNumber = getDigits(firstNumLength,firstNum);
//     let secondNumber = getDigits(secondNumLength,secondNum);
//     if(questionType === "x"){
//       $("div#questions-list").append(appendMultiplicationQuestions(questionId,countQuestion,firstNum,secondNum));
//     }else if(questionType === "+" || questionType === "-")
//     {  
//     $("div#questions-list").append(`
//       <div id="question-col-${questionId}" class="col-sm-6 col-md-4">
//           <div class="card text-center">
//             <div class="card-header">Question ${countQuestion}</div>
//             <div class="card-body">
//               <table class="tableAlign">
//                 <tbody>
//                   <tr id="first-number">
//                    ${appendFirstNumberInRow(firstNumber)}
//                   </tr>
//                   <tr id="second-number"> 
//                    ${appendSecondNumberInRow(secondNumber,questionType)}
//                   </tr>
//                   <tr id="answerInputBox">
//                    ${appendInputBoxForAnswer(questionId)}
//                   </tr>
//                 </tbody>
//               </table>
//               <br />
//               <i id="question-${questionId}-correct" class="fas fa-check text-success correctness-indicator"></i>
//               <i id="question-${questionId}-wrong" class="fas fa-xmark text-danger correctness-indicator"></i>
//             </div>
//           </div>
//       </div>
//         `);
//     }
//     hideInputBoxForDigits(questionId, nDigits);
//     $('#answerInputBox :input:enabled:visible:first').focus();
//   }
  
//   function appendFirstNumberInRow(firstNumber){
//    return(`<td></td>
//     <td class="text-center align-bottom">${firstNumber.thousandDigit}</td>
//     <td class="text-center align-bottom">${firstNumber.hundredDigit}</td>
//     <td class="text-center align-bottom">${firstNumber.tensDigit}</td>
//     <td class="text-center">${firstNumber.onesDigit}</td>`);
//   }
  
//   function appendSecondNumberInRow(secondNumber,questionType){
//     return(`<td class="text-center align-bottom">${questionType}</td>
//     <td class="text-center align-bottom">${secondNumber.thousandDigit}</td>
//     <td class="text-center align-bottom">${secondNumber.hundredDigit}</td>
//     <td class="text-center align-bottom">${secondNumber.tensDigit}</td>
//     <td class="text-center">${secondNumber.onesDigit}</td>`);
//   }
  
//   function appendInputBoxForAnswer(questionId){
//     return(` <td  class="text-end mx-0 "> <input id="digit-5-${questionId}" class="no-outline inputBox" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/></td>
//     <td  class="text-end mx-0 px-0">
//     <input id="digit-4-${questionId}" class="no-outline inputBox" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/>
//   </td>
//     <td class="text-end mx-0 px-0">
//       <input id="digit-3-${questionId}" class="no-outline inputBox" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/>
//     </td>
//     <td  class="text-end mx-0 px-0">
//       <input id="digit-2-${questionId}" class="no-outline inputBox" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/>
//     </td>
//     <td  class="mx-0 px-0">
//       <input id="digit-1-${questionId}" class="no-outline inputBox" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/>
//     </td>`);
//   }
  
//   //Get Digits from input Number
//   function getDigits(numberLength,number){
//     let numberObj = {thousandDigit:"", hundredDigit:"", tensDigit:"", onesDigit:""};
  
//     if (numberLength == 1) {
//       numberObj.onesDigit = number[0];
//     } else if (numberLength == 2) {
//       numberObj.tensDigit = number[0];
//       numberObj.onesDigit = number[1];
//     } else if (numberLength == 3) {
//       numberObj.hundredDigit = number[0];
//       numberObj.tensDigit = number[1];
//       numberObj.onesDigit = number[2];
//     } else {
//       numberObj.thousandDigit = number[0];
//       numberObj.hundredDigit = number[1];
//       numberObj.tensDigit = number[2];
//       numberObj.onesDigit = number[3];
//     }
//     return (numberObj);
//   }
  
//   function hideInputBoxForDigits(questionId, nDigits, answerLength) {
//     console.log("Hiding input Box for each question is executing.......");
//      $("input#digit-1-" + `${questionId}`).hide();
//       $("input#digit-2-" + `${questionId}`).hide();
//       $("input#digit-3-" + `${questionId}`).hide();
//       $("input#digit-4-" + `${questionId}`).hide();
//       $("input#digit-5-" + `${questionId}`).hide();
//     if (nDigits == 1) {
//       $("input#digit-1-" + `${questionId}`).show();
//       $("input#digit-1-" + `${questionId}`).attr("maxlength",2);
//     } else if (nDigits == 2) {
//       $("input#digit-1-" + `${questionId}`).show();
//       $("input#digit-2-" + `${questionId}`).show();
//       $("input#digit-2-" + `${questionId}`).attr("maxlength",2);
//     } else if (nDigits == 3) {
//       $("input#digit-1-" + `${questionId}`).show();
//       $("input#digit-2-" + `${questionId}`).show();
//       $("input#digit-3-" + `${questionId}`).show();
//      // $("input#digit-4-" + `${questionId}`).show();
//      $("input#digit-3-" + `${questionId}`).attr("maxlength",2);
//     } else {
//       $("input#digit-1-" + `${questionId}`).show();
//       $("input#digit-2-" + `${questionId}`).show();
//       $("input#digit-3-" + `${questionId}`).show();
//       $("input#digit-4-" + `${questionId}`).show();
//       //$("input#digit-5-" + `${questionId}`).show();
//       $("input#digit-4-" + `${questionId}`).attr("maxlength",2);
//     }
//   }
  
  // $(document).on("keyup", "input.inputBox", function (e) {
  // // $("").on('keyup', function() {
  //   console.log("Key up..........",$(this).next().find('input'), "MaxLength: ",this.maxLength);
  //   //$(this).next().focus();
  //   //if(e.which==8) {
  //     if (this.value.length == this.maxLength) {
  //       $(this).parent().next().find('input').focus();
  //     } 
  //     if (this.value.length == 0) {
  //       $(this).parent().prev().find('input').focus();
  //     } 
  //   //}
  // });
  