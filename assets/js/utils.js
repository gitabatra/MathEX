
// function generateNewScoreAttemptID(questionarieId){
//     //getcurrent date in format 20230501 and generate new key
//     let scoreAttemptID = "sa-20230405-1-"+questionarieId;
// }

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

function getDateForQuestionarieAttempt(){
    let currentDate = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour12: false,
      hour: "numeric",
      minute: "numeric"
    };

   return(currentDate.toLocaleDateString("en-US", options));
}
