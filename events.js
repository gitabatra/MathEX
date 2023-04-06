var publishEventClickCount = 0;

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
  //   window.location.href = "http://localhost:5500/addQuestions.html";
  // });

  $("input#student-questionarie-finish-btn").click(function () {
    console.log("Finish Questionarie button event is executing");
    window.location.href = "http://localhost:5500/index.html";
  });

  $("input#publish-btn").click(function (event) {
    console.log(event.delegateTarget);
    console.log("Publish event is executing");
    const isPublishBtnClicked = true;
    //publishEventClickCount = publishEventClickCount + 1;
    //console.log(publishEventClickCount);
    localStorage.setItem("isPublishBtnClicked", isPublishBtnClicked);
    //localStorage.setItem("publishEventClickCount", publishEventClickCount);
    window.location.href = "http://localhost:5500/admin.html";
  });

  $("button#pop-up-submit-btn").click(function () {
    console.log("Pop-up Submit button event is executing");
    const questionType = $("#select-question-type :selected").text();
    console.log(questionType);
    localStorage.setItem("questionType", questionType);
    var noOfDigits = $("#inputNumber").val();
    console.log(noOfDigits);
    var firstNum = $("#inputNumber1").val();
    console.log(firstNum);
    var secondNum = $("#inputNumber2").val();
    console.log(secondNum);
    localStorage.setItem("noOfDigits",noOfDigits);
    localStorage.setItem("firstNumber",firstNum);
    localStorage.setItem("secondNumber",secondNum);
  });

  


  // $("#pop-up-save-btn").click(function (e) {
  //   console.log("Submitting form....");
  //   const questionType = $("#select-question-type :selected").text();
  //   console.log(questionType);
  //   localStorage.setItem("questionType", questionType);
  //   const noOfDigits = $("#inputNumber").val();
  //   console.log(noOfDigits);
  //   const firstNum = $("#inputNumber1").val();
  //   console.log(firstNum);
  //   const secondNum = $("#inputNumber2").val();
  //   console.log(secondNum);
  //   if (noOfDigits != "" && firstNum != "" && secondNum != "") {
  //     console.log("not null");
  //     //checkInputDigitValue(noOfDigits);
  //     //displayQuestions(noOfDigits,firstNum, secondNum, questionType);
  //     //$("#basicQuestionModal").modal("hide");
  //   } else {
  //     console.log("Input Values are null");
  //     e.preventDefault();
  //   }
  // });

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
    localStorage.setItem("testName", testName);
    console.log("testname is : " + testName);
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

$("#inputNumber").change(function(){
  let inputDigit = parseInt($("#inputNumber").val());
console.log("input change");
console.log(inputDigit);
$('#inputNumber1').attr('data-parsley-min', 1);
$('#inputNumber2').attr('data-parsley-min', 1);
if(inputDigit === 1) {
  console.log("digit 1");
  $('#inputNumber1').attr('data-parsley-max', 9);  
  $('#inputNumber2').attr('data-parsley-max', 9);
  //$('#inputNumber2').attr('data-parsley-error-message', "The value should be between 1 an 9.");
} else if(inputDigit === 2) {
  console.log("digit 2");
  $('#inputNumber1').attr('data-parsley-max', 99);
  $('#inputNumber2').attr('data-parsley-max', 99);
} else if(inputDigit === 3) {
  $('#inputNumber1').attr('data-parsley-max', 999);
  $('#inputNumber2').attr('data-parsley-max', 999);
} else if (inputDigit === 4) {
  $('#inputNumber1').attr('data-parsley-max', 9999);
  $('#inputNumber2').attr('data-parsley-max', 9999);
}
});
