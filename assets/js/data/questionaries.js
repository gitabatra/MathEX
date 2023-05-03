function getQuestionarieID(){
    let urlParams = new URLSearchParams(window.location.search);
    let questionarieId = urlParams.get("questionarie-id");
    return questionarieId;
}

function getQuestionaries() {
    let questionaries = JSON.parse(localStorage.getItem("questionaries"));
    return questionaries;
}

function setQuestionary(id, newObject) {
    let questionaries = getQuestionaries();
    Object.assign(questionaries[id], newObject);
    console.log(questionaries[id]);
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
}

function createNewQuestionarie(newQuestionarieKey,testName,popupData){
    let newQuestionariesObj = {
        [newQuestionarieKey]: {
          name: testName,
          questions: {
            "q-20230405-01": {
              ndigit: popupData.ndigit,
              num1: popupData.num1,
              num2: popupData.num2,
              type: popupData.type,
            },
          },
          scoreAttempts: {},
          isQuestionariePublished: false,
        },
      };
      return newQuestionariesObj;
}

function createNewScoreAttemptID(questionarieId){
    let currentDate = new Date();
     let year = currentDate.getFullYear().toString();
     let month = currentDate.getMonth().toString();
     let day = currentDate.getDate().toString();
     month = (month>9 ? "":"0")+month;
     day = (day>9 ? "":"0")+day;
     let dateString =  (year+month+day);

     let questionaries = getQuestionaries();
     let questionarieObj = questionaries[questionarieId];
    
     let qlength = Object.keys(questionarieObj["scoreAttempts"]).length;
     let attemptCount = qlength+1;
     console.log("ScoreObject Attempts: ",questionarieObj["scoreAttempts"],"Qlength: ",qlength);

     console.log("Current Date: ",dateString);
     dateString = "sa-"+dateString+"-"+attemptCount+"-"+questionarieId;
     console.log("New AttemptID :", dateString);
     return (dateString);
}

function createNewScoreAttemptObject(newAttemptID){
    let newAttemptScoreObj = {
        [newAttemptID]: {
          questions: {
           
          },
          dateQuestionarie: "",
          score: ""
        },
      };
      return newAttemptScoreObj;
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
        console.log("Division....");
        return(parseInt(firstNum)/parseInt(secondNum));
    }
}