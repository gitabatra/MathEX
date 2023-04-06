function initLocalStorage(){
    console.log("Initializing Questionaries Array");
    // let questionaries = [
    //     {name: "1", q: []}
    // ];
    let questionaries = {
            "qs-20230405-01": {
                name: "Test 1", 
                questions: {
                    "q-20230405-01": {ndigit:1, num1: 1, num2: 2,type: "+"},
                    "q-20230405-02": {ndigit:1, num1: 6, num2: 8,type: "+"},
                    "q-20230405-03": {ndigit:1, num1: 5, num2: 9,type: "+"},
                    "q-20230405-04": {ndigit:1, num1: 8, num2: 6,type: "+"},
                    "q-20230405-05": {ndigit:1, num1: 7, num2: 4,type: "+"}
                }
            },
            "qs-20230405-02": {
                name: "Test 2", 
                questions: {
                    "q-20230405-01": {ndigit:2, num1: 13, num2: 28,type: "+"},
                    "q-20230405-02": {ndigit:2, num1: 16, num2: 68,type: "+"},
                    "q-20230405-03": {ndigit:2, num1: 51, num2: 9,type: "+"},
                    "q-20230405-04": {ndigit:2, num1: 48, num2: 36,type: "+"},
                    "q-20230405-05": {ndigit:2, num1: 27, num2: 74,type: "+"}                 
                }
            },
            "qs-20230405-03": {
                name: "Test 3", 
                questions: {
                    "q-20230405-01": {ndigit:2, num1: 13, num2: 28,type: "+"},
                    "q-20230405-02": {ndigit:2, num1: 16, num2: 68,type: "+"},
                    "q-20230405-03": {ndigit:2, num1: 51, num2: 9,type: "+"},
                    "q-20230405-04": {ndigit:2, num1: 48, num2: 36,type: "+"},
                    "q-20230405-05": {ndigit:2, num1: 27, num2: 74,type: "+"}                 
                }
            }
        };
    localStorage.setItem("questionaries", JSON.stringify(questionaries));

    console.log("Checking Questionaries Array", JSON.parse(localStorage.getItem("questionaries")));
}