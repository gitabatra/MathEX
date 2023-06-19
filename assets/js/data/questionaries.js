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

function getRegisteredUsers(){
    let users = JSON.parse(localStorage.getItem("users"));
    console.log("Users in local storage-----------------",users);
    return users;
}

function setLoggedInUserId(userObj,userId){
    console.log("set logged in user id: ",userId);
    userObj[userId].isLoggedIn = true;
    Object.assign(userObj[userId], userObj[userId].isLoggedIn);
    console.log(userObj[userId]);
    localStorage.setItem("users", JSON.stringify(userObj));
    //set userloginid in localstorage
    localStorage.setItem("loggedInUserID", userId);
}

function checkQuestionaryUpdated(modifiedDate){
    if(modifiedDate === "undefined"){
        console.log("date is not defined yet..");
    }else{
        console.log("questionarie date updated or not...........",modifiedDate);
        let dateObj = new Date(modifiedDate.year,(modifiedDate.month -1),modifiedDate.day);
        console.log("converted date...........",dateObj,dateObj.getTime());
        let currentDate = new Date();
        //currentDate.setHours(0,0,0,0);
        console.log("Current Date getTime() : ",currentDate.getTime());
        if (dateObj.getTime() < currentDate.getTime()) {
            console.log("creation date is older");
            return true; 
        } else {
            console.log("creation date Not older");
            return false;
        }
    }
  }

  function changeQuestionaryStatus(questionarieId){
    console.log("Changing Questionary status.....",questionarieId);
    $('input#republish-btn').removeAttr('hidden'); 
    $(`span#questionary-status-${questionarieId}`).text("Modified");
    $(`span#questionary-status-${questionarieId}`).addClass("statusModified");
  }