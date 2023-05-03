function initEvents() {

  //Open page to add new Questionarie
  $("button#add-new-questionarie-btn").click(function () {
    console.log("Add new Questionarie button event is executing");
    window.location.href = "http://localhost:5500/addNewTest.html";
  });

  //Open questionarie
  $(document).on("click", "button#delete-questionarie-btn", function () {
    console.log("Open Questionarie on pressing GO button event is executing");

  });

  //Delete questionarie
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

    let questionaries = getQuestionaries();
    delete questionaries[questionaryKey];
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
  });

  //Delete Question from a Questionarie
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
    let questionarieId = getQuestionarieID();
    let questionaries = getQuestionaries();
    console.log(questionaries[questionarieId]["questions"][questionKey]);

    delete questionaries[questionarieId]["questions"][questionKey];
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
  });

  //Student finish button 
  $("input#student-questionarie-finish-btn").click(function () {
    console.log("Finish Questionarie button event is executing");
    let questionarieId = getQuestionarieID();
    let questionaries = getQuestionaries();
    console.log("On finish btn:  ", questionaries[questionarieId]);
    let questionarieObj = questionaries[questionarieId];
    let scoreAttemptID = createNewScoreAttemptID(questionarieId);
    let scoreRecordObject = questionarieObj["scoreAttempts"][scoreAttemptID];
    console.log("Score Record while clicking on Finish Button: ",scoreRecordObject);
    let currentDate = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };

    console.log(currentDate.toLocaleDateString("en-US", options));
    $("#date-questionarie-attempt-" + questionarieId).text(
      currentDate.toLocaleDateString("en-US", options)
    );

    Object.assign(scoreRecordObject, {
      dateQuestionarie: currentDate.toLocaleDateString("en-US", options)
    });

    localStorage.setItem("questionaries", JSON.stringify(questionaries));
    window.location.href = "http://localhost:5500/index.html";
  });

  //Admin Publish Button
  $("input#publish-btn").click(function (event) {
    console.log(event.delegateTarget);
    console.log("Publish event is executing");
    let questionarieId = getQuestionarieID();
    let questionaries = getQuestionaries();
    console.log(questionaries[questionarieId].isQuestionariePublished);
    Object.assign(questionaries[questionarieId], {
      isQuestionariePublished: true,
    });
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
  });

  //Pop up Client-side parsley Validation
  $("#inputNumber").change(function () {
    let inputDigit = parseInt($("#inputNumber").val());
    $("#inputNumber1").attr("data-parsley-min", 1);
    $("#inputNumber2").attr("data-parsley-min", 1);
    if (inputDigit === 1) {
      console.log("digit 1");
      $("#inputNumber1").attr("data-parsley-max", 9);
      $("#inputNumber2").attr("data-parsley-max", 9);
    } else if (inputDigit === 2) {
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
    let testName = $("input#new-questionarie-name").val();
    let popupData = fetchPopUpData(event);
    if (popupData != null) {
      console.log("PopupData : ", popupData);
      let questionaries = JSON.parse(localStorage.getItem("questionaries"));
      let qlength = Object.keys(questionaries).length;
      if (qlength > 0) {
        qlength = Object.keys(questionaries)[qlength - 1].substring(13);
      }
      let newQuestionarieKey = "qs-20230405-0" + (parseInt(qlength) + 1);
      newQuestionariesObj = createNewQuestionarie(newQuestionarieKey,testName,popupData);
      console.log("New Questionarie", newQuestionariesObj);
      Object.assign(questionaries, newQuestionariesObj);
      console.log(questionaries);
      localStorage.setItem("questionaries", JSON.stringify(questionaries));
      window.location.href =
        "./addQuestions.html?questionarie-id=" + newQuestionarieKey;
    }
  });

  function checkQuestionaryName(testName) {
    console.log("Checking Questionarie name already exist or not");
    let questionaries = JSON.parse(localStorage.getItem("questionaries"));
    let isTestNameAvailable = false;
    for (const questionarieId in questionaries) {
      if (Object.hasOwnProperty.call(questionaries, questionarieId)) {
        let questionarieObject = questionaries[questionarieId];
        console.log(questionarieObject.name);
        let questionarieName = questionarieObject["name"]
          .toLowerCase()
          .replace(" ", "");
        let inputTestName = testName.toLowerCase().replace(" ", "");
        if (questionarieName == inputTestName) {
          console.log("testname already exists");
          toastr.warning(
            "Test with the given name already exist. Please change the name"
          );
          isTestNameAvailable = true;
        } else {
          //toastr.success("Test name is available");
          console.log("Questionary name is available");
        }
      }
    }
    return isTestNameAvailable;
  }

  function fetchPopUpData(event) {
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
      //let correctAns = null;
      popupData["num1"] = popupData["num1"].replace(/[^0-9 ]/g, "");
      popupData["num2"] = popupData["num2"].replace(/[^0-9 ]/g, "");
      popupData["ndigit"] = popupData["ndigit"].replace(/[^0-9 ]/g, "");
      popupData["num1"] = popupData["num1"].substr(0, popupData.ndigit);
      popupData["num2"] = popupData["num2"].substr(0, popupData.ndigit);
      console.log(
        "Number 1 and Number 2 after validation: ",
        popupData["num1"].substr(popupData.ndigit),
        popupData["num2"].substr(popupData.ndigit)
      );

      if (
        parseInt(popupData["num1"]) < parseInt(popupData["num2"]) &&
        popupData["type"] == "-"
      ) {
        console.log("Number 1 is smaller than number 2");
        let number1 = parseInt(popupData["num1"]);
        popupData["num1"] = parseInt(popupData["num2"]);
        popupData["num2"] = number1;
      } else {
        popupData["num1"] = parseInt(popupData["num1"]);
        popupData["num2"] = parseInt(popupData["num2"]);
      }
      popupData["ndigit"] = parseInt(popupData["ndigit"]);
      return popupData;
    }
  }

  $("button#pop-up-submit-save-btn").click(function (event) {
    console.log("Pop up Save Btn event is executing...");
    let popupData = fetchPopUpData(event);
    console.log("PopupData : ", popupData);
    appendNewQuestionToList(popupData);
    $("#basicQuestionModal").modal("hide");
  });

  $("input#student-questionarie-check-btn").click(function () {
    console.log("Checking the Questionaries event is executing");
    checkQuestionarie();
    //Enable Finish Button
    $("input#student-questionarie-finish-btn").prop("disabled", false);
  });

  $("input#new-questionarie-name").keyup(function () {
    console.log("Enabling plus button on input is executing");
    let testName = $(this).val();
    let isTestNameAlreadyTaken;
    isTestNameAlreadyTaken = checkQuestionaryName(testName);
    console.log("Tast name is taken or not: ", isTestNameAlreadyTaken);

    console.log("testname is : " + testName);
    if ($(this).val().trim() != "" && !isTestNameAlreadyTaken) {
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

