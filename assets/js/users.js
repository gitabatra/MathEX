function initUsers(){
    refreshUserManagement();
    displayUserData();
    refreshNotification();
}

function displayUserData(){
    let screenWidth = localStorage.getItem("screenWidth");
    let width = $( window ).width();
    localStorage.setItem("screenWidth",width);
    if(width<768){
        $("div#user-data-table").hide();
        $("div#small-screen-user-list").show();
    }else{
        $("div#user-data-table").show();
        $("div#small-screen-user-list").hide();
    }
}

function refreshUserManagement(){
   $("section#user-management-section").append(appendUserDataTable());
   let users = getRegisteredUsers();
   const loggedInUserID = localStorage.getItem('loggedInUserID');
   for (const userId in users) {
    let mainAdmin = ((userId === "u-20230405-01") || (userId === loggedInUserID));
    if (Object.hasOwnProperty.call(users, userId)) {
        let userObject = users[userId];
        let email = userObject.email;
        let password = userObject.password;
        let isAdmin = userObject.isAdmin;
        let position;
        let disable_toggle_button = mainAdmin ? "disabled" : "";
        let checked_toggle_button = "";
        
        if(isAdmin){
            position = "Admin";
            checked_toggle_button = "checked";
            $("div#small-screen-user-list").append(appendUsersListSmallScreen(userId,userObject,position,disable_toggle_button,checked_toggle_button));
            $("tbody#user-data-table").append(appendUserToUsersTable(userId,userObject,position,disable_toggle_button,checked_toggle_button)); 
            $(`span#position-badge-${userId}-${position}`).addClass('badge badge-success rounded-pill d-inline');
            $(`label#switch-check-label-${userId}`).text("Turn to Student");
        }else {
            position = "Student";
            checked_toggle_button = "";
            $("div#small-screen-user-list").append(appendUsersListSmallScreen(userId,userObject,position,disable_toggle_button,checked_toggle_button));
            $("tbody#user-data-table").append(appendUserToUsersTable(userId,userObject,position,disable_toggle_button,checked_toggle_button)); 
            $(`span#position-badge-${userId}-${position}`).addClass('badge badge-info rounded-pill d-inline');
            $(`label#switch-check-label-${userId}`).text("Turn to Admin");
        }  
    }
    // else{
    //     console.log("user id is not defined");
    // }
   } 
}

function refreshNotification(){
    let users = getRegisteredUsers();
    let loggedInUserID = localStorage.getItem("loggedInUserID");
    let userObj = users[loggedInUserID];
    let inboxObj =userObj["inbox"];
    const isNotificationObjectEmpty =  (
        inboxObj &&
        Object.keys(inboxObj).length === 0 &&
        inboxObj.constructor === Object
      );
    if(isNotificationObjectEmpty){
        $("h3#notification-status-message").text("No new notification");
    }else{
        let count = 0;
        let readCount = 0;
        for(const notifyId in inboxObj){
            if (Object.hasOwnProperty.call(inboxObj, notifyId)) {
                count = count+1;
                let monthName =  getMonthName(inboxObj[notifyId]["creationDate"].month);
                let dateString = monthName+" "+(inboxObj[notifyId]["creationDate"].day)+", "+(inboxObj[notifyId]["creationDate"].year)
                $("a#navbar-notification-btn").append(`<span id="inbox-total-notification-${loggedInUserID}" class="badge rounded-pill badge-notification bg-danger"></span>`);
                $("div#notification-list-items").prepend(appendNewNotificationListItem(notifyId,inboxObj[notifyId].description,dateString));
                if(inboxObj[notifyId].isRead){
                    $(`#notification-list-item-${notifyId}`).addClass("checkedReadNotification");
                    readCount = readCount +1;
                }
            }
        }
        count = count-readCount;
        $(`span#inbox-total-notification-${loggedInUserID}`).text(count);

        if(count === 0){
            $(`span#inbox-total-notification-${loggedInUserID}`).hide();
        }else{
            $(`span#inbox-total-notification-${loggedInUserID}`).show();
        }
        
    }
}

$(document).on('change', '.switchAdmin[type=checkbox]', function(event) {
    let targetId = event.target.id;
    let target = targetId.split("_");
    let userId = target[1];
    let users = getRegisteredUsers();

    if(users[userId].isAdmin){
        users[userId].isAdmin = false;
        position = "Student";
        $(`.user-position-${userId}`).text("Student");
        $(`label#switch-check-label-${userId}`).text("Turn to Admin");
    }else{
        users[userId].isAdmin = true;
        position = "Admin";
        $(`.user-position-${userId}`).text("Admin");
        $(`label#switch-check-label-${userId}`).text("Turn to Student");
    }
    Object.assign(users,  users[userId].isAdmin);
    localStorage.setItem("users", JSON.stringify(users));
}); 


function createNewNotification(description){
    let users = getRegisteredUsers();
    let currentDate = getSessionDate();
    let newNotificationKey,newNotificationObj;
    for (const userId in users){
        let userObj = users[userId];
        if(userObj["inbox"]===""){
            newNotificationKey = "n-20230405-01";
        }
        else{
            let nlength = Object.keys(userObj["inbox"]).length;
            newNotificationKey = "n-20230405-0" + (parseInt(nlength) + 1);
        }
        newNotificationObj = createNewNotificationObject(newNotificationKey,description);
    
       Object.assign(userObj["inbox"],{[newNotificationKey] : newNotificationObj[newNotificationKey]});
       localStorage.setItem("users", JSON.stringify(users));
    } 
}

function createNewquestioanryNotification(newQuestionarieKey){
    let questionaries = getQuestionaries();
    let questionarieObj = questionaries[newQuestionarieKey];
    let testName = questionarieObj["name"];
    let description = `${testName} - New Questionary is added!`;
    createNewNotification(description);
}

function createDeleteQuestioanryNotification(questionaryKey){
    let questionaries = getQuestionaries();
    let questionarieObj = questionaries[questionaryKey];
    let testName = questionarieObj["name"];
    let description = `${testName} - Questionary is no longer available!`;
    createNewNotification(description);
}


function createEditquestionaryNotification(){
    let questionaries = getQuestionaries();
    for (const questionarieId in questionaries){
        let questionarieObj = questionaries[questionarieId];
        if((questionarieObj.isQuestionariePublished) && (questionarieObj.isModified)){
            //check the date of creation with the current date, if not same then push notification and change the modification date
            let testName = questionarieObj["name"];
            let description = `${testName} - Questionary is updated!`;
            createNewNotification(description);
        } 
        // else {
        //     console.log("questionary is not modified");
        // }
    }
}

  $('input#republish-btn').click(function(){
    //isNotificationSent: false,
    let questionaries = getQuestionaries();
    let questionarieId = getQuestionarieID();
    let questionarieObj = questionaries[questionarieId];
    $(`div#questionarie-list-item-${questionarieId}`).show();
    $("input#republish-btn").hide();
    $("input#add-new-question-btn").hide();
      let currentDate = getSessionDate();
      Object.assign(questionaries[questionarieId], {
        isModified:false,
        modifiedDate: {
          day: currentDate[0],
          month: currentDate[1],
          year: currentDate[2]
      }
    });
    if(!questionarieObj.isNotificationSent){
        createEditquestionaryNotification();
        Object.assign(questionaries[questionarieId],{isNotificationSent: true});
    }
    // else{
    //   console.log("Modifying on the same day");
    // }
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
    $(`span#questionary-status-${questionarieId}`).removeClass("statusModified");
    $(`span#questionary-status-${questionarieId}`).text("Published");
    $(`span#questionary-status-${questionarieId}`).addClass("questionaryStatus");
  });

$("button#read-all-notifications-btn").click(function (event) {
    let users = getRegisteredUsers();
    let userId = localStorage.getItem("loggedInUserID");
    let userObj = users[userId];
    let inboxObj =userObj["inbox"];

    const isNotificationObjectEmpty =  (
        inboxObj &&
        Object.keys(inboxObj).length === 0 &&
        inboxObj.constructor === Object
      );
    if(!isNotificationObjectEmpty){
            for(const notifyId in inboxObj){
                if (Object.hasOwnProperty.call(inboxObj, notifyId)) {
                    $(`div#notification-list-item-${notifyId}`).addClass("checkedReadNotification");
                    Object.assign(userObj["inbox"][notifyId],{isRead: true});
                }
            }
        }
    let count = 0;
    $(`span#inbox-total-notification-${userId}`).text(count);
    $(`span#inbox-total-notification-${userId}`).hide();
     localStorage.setItem("users", JSON.stringify(users));
});