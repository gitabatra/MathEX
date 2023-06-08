function initUsers(){
    refreshUserManagement();
    displayUserData();
    refreshNotification();
}

function displayUserData(){
    let screenWidth = localStorage.getItem("screenWidth");
    let width = $( window ).width();
    localStorage.setItem("screenWidth",width);
    console.log("------------------------------------------Width of screen: ",width);
    if(width<768){
        console.log("Screen size is small");
        $("div#user-data-table").hide();
        $("div#small-screen-user-list").show();
    }else{
        console.log("Screen size is 768 or up.......");
        $("div#user-data-table").show();
        $("div#small-screen-user-list").hide();
    }
}

function refreshUserManagement(){
   console.log("Adding users to User Management...............................");
   $("section#user-management-section").append(appendUserDataTable());
   let users = getRegisteredUsers();
   console.log("All users : ",users);
   //let isScreenSmall = checkIfScreenSmall();
   for (const userId in users) {
    let mainAdmin = (userId === "u-20230405-01");
    console.log("userId : ",userId);
    if (Object.hasOwnProperty.call(users, userId)) {
       
        let userObject = users[userId];
        console.log("userId : ",userObject);
        let email = userObject.email;
        let password = userObject.password;
        let isAdmin = userObject.isAdmin;
        let position;
        let disable_toggle_button = mainAdmin ? "disabled" : "";
        let checked_toggle_button = "checked";
        
        if(isAdmin){
            position = "Admin";
            checked_toggle_button = "checked";
            $("div#small-screen-user-list").append(appendUsersListSmallScreen(userId,userObject,position,disable_toggle_button,checked_toggle_button));
            $("tbody#user-data-table").append(appendUserToUsersTable(userId,userObject,position,disable_toggle_button,checked_toggle_button)); 
            $(`span#position-badge-${userId}-${position}`).addClass('badge badge-success rounded-pill d-inline');
        }else {
            position = "Student";
            checked_toggle_button = "";
            $("div#small-screen-user-list").append(appendUsersListSmallScreen(userId,userObject,position,disable_toggle_button,checked_toggle_button));
            $("tbody#user-data-table").append(appendUserToUsersTable(userId,userObject,position,disable_toggle_button,checked_toggle_button)); 
            $(`span#position-badge-${userId}-${position}`).addClass('badge badge-info rounded-pill d-inline');
        }
        console.log("userId : ",userId,"email: ",email,"password: ",password);
       
    }else{
        console.log("user id is not defined");
    }
   } 
}

function refreshNotification(){
    console.log("refreshing notifications.........................");
    let users = getRegisteredUsers();
    let loggedInUserID = localStorage.getItem("loggedInUserID");
    let userObj = users[loggedInUserID];
    let inboxObj =userObj["inbox"];
    let count = 0;
    for(const notifyId in inboxObj){
        if (Object.hasOwnProperty.call(inboxObj, notifyId)) {
            count = count+1;
            console.log("Notification Id: ",notifyId);
            let monthName =  getMonthName(inboxObj[notifyId]["creationDate"].month);
            let dateString = monthName+" "+(inboxObj[notifyId]["creationDate"].day)+", "+(inboxObj[notifyId]["creationDate"].year)
            console.log("creation date: ",dateString);
            $("div#notification-list").append(appendNewNotificationListItem(notifyId,inboxObj[notifyId].description,dateString));
            console.log("Notification has been read or not: ",inboxObj[notifyId].isRead);
            if(inboxObj[notifyId].isRead){
                $(`input#flex-read-check_${notifyId}`).prop("checked", true);
                $(`#notification-list-item-${notifyId}`).addClass("checkedReadNotification");
            }
        }
    }
    $("span#inbox-total-notification").text(count);
    
}

$(document).on('change', '.switchAdmin[type=checkbox]', function(event) {
    let targetId = event.target.id;
    console.log("Checked the Switch********",targetId);
    let target = targetId.split("_");
    let userId = target[1];
    let users = getRegisteredUsers();
    if( $('#'+targetId).is(':checked') ){
        users[userId].isAdmin = true;
        position = "Admin";
        $(`.user-position-${userId}`).text("Admin");
        $(`label#switch-check-label-${userId}`).text("Turn to Student");
        $('#'+targetId).attr('Checked','Checked');
    } else{
        users[userId].isAdmin = false;
        position = "Student";
        $(`.user-position-${userId}`).text("Student");
        $(`label#switch-check-label-${userId}`).text("Turn to Admin");
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
        console.log("users data: ",userObj["inbox"],userId);
        
        if(userObj["inbox"]===""){
            newNotificationKey = "n-20230405-01";
        }
        else{
            let nlength = Object.keys(userObj["inbox"]).length;
            newNotificationKey = "n-20230405-0" + (parseInt(nlength) + 1);
        }
        console.log("New notification key: ",newNotificationKey);
        newNotificationObj = createNewNotificationObject(newNotificationKey,description);
        console.log(newNotificationObj);
    
       Object.assign(userObj["inbox"],{[newNotificationKey] : newNotificationObj[newNotificationKey]});
       localStorage.setItem("users", JSON.stringify(users));
    } 
}

function createNewquestioanryNotification(newQuestionarieKey){
    console.log("Notification foe new Questionary is executing..........");
    let questionaries = getQuestionaries();
    let questionarieObj = questionaries[newQuestionarieKey];
    console.log("Test updated (question deleted): ",questionarieObj.isModified);
    let testName = questionarieObj["name"];
    let description = `${testName} - New Questionary is added!`;
    console.log("Test updated (question deleted): ",questionarieObj.isModified, description);
    createNewNotification(description);
}

function createDeleteQuestioanryNotification(questionaryKey){
    console.log("Notification foe new Questionary is executing..........",questionaryKey);
    let questionaries = getQuestionaries();
    let questionarieObj = questionaries[questionaryKey];
    console.log("Test updated (question deleted): ",questionarieObj.isModified);
    let testName = questionarieObj["name"];
    let description = `${testName} - Questionary is no longer available!`;
    console.log("Test updated (question deleted): ",questionarieObj.isModified, description);
    createNewNotification(description);
}


function createEditquestionaryNotification(){
    console.log("Creating edit notification...........");
    let questionaries = getQuestionaries();
    for (const questionarieId in questionaries){
        let questionarieObj = questionaries[questionarieId];
        console.log("Notification - Questionary Object: ",questionarieObj);
        if((questionarieObj.isQuestionariePublished) && (questionarieObj.isModified)){
            //check the date of creation with the current date, if not same then push notification and change the modification date
            console.log("creation date: ",questionarieObj.creationDate);
            console.log("questioanry : ",questionarieObj["name"],"is updated");
            let testName = questionarieObj["name"];
            let description = `${testName} - Questionary is updated!`;
            console.log("Test updated (question deleted): ",questionarieObj.isModified, description);
            createNewNotification(description);

        } else {
            console.log("questionary is not modified");
        }
    }
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
            return true;
            console.log("creation date is older");
        } else {
            return false;
            console.log("Not equal");
        }
    }
  }

  $('input#republish-btn').click(function(){
    console.log("Notify users while updating the questionary..........");
    //isNotificationSent: false,
    let questionaries = getQuestionaries();
    let questionarieId = getQuestionarieID();
    let questionarieObj = questionaries[questionarieId];
    console.log("Notification sent or not: ",questionarieObj.isNotificationSent);
    $(`div#questionarie-list-item-${questionarieId}`).show();
    $("input#republish-btn").hide();
    $("input#add-new-question-btn").hide();

    Object.assign(questionaries[questionarieId],{isModified: false});
    if(!questionarieObj.isNotificationSent){
        createEditquestionaryNotification();
        Object.assign(questionaries[questionarieId],{isNotificationSent: true});
    }
    else{
      console.log("Modifying on the same day");
    }
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
  })

$(document).on('change', '.switchRead[type=checkbox]', function(event) {
    console.log("On clicking /read notification........");
    let targetId = event.target.id;
    let target = targetId.split("_");
    let notificationId = target[1];
    let users = getRegisteredUsers();
    let userId = localStorage.getItem("loggedInUserID");
    let userObj = users[userId];
    console.log("USer object: ",userObj);
    
    if($('#'+targetId).is(':checked')){
        $(`#notification-list-item-${notificationId}`).addClass("checkedReadNotification");
        Object.assign(userObj["inbox"][notificationId],{isRead: true});
        
    } else {
        console.log("USer is Admin so no modification in notifiactions.......");
        $(`#notification-list-item-${notificationId}`).removeClass("checkedReadNotification");
        Object.assign(userObj["inbox"][notificationId],{isRead: false});
    }
    localStorage.setItem("users", JSON.stringify(users));
        console.log("Read after assigning: ", users[userId]);
}); 