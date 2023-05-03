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



