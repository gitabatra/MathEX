function initElements() {
  initQuestions();
}

function initQuestions() {
  createDummyQuestions();
  $("i.correctness-indicator").hide();
}

function createDummyQuestions() {
  console.log("Creating questions...");
  for (let i=0; i <= 5; i++) {
    console.log("Creating question: ", i);
    $("div#questions-list").append(`
    <div id="question-col-${i}" class="col-sm-6 col-md-4">
        <div class="card text-center">
          <div class="card-header">Question 1</div>
          <div class="card-body">
            <table class="tableAlign">
              <thead>
                <td></td>
                <td>Carry</td>
                <td></td>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td class="text-end">
                    <input type="text" class="inputBox" />
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td class="text-center align-bottom">3</td>
                  <td class="text-center">6</td>
                </tr>
                <tr>
                  <td class="text-center align-bottom">+</td>
                  <td class="text-center align-bottom">1</td>
                  <td class="text-center">4</td>
                </tr>
                <tr>
                  <td></td>
                  <td class="text-end align-items-end alignNumbers">
                    <input class="inputBox" type="text" />
                  </td>
                  <td class="alignNumbers">
                    <input class="inputBox" type="text" />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <i id="question-${i}-correct" class="fas fa-check text-success correctness-indicator"></i>
            <i id="question-${i}-wrong" class="fas fa-xmark text-danger correctness-indicator"></i>
          </div>
        </div>
    </div>
      `);
  }
}
