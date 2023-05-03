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
                    "q-20230405-01": {ndigit:1, num1: 1, num2: 2,type: "+"},
                    "q-20230405-02": {ndigit:1, num1: 6, num2: 8,type: "+"},
                    "q-20230405-03": {ndigit:1, num1: 5, num2: 9,type: "+"},
                    "q-20230405-04": {ndigit:1, num1: 7, num2: 6,type: "+"},
                    "q-20230405-05": {ndigit:1, num1: 7, num2: 4,type: "+"}
                },
                isQuestionariePublished: true,
                scoreAttempts: {
                }
            },
            "qs-20230405-02": {
                name: "Test 2", 
                questions: {
                    "q-20230405-01": {ndigit:3, num1: 131, num2: 284,type: "+"},
                    "q-20230405-02": {ndigit:3, num1: 116, num2: 168,type: "+"},
                    "q-20230405-03": {ndigit:3, num1: 511, num2: 9,type: "+"},
                    "q-20230405-04": {ndigit:3, num1: 418, num2: 36,type: "+"},
                    "q-20230405-05": {ndigit:3, num1: 217, num2: 74,type: "+"}                 
                },
                isQuestionariePublished: true,
                scoreAttempts: {
                }
            },
            "qs-20230405-03": {
                name: "Test 3", 
                questions: {
                    "q-20230405-01": {ndigit:2, num1: 3, num2: 68,type: "+"},
                    "q-20230405-02": {ndigit:2, num1: 46, num2: 6,type: "+"},
                    "q-20230405-03": {ndigit:2, num1: 50, num2: 91,type: "+"},
                    "q-20230405-04": {ndigit:2, num1: 8, num2: 39,type: "+"},
                    "q-20230405-05": {ndigit:2, num1: 17, num2: 84,type: "+"}                 
                },
                isQuestionariePublished: true,
                scoreAttempts: {
                }
            }
        };
    localStorage.setItem("questionaries", JSON.stringify(questionaries));

    console.log("Checking Questionaries Array", JSON.parse(localStorage.getItem("questionaries")));
}