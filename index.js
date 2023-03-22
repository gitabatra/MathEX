const app = {
    init :() => {
        document.addEventListener("DOMContentLoaded", app.load);
        console.log("HTML loaded");
    },

    load : () => {
        app.getData();
    },

    displayQuestions: (firstNum,secondNum) =>{
        const ques = firstNum + " + " + secondNum + " = ? ";
        let div = document.createElement("div");
        let label = document.createElement("label");
        label.innerText = ques;
        console.log(label.innerText);
        div.appendChild(label);
        div.setAttribute("class","alignQuestions");
        let questionDiv = document.getElementById("questionForm");
        questionDiv.appendChild(div);  
    },

    checkData: (e) => {
        console.log(e);
        if (!document.getElementById("popupForm").checkValidity()) {
            
            e.preventDefault();
            e.stopPropagation();
            console.log("checking validity...");
        }
        document.getElementById("popupForm").classList.add('was-validated');
    },

    getData : () => {
        let page = document.body.id;
        switch(page) {
            case "student" :
                //add js code for student
                break;
            case "admin" :
                //add js for admin
                app.getAdmin();
                break;
            case "newTest" :
                app.getNewTestInfo();
                break;
            case "questionPaper":
                app.getNewTestpaper();
                break;
            default:
                //add code
        }
    },

    getAdmin: () => {
        const testName = localStorage.getItem("test-name");
        console.log(testName);
        const publishEvent = localStorage.getItem("capture-publish");
        console.log(publishEvent);
    
        if (publishEvent) {
          let testPaperDiv = document.getElementById("testPaperForm");
    
          let rowDiv = document.createElement("div");
          let colDiv1 = document.createElement("div");
          let colDiv2 = document.createElement("div");
          let label = document.createElement("label");
          let header = document.createElement("h2");
          header.innerText = testName;
          header.setAttribute("class", "px-4");
          label.appendChild(header);
          colDiv1.appendChild(label);
          colDiv1.setAttribute("class", "col text-end");
          rowDiv.appendChild(colDiv1);
    
          let scoreBtn = document.createElement("button");
          scoreBtn.innerText = "Scores";
          
          let editBtn = document.createElement("button");
          editBtn.innerText = "Edit";
          
    
          let deleteBtn = document.createElement("button");
          deleteBtn.innerText = "Delete";
          
          scoreBtn.classList.add("btn","btn-dark", "px-4", "mb-2");
          colDiv2.appendChild(scoreBtn);
          
          editBtn.setAttribute("class", "btn btn-dark px-4 mb-2");
          colDiv2.appendChild(editBtn);
     
    
          deleteBtn.setAttribute("class", "btn btn-dark px-4 mb-2");
          colDiv2.appendChild(deleteBtn);
    
         
          colDiv2.setAttribute("class", "col text-start");
          rowDiv.appendChild(colDiv2);
          rowDiv.setAttribute("class", "row");
          testPaperDiv.appendChild(rowDiv);
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
        app.checkData(e);   
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

        localStorage.setItem('test-name',testName);
        localStorage.setItem('question-type',selectedQuestion);
        localStorage.setItem('digits',noOfDigits);
        localStorage.setItem('first-number',firstNumber);
        localStorage.setItem('second-number',secondNumber);
      })
    },
    getNewTestpaper: ()=> {
        let publishEvent = false;
        const testName = localStorage.getItem("test-name");
        const questionType = localStorage.getItem("question-type");
        const noOfDigits = localStorage.getItem("digits");
        const firstNumber = localStorage.getItem("first-number");
        const secondNumber = localStorage.getItem("second-number");

        document.getElementById("addHeadingForTest").innerText = testName;
        app.displayQuestions(firstNumber,secondNumber);


        document.getElementById("saveBtn").addEventListener("click", (e) => {
            app.checkData(e);
            const questionType = document.getElementById("selectQuestion");
            const selectedQuestion = questionType.options[questionType.selectedIndex].text;
            const noOfDigits = document.getElementById("inputNumber").value;
            const firstNumber = document.getElementById("inputNumber1").value;
            const secondNumber = document.getElementById("inputNumber2").value;

            if(noOfDigits!="" && firstNumber!="" && secondNumber!=""){
                console.log("not null");
                app.displayQuestions(firstNumber,secondNumber);
                //data-mdb-dismiss="modal"
                document.getElementById("saveBtn").setAttribute("data-mdb-dismiss","modal");
            }else {
                e.preventDefault();
            }        
            })
           
           
            document.getElementById("publishBtn").addEventListener("click", (e) => {
                publishEvent = true;
                localStorage.setItem("capture-publish", publishEvent);
            })
    },
}

app.init();

