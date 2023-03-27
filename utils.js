$(document).ready(function () {
  const params = new URL(document.location).searchParams;
  console.log(params);
  const noOfDigits = params.get("numOfDigits");
  console.log(noOfDigits);
  const firstNum = params.get("firstNumber");
  console.log(firstNum);
  const secondNum = params.get("secondNumber");
  console.log(secondNum);
  const testName = localStorage.getItem("testName");
  console.log(testName);
  $("#add-heading-questionarie").text(testName);
  console.log($("add-heading-questionarie").text);
  displayQuestions(firstNum, secondNum);
});

function displayQuestions(firstNum, secondNum) {
  const ques = firstNum + " + " + secondNum + " = ? ";
  let div = document.createElement("div");
  let label = document.createElement("label");
  label.innerText = ques;
  console.log(label.innerText);
  div.appendChild(label);
  div.setAttribute("class", "alignQuestions");
  let questionDiv = document.getElementById("questionForm");
  questionDiv.appendChild(div);
}

$("#saveBtn").click(function (e) {
  console.log("Submitting form....");
  const noOfDigits = $("#inputNumber").val();
  console.log(noOfDigits);
  const firstNum = $("#inputNumber1").val();
  console.log(firstNum);
  const secondNum = $("#inputNumber2").val();
  console.log(secondNum);
  if (noOfDigits != "" && firstNum != "" && secondNum != "") {
    console.log("not null");
    displayQuestions(firstNum, secondNum);
    $("#basicQuestionModal").modal("hide");
  } else {
    e.preventDefault();
  }
});
