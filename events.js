function initEvents() {
  // $(document).on("click", "button#open-questionarie-btn", function () {
  //   console.log("open-questionarie button event is executing");
  //   window.location.href = "http://localhost:5500/studentQuestionary.html";
  // });

  // $(document).on("click", "button#open-score-record-btn", function () {
  //   console.log("open score button event is executing");
  //   window.location.href = "http://localhost:5500/score_record.html";
  // });

  $("button#add-new-questionarie-btn").click(function () {
    console.log("Add new Questionarie button event is executing");
    window.location.href = "http://localhost:5500/addNewTest.html";
  });

 

  // $(document).on("click", "button#open-edit-questionarie-btn", function () {
  //   console.log("Edit Questionarie button event is executing");

  //  // window.location.href = "http://localhost:5500/addQuestions.html";
  // });

  $(document).on("click", "button#delete-questionarie-btn", function () {
    console.log("Delete Questionarie button event is executing");
    let questionaryKey = $(this).parent().attr("key");
    let targetId = $("div#questionarie-grid-item-" + questionaryKey);
    console.log(
      "Removing object with id : ",
      targetId,
      " and key ",
      questionaryKey
    );
    targetId.remove();
    console.log(targetId);

    let questionaries = JSON.parse(localStorage.getItem("questionaries"));
    delete questionaries[questionaryKey];
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
  });

  $(document).on("click", "a#delete-question-link", function () {
    console.log("Delete Question from List event is executing");
    let questionKey = $(this).attr("key");
    let targetId = $("div#question-" + questionKey);
    console.log(
      "Removing object with id : ",
      targetId,
      " and key ",
      questionKey
    );
    targetId.remove();

    //get questionarie from URL
    let questionarieId = new URLSearchParams(window.location.search).get(
      "questionarie-id"
    );
    let questionaries = JSON.parse(localStorage.getItem("questionaries"));
    console.log(questionaries[questionarieId]["questions"][questionKey]);

    delete questionaries[questionarieId]["questions"][questionKey];
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
  });

  $("input#student-questionarie-finish-btn").click(function () {
    console.log("Finish Questionarie button event is executing");
    //alert("Have you checked your questions before finishing?");
    let questionarieId = new URLSearchParams(window.location.search).get(
      "questionarie-id"
    );
    let questionaries = JSON.parse(localStorage.getItem("questionaries"));
    console.log("questionarieid: ",questionaries[questionarieId]);

    let currentDate = new Date();
    const options= {
      weekday: "long",
      day: "numeric",
      month: "long"
    };
   
    console.log(currentDate.toLocaleDateString("en-US",options));
    $("#date-questionarie-attempt-"+questionarieId).text(currentDate.toLocaleDateString("en-US",options));

    Object.assign(questionaries[questionarieId], {
      dateQuestionarie: currentDate.toLocaleDateString("en-US",options)
    });
    
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
    refreshScoreRecord();
   
    // console.log("button#open-score-questionarie-btn-"+questionarieId);
    
    //$("button#open-score-questionarie-btn-"+questionarieId).show();
    //appendScoreBtnForQuestionarie(questionarieId);

    //localStorage.setItem("questionaries", JSON.stringify(questionaries));
  
    //window.location.href = "http://localhost:5500/index.html";
  });

  $("input#publish-btn").click(function (event) {
    console.log(event.delegateTarget);
    console.log("Publish event is executing");
    let questionarieId = new URLSearchParams(window.location.search).get(
      "questionarie-id"
    );
    let questionaries = JSON.parse(localStorage.getItem("questionaries"));

    $("div#add-question-from-popupdata")
      .children()
      .each(function (idx, itm) {
        let quesitonId = itm.id.replace("question-", "");
        let operationArr = $(itm).text().trim().split(" ");
        let firstNumber = parseInt(operationArr[0]);
        let operator = operationArr[1];
        let secondNumber = parseInt(operationArr[2]);
        console.log(
          "Operation of question ",
          questionarieId,
          quesitonId,
          firstNumber,
          operator,
          secondNumber
        );

        Object.assign(questionaries[questionarieId]["questions"][quesitonId], {
          num1: firstNumber,
          num2: secondNumber,
          type: operator,
        });
        // questionaries[questionarieId]["questions"][quesitonId]["num1"];
        // questionaries[questionarieId]["questions"][quesitonId]["num2"];
        // questionaries[questionarieId]["questions"][quesitonId]["type"];
      });

    // localStorage.setItem("questionaries", JSON.stringify(questionaries))
    //const isPublishBtnClicked = true;
    //let questionarieObj = appendDataToQuestionarie();
    //refreshQuestionarieLocalStorage(questionarieObj);
    //refreshQuestionarieList();
    // window.location.href = "http://localhost:5500/admin.html";
  });

  $("#inputNumber").change(function () {
    let inputDigit = parseInt($("#inputNumber").val());
    console.log("input change");
    console.log(inputDigit);
    $("#inputNumber1").attr("data-parsley-min", 1);
    $("#inputNumber2").attr("data-parsley-min", 1);
    if (inputDigit === 1) {
      console.log("digit 1");
      $("#inputNumber1").attr("data-parsley-max", 9);
      $("#inputNumber2").attr("data-parsley-max", 9);
      //$('#inputNumber2').attr('data-parsley-error-message', "The value should be between 1 an 9.");
    } else if (inputDigit === 2) {
      console.log("digit 2");
      $("#inputNumber1").attr("data-parsley-max", 99);
      $("#inputNumber2").attr("data-parsley-max", 99);
    } else if (inputDigit === 3) {
      $("#inputNumber1").attr("data-parsley-max", 999);
      $("#inputNumber2").attr("data-parsley-max", 999);
    } else if (inputDigit === 4) {
      $("#inputNumber1").attr("data-parsley-max", 9999);
      $("#inputNumber2").attr("data-parsley-max", 9999);
    }
  });

  $("button#pop-up-submit-btn").click(function (event) {
    console.log("PopUp Submit button on AddNewTest page is executing");
    //event.preventDefault();
    let testName = $("input#new-questionarie-name").val();
    console.log("Test Name in Submit Button", testName);
    
    //Check if the testname is already taken up then alert else make new questionarie and save to localstorage
    let isTestNameAlreadyTaken = false;
    isTestNameAlreadyTaken = checkQuestionaryName(testName);
    console.log(isTestNameAlreadyTaken);
    if(isTestNameAlreadyTaken){
      alert("Questionarie with the given name already exist. Please change the name");
    } else{   
      let $inputs = $("#popup-form :input");
      let popupData = {};
      $inputs.each(function () {
        popupData[this.name] = $(this).val();
        console.log(popupData[this.name]);
      //appendQuestionsToList(popupData);
      });
      if (
        popupData["ndigit"] != "" &&
        popupData["num1"] != "" &&
        popupData["num2"] != ""
      ) {
        console.log("Pop up object data is not empty", popupData);
        event.preventDefault();
        let correctAns = null;
        popupData["num1"] = parseInt(popupData["num1"]);
        popupData["num2"] = parseInt(popupData["num2"]);
        popupData["ndigit"] = parseInt(popupData["ndigit"]);
  
        popupData["givenAns"] = "";
        if (popupData["type"] === "+") {
          correctAns = popupData["num1"] + popupData["num2"];
        } else if (popupData["type"] === "-") {
          correctAns = popupData["num1"] - popupData["num2"];
        } else if (popupData["type"] === "x") {
          correctAns = popupData["num1"] * popupData["num2"];
        } else if (popupData["type"] === "/") {
          correctAns = popupData["num1"] / popupData["num2"];
        }
        popupData["correctAns"] = correctAns;
  
        console.log("PopupData : ", popupData);
        let questionaries = JSON.parse(localStorage.getItem("questionaries"));
        let qlength = Object.keys(questionaries).length;

      console.log("Object Keys",Object.keys(questionaries),"Length of Questionaries ",qlength);
      qlength = Object.keys(questionaries)[qlength-1].slice(-1);
      console.log("QLength --- : ", parseInt(qlength));
      let newQuestionarieKey = "qs-20230405-0"+(parseInt(qlength)+1);
      console.log("New Questionarie Key: ",newQuestionarieKey);
 
      let newQuestionariesObj = {[newQuestionarieKey] : {"name": testName, "questions":{"q-20230405-01" : {"ndigit" : popupData.ndigit, 
      "num1": popupData.num1, "num2": popupData.num2, "type": popupData.type, "givenAns":"","correctAns": popupData.correctAns}}, dateQuestionarie:"",score:""}}
      //let newQuestionariesObj = {[newQuestionarieKey] : {"name": testName, "questions":{"q-20230405-01" : {}}}};
      console.log("New Questionarie", newQuestionariesObj);
    
      Object.assign(questionaries, newQuestionariesObj);
      console.log(questionaries);

      window.location.href = "./addQuestions.html?questionarie-id="+newQuestionarieKey;
      //location.reload(true);
    
      localStorage.setItem("questionaries", JSON.stringify(questionaries));
      }    
    }
  
  });

  function checkQuestionaryName(testName){
    console.log("Checking Questionarie name already exist or not");
    let questionaries = JSON.parse(localStorage.getItem("questionaries"));
    console.log(testName);
    console.log("createQuestionaries: ", questionaries);
  
    for (const questionarieId in questionaries) {
      if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
        let questionarieObject = questionaries[questionarieId];
        console.log(questionarieObject.name);
        let questionarieName = questionarieObject["name"].toLowerCase().replace(" ","");
        let inputTestName = testName.toLowerCase().replace(" ","");
        if (questionarieName == inputTestName) {
          console.log("testname already exists");
          return true;
        }
      }
    }
  }

  $("button#pop-up-submit-save-btn").click(function (event) {
    //alert( "Handler for .submit() called." );
    // event.preventDefault();

    // get all the inputs.
    let testName = $("input#new-questionarie-name").val();
    console.log("Test Name in Submit Button", testName);

    let $inputs = $("#popup-form :input");
    let popupData = {};
    $inputs.each(function () {
      popupData[this.name] = $(this).val();
      console.log(popupData[this.name]);
      console.log(typeof popupData[this.name]);
    });

    if (
      popupData["ndigit"] != "" &&
      popupData["num1"] != "" &&
      popupData["num2"] != ""
    ) {
      console.log("Pop up object data is not empty", popupData);
      event.preventDefault();
      let correctAns = null;
      popupData["num1"] = parseInt(popupData["num1"]);
      popupData["num2"] = parseInt(popupData["num2"]);
      popupData["ndigit"] = parseInt(popupData["ndigit"]);

      popupData["givenAns"] = "";
      if (popupData["type"] === "+") {
        correctAns = popupData["num1"] + popupData["num2"];
      } else if (popupData["type"] === "-") {
        correctAns = popupData["num1"] - popupData["num2"];
      } else if (popupData["type"] === "x") {
        correctAns = popupData["num1"] * popupData["num2"];
      } else if (popupData["type"] === "/") {
        correctAns = popupData["num1"] / popupData["num2"];
      }
      popupData["correctAns"] = correctAns;

      console.log("PopupData : ", popupData);
      appendQuestionsToList(popupData);
      $("#basicQuestionModal").modal("hide");
    } else {
      console.log("Please enter valid data");
    }
  });

  $("input#student-questionarie-check-btn").click(function () {
    console.log("Checking the Questionaries event is executing");
    checkQuestionarie();
  });

  $("input#new-questionarie-name").keyup(function () {
    console.log("Enabling plus button on input is executing");
    testName = $(this).val();
   
    console.log("testname is : " + testName);
    if ($(this).val().trim() != "") {
      console.log("not null");
      $("#add-new-questionarie-test-btn").prop("disabled", false);
    } else {
      $("#add-new-questionarie-test-btn").prop("disabled", true);
    }
  });
}

function onChange(obj) {
  var id = $(obj).attr("id");
  switch (id) {
    case "navbar-student-btn":
      window.location.href = "http://localhost:5500/index.html";
      break;

    case "navbar-admin-btn":
      window.location.href = "http://localhost:5500/admin.html";
      break;
  }
}
