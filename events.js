function initEvents() {
  
 
  // $("link#navbar-student-btn").click(function () {
  //   console.log("open Student Page navbar button event is executing");
  //   window.location.href = "http://localhost:5500/index.html";
  // });

  // $("link#navbar-admin-btn").click(function () {
  //   console.log("open Admin Page navbar button event is executing");
  //   window.location.href = "http://localhost:5500/admin.html";
  // });

  $("button#open-questionarie-btn").click(function () {
    console.log("open-questionarie button event is executing");
    //alert("Handler for .click() called.");
    window.location.replace("http://localhost:5500/studentQuestionary.html"); 
  });

  $("button#open-score-record-btn").click(function () {
    console.log("open score record button event is executing");
    window.location.href = "http://localhost:5500/score_record.html";
  });

  $("button#add-new-questionarie-Btn").click(function () {
    console.log("Add new Questionarie button event is executing");
    window.location.href = "http://localhost:5500/addNewTest.html";
  });

  $("button#open-edit-questionarie-btn").click(function () {
    console.log("Edit Questionarie button event is executing");
    window.location.href = "http://localhost:5500/addQuestions.html";
  });
}
