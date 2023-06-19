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
   const loggedInUserID = localStorage.getItem('loggedInUserID');
   for (const userId in users) {
    let mainAdmin = ((userId === "u-20230405-01") || (userId === loggedInUserID));
    console.log("userId : ",userId);
    if (Object.hasOwnProperty.call(users, userId)) {
       
        let userObject = users[userId];
        console.log("userId : ",userObject);
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
    console.log("USer object while refreshing notifications: ",userObj);
    let inboxObj =userObj["inbox"];
    console.log("Notifications are there ornot: ",inboxObj);
    const isNotificationObjectEmpty =  (
        inboxObj &&
        Object.keys(inboxObj).length === 0 &&
        inboxObj.constructor === Object
      );
    if(isNotificationObjectEmpty){
        //toastr.warning("No new Notifications!","",{positionClass: "toast-bottom-right",extendedTimeOut: 1000,timeOut: 3000});
        console.log("No new notification............");
        $("h3#notification-status-message").text("No new notification");
    }else{
        console.log("Check the Notifications......");
        let count = 0;
        let readCount = 0;
        for(const notifyId in inboxObj){
            if (Object.hasOwnProperty.call(inboxObj, notifyId)) {
                count = count+1;
                console.log("Notification Id: ",notifyId);
                let monthName =  getMonthName(inboxObj[notifyId]["creationDate"].month);
                let dateString = monthName+" "+(inboxObj[notifyId]["creationDate"].day)+", "+(inboxObj[notifyId]["creationDate"].year)
                console.log("creation date: ",dateString);
                $("a#navbar-notification-btn").append(`<span id="inbox-total-notification-${loggedInUserID}" class="badge rounded-pill badge-notification bg-danger"></span>`);
                $("div#notification-list-items").prepend(appendNewNotificationListItem(notifyId,inboxObj[notifyId].description,dateString));
                console.log("Notification has been read or not: ",inboxObj[notifyId].isRead);
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
    console.log("Checked the Switch********",targetId,event.target);
    let target = targetId.split("_");
    let userId = target[1];
    let users = getRegisteredUsers();

    if(users[userId].isAdmin){
        console.log("Turned to Student",users[userId].isAdmin);
        users[userId].isAdmin = false;
        position = "Student";
        $(`.user-position-${userId}`).text("Student");
        $(`label#switch-check-label-${userId}`).text("Turn to Admin");
    }else{
        console.log("Turned to Admin",users[userId].isAdmin);
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
      let currentDate = getSessionDate();
      Object.assign(questionaries[questionarieId], {
        isModified:false,
        modifiedDate: {
          day: currentDate[0],
          month: currentDate[1],
          year: currentDate[2]
      }
    });

   // Object.assign(questionaries[questionarieId],{isModified: false});
    if(!questionarieObj.isNotificationSent){
        createEditquestionaryNotification();
        Object.assign(questionaries[questionarieId],{isNotificationSent: true});
    }
    else{
      console.log("Modifying on the same day");
    }
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
    $(`span#questionary-status-${questionarieId}`).removeClass("statusModified");
    $(`span#questionary-status-${questionarieId}`).text("Published");
    $(`span#questionary-status-${questionarieId}`).addClass("questionaryStatus");
  });

$("button#read-all-notifications-btn").click(function (event) {
    console.log("Click event on READ ALL btn is executing...........");
    let users = getRegisteredUsers();
    let userId = localStorage.getItem("loggedInUserID");
    let userObj = users[userId];
    console.log("**************USer object: ",userObj);
    let inboxObj =userObj["inbox"];
    console.log("Notifications are there or not: ",inboxObj);
    const isNotificationObjectEmpty =  (
        inboxObj &&
        Object.keys(inboxObj).length === 0 &&
        inboxObj.constructor === Object
      );
    if(!isNotificationObjectEmpty){
        console.log("Notifications are present for this user........");
            for(const notifyId in inboxObj){
                if (Object.hasOwnProperty.call(inboxObj, notifyId)) {
                    console.log("Notification Id: ",notifyId);
                    $(`#notification-list-item-${notifyId}`).addClass("checkedReadNotification");
                    Object.assign(userObj["inbox"][notifyId],{isRead: true});
                    // Object.assign(userObj,{hasNotifications: false});
                }
            }
        }
    let count = 0;
    $(`span#inbox-total-notification-${userId}`).text(count);
    $(`span#inbox-total-notification-${userId}`).hide();
     localStorage.setItem("users", JSON.stringify(users));
     console.log("Read after assigning: ", users[userId]);
});