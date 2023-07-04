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
          // scoreAttempts: {},
          isQuestionariePublished: false,
          isModified:false,
          isNotificationSent: false,
          modifiedDate: {
            day: 10,
            month: 10,
            year: 2020
        }
        },
      };

      // FOR LOOP ON ALL USERS AND ADD A NOTIFICATION SAYING A NEW QUESTIONARIE IS AVAILABLE

      return newQuestionariesObj;
}


function createNewScoreObject(scoreId){
  let newScoreObject = {
     [scoreId] :{
      "scoreAttempts" :{
       
      }
      
     }
    };
    localStorage.setItem("scores", JSON.stringify(newScoreObject));
    return newScoreObject;
}

function getDateForQuestionaryAttempt(){
  let currentDate = new Date();
  let year = currentDate.getFullYear().toString();
  let month = currentDate.getMonth().toString();
  let day = currentDate.getDate().toString();
  month = (month>9 ? "":"0")+month;
  day = (day>9 ? "":"0")+day;
  let dateString =  (year+month+day);
  return dateString;
}

function createNewScoreAttemptID(questionarieId,loggedInUserId){
  let currentDate = getDateForQuestionaryAttempt();
   let scoreId = questionarieId+"_"+loggedInUserId;
   let users = getRegisteredUsers();
   let userId = localStorage.getItem("loggedInUserID");
   let scoreObj = users[userId]["scores"];
  
   let qlength = Object.keys(scoreObj[scoreId]["scoreAttempts"]).length;
   let attemptCount = qlength+1;

   dateString = "sa-"+currentDate+"-"+attemptCount+"_"+questionarieId+"_"+loggedInUserId;
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



function createNewUserRegistrationObject(newUserID,registrationData,sessionDate){
  let newUserObject = {
      [newUserID]: {
        username: registrationData.username,
        email: registrationData.email,
        password: registrationData.password,
        lastSession: {
              day: sessionDate[0],
              month: sessionDate[1],
              year: sessionDate[2]
            },
            isAdmin: false,
            isLoggedIn: true,
            scores: {},
            inbox: {
             
            }
      }
    };
    return newUserObject;
}

function createNewNotificationObject(newNotificationId,description){
  let currentDate = getSessionDate();
  let newNotificationObj = {
    [newNotificationId]: {
      description: description,
      creationDate: {
        day: currentDate[0],
        month: currentDate[1],
        year: currentDate[2]
      },
      isRead:false
}
  }
  return newNotificationObj;
}

function getSessionDate(){
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = (currentDate.getMonth()+1);
  let year = currentDate.getFullYear();
  return ([day,month,year]);
}

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('en-US', { month: 'short' });
}
