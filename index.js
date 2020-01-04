/* when a user clicks on start quiz button */
function startQuiz() {
  $('#startButton').on('click', function(event){
    renderAQuestion();
  });
}

/* Displays question number and score obtained */
function updateQuestionAndScore() {
  const html = $(`<ul>
      <li id="js-answered">Question: ${STORE.currentQuestion + 1} of ${STORE.questions.length}</li>
      <li id="js-score">Score: ${STORE.score} out of ${STORE.questions.length}</li>
    </ul>`);
  $(".question-and-score").html(html);
}

/* Displays the options for the current question */
function updateOptions()
{
  let question = STORE.questions[STORE.currentQuestion];
  for(let i=0; i<question.options.length; i++) {
    $('.js-options').append(`
      <li class="question-option">
        <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"> 
        <label for="option${i+1}"> ${question.options[i]}</label> <br/>
        <span id="js-r${i+1}"></span>
      </li>
    `);
  }
  
}

/*displays the question*/
function renderAQuestion() {
  let question = STORE.questions[STORE.currentQuestion];
  updateQuestionAndScore();
  const questionHtml = $(`
  
  <div>   
    <form class="quizBox">
      <fieldset>
        <div class="row question">
          <div class="col">
            <h2> ${question.question}</h2>
          </div>
        </div>

        <div class="row options">
          <div class="col">
            <ul class="js-options"> </ul>
        </div>
      </div>
    

      <div class="row">
        <div class="col">
          <button type = "submit" id="answer" tabindex="5">Submit</button>
          <button type = "button" id="nextButton" tabindex="6"> Next</button>
        </div>
      </div>
    </fieldset>
    </form>
  </div>`);
$("main").html(questionHtml);
updateOptions();
$("#nextButton").hide();
}

/* displays results and restart quiz button */
function displayResults() {
  let resultHtml = $(
    `<div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <div class="col">
              <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
              <img id="resultsImg" src="https://www.geeksofdoom.com/GoD/img/2015/09/harry-potter-epilogue-final-shot.jpg" alt="Harry, Ron, Hermione, and Ginny seeing their children head off on the Hogwarts Express"
            </div>
          </div>
        
          <div class="row">
            <div class="col">
              <button type="button" id="restartButton">Retest Your Wits</button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>`);
    STORE.currentQuestion = 0;
    STORE.score = 0;
  $("main").html(resultHtml);
}

/* checks whether it reached the end of questions list */
function handleQuestions() {
  $('body').on('click','#nextButton', (event) => {
    STORE.currentQuestion === STORE.questions.length?displayResults() : renderAQuestion();
  });
}


/*checks whether the chosen option is right or wrong and displays respective message*/ 
function handleSelectOption() {
  $('body').on("submit",'.quizBox', function(event) {
    event.preventDefault();
    let currentQues = STORE.questions[STORE.currentQuestion];
    let selectedOption = $("input[name=options]:checked").val();
    if (!selectedOption) {
      alert("Choose an option");
      return;
    } 
    let id_num = currentQues.options.findIndex(i => i === selectedOption);
    let id = "#js-r" + ++id_num;
    $('span').removeClass("right-answer wrong-answer");
    if(selectedOption === currentQues.answer) {
      STORE.score++; 
      $(`${id}`).append(`YOU'RE A WIZARD. 100 POINTS FOR GRYFFINDOR!<br/>`);
      $(`${id}`).addClass("right-answer");
    }
    else {
    $(`${id}`).append(`WRONG! The correct answer is ${currentQues.answer}<br/>`);
      $(`${id}`).addClass("wrong-answer");
    }

    STORE.currentQuestion++;
    $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
    $('#answer').hide();
    $("input[type=radio]").attr('disabled', true);
    $('#nextButton').show();
  });
}

function restartQuiz() {
  $('body').on('click','#restartButton', (event) => {
    renderAQuestion();
  });
}

function handleQuizApp() {
  startQuiz();
  handleQuestions();
  handleSelectOption();
  restartQuiz();
}

$(handleQuizApp);