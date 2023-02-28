

const app = {
    init :() => {
        document.addEventListener("DOMContentLoaded", app.load);
        console.log("HTML loaded");
    },

    load : () => {
        app.getData();
    },

    getData : () => {
        let page = document.body.id;
        switch(page) {
            case "student" :
                //add js code for student
                break;
            case "admin" :
                //add js for admin
                break;
            case "newTest" :
                app.getNewTestInfo();
                break;
            default:
                //add code
        }
    },

    getNewTestInfo: () => {

        document.getElementById("newTestText").addEventListener("keyup",function (){
            if(document.getElementById("newTestText").value.trim() != "") {
                document.getElementById("addNewTestBtn").disabled = false;
            } else {
                document.getElementById("addNewTestBtn").disabled = true;
            }
       });

      document.getElementById("popupForm").addEventListener("submit",function(e)
      {  
        if (!document.getElementById("popupForm").checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }    
        const testName = document.getElementById("newTestText").value;
        console.log(testName);

        const questionType =document.getElementById("selectQuestion");
        var selectedQuestion = questionType.options[questionType.selectedIndex].text;
        console.log(selectedQuestion);
  
        const noOfDigits = document.getElementById("inputNumber").value;
        console.log(noOfDigits);
       
        const firstNumber = document.getElementById("inputNumber1").value;
        console.log(firstNumber);
      
        const secondNumber = document.getElementById("inputNumber2").value;
        console.log(secondNumber);
        const ques = firstNumber + " + " + secondNumber + " = ? ";

        document.getElementById("popupForm").classList.add('was-validated');
      })
    }
}

app.init();

