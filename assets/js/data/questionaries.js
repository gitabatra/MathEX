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

// function getNewQuestionarieAttemptID(questionarieId){
//     let questionaries = getQuestionaries();
//     let questionarieObj = questionaries[questionarieId];
//     let scoreAttemptObj = questionarieObj["scoreAttempts"];
//     return(scoreAttemptObj)
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
          isQuestionariePublished: false,
        },
      };
      return newQuestionariesObj;
}