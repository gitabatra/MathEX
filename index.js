

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
                //add js code for student file
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

        document.getElementById("popupForm").addEventListener("submit", (e) => {
            e.preventDefault();
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
    
            const ques = firstNumber + " + " + secondNumber + " ? ";
            //document.getElementById("formData").innerHTML = ques;
        })
    }
}

app.init();

