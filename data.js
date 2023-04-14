//Global Variable
var questionaries = {};
function initLocalStorage(){
    console.log("Initializing Questionaries Array");
    let questionaries = [
        {name: "1", q: []}
    ];
    questionaries = {
            "qs-20230405-01": {
                name: "Test 1", 
                questions: {
                    "q-20230405-01": {ndigit:1, num1: 1, num2: 2,type: "+", givenAns: "", correctAns: 3},
                    "q-20230405-02": {ndigit:1, num1: 6, num2: 8,type: "+", givenAns: "", correctAns: 14},
                    "q-20230405-03": {ndigit:1, num1: 5, num2: 9,type: "+", givenAns: "", correctAns: 14},
                    "q-20230405-04": {ndigit:1, num1: 7, num2: 6,type: "+", givenAns: "", correctAns: 13},
                    "q-20230405-05": {ndigit:1, num1: 7, num2: 4,type: "+", givenAns: "", correctAns: 11}
                }
            },
            "qs-20230405-02": {
                name: "Test 2", 
                questions: {
                    "q-20230405-01": {ndigit:2, num1: 13, num2: 28,type: "+", givenAns: "", correctAns: 41},
                    "q-20230405-02": {ndigit:2, num1: 16, num2: 68,type: "+", givenAns: "", correctAns: 84},
                    "q-20230405-03": {ndigit:2, num1: 51, num2: 9,type: "+", givenAns: "", correctAns: 60},
                    "q-20230405-04": {ndigit:2, num1: 48, num2: 36,type: "+", givenAns: "", correctAns: 84},
                    "q-20230405-05": {ndigit:2, num1: 27, num2: 74,type: "+", givenAns: "", correctAns: 101}                 
                }
            },
            "qs-20230405-03": {
                name: "Test 3", 
                questions: {
                    "q-20230405-01": {ndigit:2, num1: 3, num2: 68,type: "+", givenAns: "", correctAns: 71},
                    "q-20230405-02": {ndigit:2, num1: 46, num2: 6,type: "+", givenAns: "", correctAns: 52},
                    "q-20230405-03": {ndigit:2, num1: 50, num2: 91,type: "+", givenAns: "", correctAns: 141},
                    "q-20230405-04": {ndigit:2, num1: 8, num2: 39,type: "+", givenAns: "", correctAns: 47},
                    "q-20230405-05": {ndigit:2, num1: 17, num2: 84,type: "+", givenAns: "", correctAns: 101}                 
                }
            }
        };
    localStorage.setItem("questionaries", JSON.stringify(questionaries));

    console.log("Checking Questionaries Array", JSON.parse(localStorage.getItem("questionaries")));
}

// function appendDataToQuestionarie(){
//     questionaries = JSON.parse(localStorage.getItem("questionaries"));
//     console.log("Before append questionarie: ",questionaries);
//     let newQuestionarie = { 
//         "qs-20230405-04": {
//         name: "Test 4", 
//         questions: {
//             "q-20230405-01": {ndigit:1, num1: 8, num2: 6,type: "-", givenAns: 2, correctAns: 2},
//             "q-20230405-02": {ndigit:1, num1: 7, num2: 1,type: "-", givenAns: 6, correctAns: 6},
//             "q-20230405-03": {ndigit:1, num1: 9, num2: 2,type: "-", givenAns: 6, correctAns: 7},
//             "q-20230405-04": {ndigit:1, num1: 4, num2: 0,type: "-", givenAns: 4, correctAns: 4},
//             "q-20230405-05": {ndigit:1, num1: 5, num2: 5,type: "-", givenAns: 0, correctAns: 0}                 
//         }
//     }};
   

//     questionaries = Object.assign(newQuestionarie, questionaries);
//     console.log("After append questionarie: ",questionaries);
//     return questionaries;
// }

// function refreshQuestionarieLocalStorage(questionaries) {
//     console.log("Refreshed Questionary on Publish: ", questionaries)
//     localStorage.setItem("questionaries", JSON.stringify(questionaries));
//     console.log("refreshed Questionaries List: ",questionaries);
// }