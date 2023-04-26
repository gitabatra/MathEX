function initLocalStorage(){
    console.log("Initializing Questionaries Array");
    if(localStorage.getItem("questionaries") != null){
        console.log("Avoiding Quesitonarie initialization because values already exist.");
        return;
    }
    let questionaries = {
            "qs-20230405-01": {
                name: "Test 1", 
                questions: {
                    "q-20230405-01": {ndigit:1, num1: 1, num2: 2,type: "+", givenAns: "", correctAns: 3},
                    "q-20230405-02": {ndigit:1, num1: 6, num2: 8,type: "+", givenAns: "", correctAns: 14},
                    "q-20230405-03": {ndigit:1, num1: 5, num2: 9,type: "+", givenAns: "", correctAns: 14},
                    "q-20230405-04": {ndigit:1, num1: 7, num2: 6,type: "+", givenAns: "", correctAns: 13},
                    "q-20230405-05": {ndigit:1, num1: 7, num2: 4,type: "+", givenAns: "", correctAns: 11}
                },
                dateQuestionarie: "",
                score: "",
                isQuestionariePublished: true
            },
            "qs-20230405-02": {
                name: "Test 2", 
                questions: {
                    "q-20230405-01": {ndigit:3, num1: 131, num2: 284,type: "+", givenAns: "", correctAns: 415},
                    "q-20230405-02": {ndigit:3, num1: 116, num2: 168,type: "+", givenAns: "", correctAns: 284},
                    "q-20230405-03": {ndigit:3, num1: 511, num2: 9,type: "+", givenAns: "", correctAns: 520},
                    "q-20230405-04": {ndigit:3, num1: 418, num2: 36,type: "+", givenAns: "", correctAns: 454},
                    "q-20230405-05": {ndigit:3, num1: 217, num2: 74,type: "+", givenAns: "", correctAns: 291}                 
                },
                dateQuestionarie: "",
                score: "",
                isQuestionariePublished: true
            },
            "qs-20230405-03": {
                name: "Test 3", 
                questions: {
                    "q-20230405-01": {ndigit:2, num1: 3, num2: 68,type: "+", givenAns: "", correctAns: 71},
                    "q-20230405-02": {ndigit:2, num1: 46, num2: 6,type: "+", givenAns: "", correctAns: 52},
                    "q-20230405-03": {ndigit:2, num1: 50, num2: 91,type: "+", givenAns: "", correctAns: 141},
                    "q-20230405-04": {ndigit:2, num1: 8, num2: 39,type: "+", givenAns: "", correctAns: 47},
                    "q-20230405-05": {ndigit:2, num1: 17, num2: 84,type: "+", givenAns: "", correctAns: 101}                 
                },
                dateQuestionarie: "",
                score: "",
                isQuestionariePublished: true
            }
        };
    localStorage.setItem("questionaries", JSON.stringify(questionaries));

    console.log("Checking Questionaries Array", JSON.parse(localStorage.getItem("questionaries")));
}