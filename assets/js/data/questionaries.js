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
    return users;
}

function getUserID(){
    let urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get("user-id");
    return userId;
}

function setLoggedInUserId(userObj,userId){
    userObj[userId].isLoggedIn = true;
    Object.assign(userObj[userId], userObj[userId].isLoggedIn);
    console.log(userObj[userId]);
    localStorage.setItem("users", JSON.stringify(userObj));
    //set userloginid in localstorage
    localStorage.setItem("loggedInUserID", userId);
}