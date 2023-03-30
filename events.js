function initEvents() {
  $("button#open-questionarie-btn").click(function () {
    console.log("open-questionarie button event is executing");
    //alert("Handler for .click() called.");
    window.location.replace("http://localhost:5500/studentQuestionary.html");
  });

  $("button#open-score-record-btn").click(function () {
    console.log("open score record button event is executing");
    window.location.href = "http://localhost:5500/score_record.html";
  });

  $("button#add-new-questionarie-btn").click(function () {
    console.log("Add new Questionarie button event is executing");
    window.location.href = "http://localhost:5500/addNewTest.html";
  });

  $("button#open-edit-questionarie-btn").click(function () {
    console.log("Edit Questionarie button event is executing");
    window.location.href = "http://localhost:5500/addQuestions.html";
  });

  $("input#publish-btn").click(function () {
    console.log("Publish event is executing");
    window.location.href = "http://localhost:5500/admin.html";
  });

  $("input#check-btn").click(function () {
    console.log("Checking the Questionaries event is executing");
    $("i#question-1-correct").show();
    $("i#question-2-correct").show();
    $("i#question-3-wrong").show();
    $("i#question-4-wrong").show();
  });

  $("input#newTestText").keyup(function () {
    console.log("Enabling plus button on input is executing");
    testName = $(this).val();
    localStorage.setItem("testName",testName);
    console.log("testname is : "+ testName);
    if ($(this).val().trim() != "") {
      console.log("not null");
      $("#addNewTestBtn").prop("disabled", false);
    } else {
      $("#addNewTestBtn").prop("disabled", true);
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
