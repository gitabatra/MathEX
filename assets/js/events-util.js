function getScoreRecordObject(questionarieObject,scoreAttemptID,scoreRecordObject,totalQuestions){
  let correctCount = 0, inputAnswer = 0;
  for (const questionId in questionarieObject["questions"]) {
    let questionsObj = questionarieObject["questions"][questionId];
    let correctAnswer = calculateAnswer(questionsObj.num1,questionsObj.num2,questionsObj.type);
    if(questionsObj.type == "/"){
      //call 
      let inputAnswerObj = checkAnswerForDivision(questionId,questionsObj);
      //let quotient = inputAnswerObj.inputAnswer;
      if(inputAnswerObj.quotient == correctAnswer.quotient && inputAnswerObj.remainder == correctAnswer.remainder){
        correctCount = correctCount+1;
      }
      Object.assign(scoreRecordObject[scoreAttemptID]["questions"], { [questionId] :{num1 : questionsObj.num1, num2 : questionsObj.num2,ndigit: questionsObj.ndigit,type: questionsObj.type, 
        givenAns: {"quotient":inputAnswerObj.quotient,"remainder":inputAnswerObj.remainder}, correctAns: {"quotient":correctAnswer.quotient,"remainder":correctAnswer.remainder}}});
    }else{
      if(questionsObj.type == "+" || questionsObj.type == "-"){
        inputAnswer = checkAnswerForAdditionSubtraction(questionId,questionsObj,correctAnswer);
     }else if(questionsObj.type == "x"){
       inputAnswer = checkAnswerForMultiplication(questionId,questionsObj,correctAnswer); 
     } 
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
  
  function registerNewUser(registrationData,e){
    let userObj = getRegisteredUsers();
    let isAlreadyRegistered = false;
    if(userObj!=null){
      let userId = Object.keys(userObj);
       for (const userId in userObj) {
        let email = userObj[userId].email;
        if(email === registrationData.email){
          isAlreadyRegistered = true;
        }
       }}

    if(isAlreadyRegistered){
        e.preventDefault();
        toastr.warning("This email-id is already registered!!!","",{positionClass: "toast-bottom-right",extendedTimeOut: 1000,timeOut: 3000});
        // $("h6#login-status").text("This email-id is already registered!!!");
    } else{
      let ulength = Object.keys(userObj).length;
      if(ulength>0){
      ulength = Object.keys(userObj)[ulength - 1].substring(12);
    }
    let newUserId = "u-20230405-0" + (parseInt(ulength) + 1);
    //session date
    let sessionDateObj = getSessionDate();
    let newUserObj = createNewUserRegistrationObject(newUserId,registrationData,sessionDateObj);
    Object.assign(userObj, newUserObj);
    localStorage.setItem("users", JSON.stringify(userObj));
    //set loggedinUserId to localstorage
    setLoggedInUserId(userObj,newUserId);
    $('#registration-form').attr('action', './index.html');
    //window.location.href = "/index.html";
       }
  }
  
  
  function findLoginId(loginData,event){
    let userObj = getRegisteredUsers();
    let isAlreadyRegistered = false;

    if(userObj!=null){
      let userId = Object.keys(userObj);
       for (const userId in userObj) {
        let email = userObj[userId].email;
        let password = userObj[userId].password;
        if(loginData.email === email && loginData.password === password){
          isAlreadyRegistered = true;
          $("h6#login-status").text("");
          //set loggedIn to true
          setLoggedInUserId(userObj,userId);
          if(userObj[userId].isAdmin){
            window.location.href = "./admin.html";
          } else {
            window.location.href = "./index.html";
          }
        } else{
          event.preventDefault();
          // $("h6#login-status").text("This email-id is not registered or your password is not correct!");
        }
      }
      if(!isAlreadyRegistered){
        toastr.warning("This email-id is not registered or your password is not correct!","",{positionClass: "toast-bottom-right",extendedTimeOut: 1000,timeOut: 3000});
      }
    }
  }

  function logout(){
    let users = getRegisteredUsers();
    let userId =  localStorage.getItem("loggedInUserID");
    Object.assign(users[userId], {
      isLoggedIn: false
    });
    localStorage.setItem("users", JSON.stringify(users));
    //set userloginid to null localstorage
    localStorage.setItem("loggedInUserID",'null');
    if(forcedUserLogoutTimout != null){
      clearTimeout(forcedUserLogoutTimout);
      forcedUserLogoutTimout = null;
    }   
    window.location.href = "./loginRegister.html";
  }
  

  function fetchPopUpData(event) {
    let $inputs = $("#popup-form :input");
    let popupData = {};
    $inputs.each(function () {
      popupData[this.name] = $(this).val();
    });

    if (popupData["ndigit"] != "" && popupData["num1"] != ""  &&  popupData["num2"] != "") {
      if(parseInt(popupData["ndigit"])<1 || parseInt(popupData["ndigit"])>4){
        event.preventDefault();
      }else{
        if((popupData["type"] === "/") && (parseInt(popupData["num1"]) <= 0 || parseInt(popupData["num2"]) <= 0)){
         // validateInputNumbers();
          event.preventDefault();
        }else{
          let popupDataObj = validatePopUpData(popupData,event);
          return (popupDataObj);
        }
      }
    } else {
      return null;
    }
  }


function appendQuestionaryNameToSecondaryNavbar()
{
  let questionarieId = getQuestionarieID();
  let questionaries = getQuestionaries();
  let questioanrieObj = questionaries[questionarieId];
  let testName = questioanrieObj["name"];
 
  let loggedInUserID = localStorage.getItem("loggedInUserID");
  let users = getRegisteredUsers();
  let userObj = users[loggedInUserID];
  
  if(userObj.isAdmin){
  $("span#student-dashboard-questionarie-name").val("Score Record");
  }else{
    $("span#student-dashboard-questionarie-name").val(testName);
  }
}

function checkIfScoreRecordExists(){
  let questionarieId = getQuestionarieID();
  if(($(`#accordion-${questionarieId}` ).has( "div" ).length) > 0 ){
    return true
  }else{
    return false
  }
}
  