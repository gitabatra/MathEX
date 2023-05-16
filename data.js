function initLocalStorage(){
    console.log("Initializing Questionaries Array");
    if(localStorage.getItem("questionaries") != null){
        console.log("Avoiding Quesitonarie initialization because values already exist.");
        return;
    }
    // register page (add an extra checkbox input asking if the user wants to be admin)
    // login page
    // logout button on the navbar
    // if else condition in every page, if is LoggedIn is false or last Session >= TIMOUT (10mins) send them to the login page. window.href = /signin
    // user management page, list all users, edit their values 
    // user edit page

    let users = {
        "u-20230405-01": {
            username: "Gita",
            email: "gita@test.ca",
            password: "12345",
            lastSession: {
                day: 10,
                month: 10,
                year: 2020
            }, //"YYYY-MM-DD"
            isAdmin: true,
            isLoggedIn: true,
        },
        "u-20230405-02": {
            username: "Gita",
            email: "anshi@test.ca",
            password: "12345",
            lastSession: {
                day: 10,
                month: 10,
                year: 2020
            }, //"YYYY-MM-DD"
            isAdmin: false,
            isLoggedIn: false,
        }
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
                // ,
                // modifiedDate: {
                //     day: 10,
                //     month: 10,
                //     year: 2020
                // }, //"YYYY-MM-DD"
            },
            "qs-20230405-02": {
                name: "Test 2", 
                questions: {
                    "q-20230405-01": {ndigit:2, num1: 31, num2: 24,type: "-"},
                    "q-20230405-02": {ndigit:2, num1: 96, num2: 68,type: "-"},
                    "q-20230405-03": {ndigit:2, num1: 51, num2: 9,type: "-"},
                    "q-20230405-04": {ndigit:2, num1: 41, num2: 36,type: "-"},
                    "q-20230405-05": {ndigit:2, num1: 27, num2: 4,type: "-"}                 
                },
                isQuestionariePublished: true,
                scoreAttempts: {
                }
            },
            "qs-20230405-03": {
                name: "Test 3", 
                questions: {
                    "q-20230405-01": {ndigit:2, num1: 37, num2: 6,type: "/"},
                    "q-20230405-02": {ndigit:2, num1: 46, num2: 5,type: "/"},
                    "q-20230405-03": {ndigit:2, num1: 50, num2: 10,type: "/"},
                    "q-20230405-04": {ndigit:2, num1: 39, num2: 39,type: "/"},
                    "q-20230405-05": {ndigit:2, num1: 84, num2: 17,type: "/"}                 
                },
                isQuestionariePublished: true,
                scoreAttempts: {
                }
            }
        };
    localStorage.setItem("questionaries", JSON.stringify(questionaries));
    localStorage.setItem("users", JSON.stringify(users));
    // localStorage.setItem("loggedInUserID", JSON.stringify(users)); // windw.href = "/signin"

    console.log("Checking Questionaries Array", JSON.parse(localStorage.getItem("questionaries")));
}