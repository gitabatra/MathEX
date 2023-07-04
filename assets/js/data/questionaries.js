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
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
}

function getRegisteredUsers(){
    let users = JSON.parse(localStorage.getItem("users"));
    return users;
}

function setLoggedInUserId(userObj,userId){
    userObj[userId].isLoggedIn = true;
    Object.assign(userObj[userId], userObj[userId].isLoggedIn);
    localStorage.setItem("users", JSON.stringify(userObj));
    //set userloginid in localstorage
    localStorage.setItem("loggedInUserID", userId);
}

function checkQuestionaryUpdated(modifiedDate){
    if(modifiedDate === "undefined"){
        //console.log("date is not defined yet..");
    }else{  
        let dateObj = new Date(modifiedDate.year,(modifiedDate.month -1),modifiedDate.day); 
        let currentDate = new Date();
        //currentDate.setHours(0,0,0,0);
        if (dateObj.getTime() < currentDate.getTime()) {
            return true; 
        } else {
            return false;
        }
    }
  }

  function changeQuestionaryStatus(questionarieId){
    $('input#republish-btn').removeAttr('hidden'); 
    $(`span#questionary-status-${questionarieId}`).text("Modified");
    $(`span#questionary-status-${questionarieId}`).addClass("statusModified");
  }