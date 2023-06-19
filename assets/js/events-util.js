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
  
  function registerNewUser(registrationData,e){
    console.log("Register new user......");
    let userObj = getRegisteredUsers();
    console.log("User Object in local Storage: ",userObj);
    let isAlreadyRegistered = false;
    if(userObj!=null){
      let userId = Object.keys(userObj);
      console.log("user Keys: ",userId);
  
       for (const userId in userObj) {
        console.log("userId : ",userId);
        let email = userObj[userId].email;
        console.log("email Id : ",email,"Registration data: ",registrationData);
        if(email === registrationData.email){
          console.log("User Already registered!!");
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
    console.log("new user Id: ",newUserId);
    //session date
    let sessionDateObj = getSessionDate();
    console.log("New user Id: ",newUserId);
    let newUserObj = createNewUserRegistrationObject(newUserId,registrationData,sessionDateObj);
    console.log("New USer Object On Registration: ",newUserObj);
    Object.assign(userObj, newUserObj);
    console.log("After assigning new user: ",userObj);
    localStorage.setItem("users", JSON.stringify(userObj));
    //set loggedinUserId to localstorage
    setLoggedInUserId(userObj,newUserId);
    $('#registration-form').attr('action', './index.html');
    //window.location.href = "/index.html";
       }
  }
  
  
  function findLoginId(loginData,event){
    console.log("Find logged in user event is executing...");
    let userObj = getRegisteredUsers();
    let isAlreadyRegistered = false;
    console.log("User Object in local Storage: ",userObj);
    if(userObj!=null){
      let userId = Object.keys(userObj);
      console.log("user Keys: ",userId);
  
       for (const userId in userObj) {
        console.log("userId : ",userId);
        let email = userObj[userId].email;
        let password = userObj[userId].password;
        console.log("userId : ",userId,"email: ",email,"password: ",password,"loginData: ",loginData);
        if(loginData.email === email && loginData.password === password){
          isAlreadyRegistered = true;
          $("h6#login-status").text("");
          console.log("This email-id is already registered");
          //set loggedIn to true
          setLoggedInUserId(userObj,userId);
          console.log("Admin is loggin in : ",userObj,userObj[userId].isAdmin);
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
    console.log("logout event is executing for login Id.....",userId, users[userId].isLoggedIn);
    Object.assign(users[userId], {
      isLoggedIn: false
    });
    localStorage.setItem("users", JSON.stringify(users));
    //set userloginid to null localstorage
    localStorage.setItem("loggedInUserID",'null');
    console.log("logged in user id: ",localStorage.getItem("loggedInUserID"));
    if(forcedUserLogoutTimout != null){
      console.log("Clearing timout");
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
      console.log(popupData[this.name]);
      console.log(typeof popupData[this.name]);
    });

    if (popupData["ndigit"] != "" && popupData["num1"] != ""  &&  popupData["num2"] != "") {
      console.log("Popup data not null and validate data");
      console.log("No of digits entered in pop up: ",popupData["ndigit"]);
      if(parseInt(popupData["ndigit"])<1 || parseInt(popupData["ndigit"])>4){
        console.log("Greater than 4...........");
        event.preventDefault();
      }else{
        if((popupData["type"] === "/") && (parseInt(popupData["num1"]) <= 0 || parseInt(popupData["num2"]) <= 0)){
          console.log("Division question input validation....");
         // validateInputNumbers();
          event.preventDefault();
        }else{
          let popupDataObj = validatePopUpData(popupData,event);
          return (popupDataObj);
        }
      }
    } else {
      console.log("Pop up data is null");
      return null;
    }
  }


function appendQuestionaryNameToSecondaryNavbar()
{
  let questionarieId = getQuestionarieID();
  let questionaries = getQuestionaries();
  let questioanrieObj = questionaries[questionarieId];
  console.log("questioanry Object: ",questioanrieObj);
  let testName = questioanrieObj["name"];
  console.log("Test Name.......: ",testName);
  let loggedInUserID = localStorage.getItem("loggedInUserID");
  let users = getRegisteredUsers();
  let userObj = users[loggedInUserID];
  console.log("Current value of test: ",$("span#student-dashboard-questionarie-name").val());
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
  