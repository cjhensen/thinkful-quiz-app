// START SCREEN
// Start the game
  // Click the start button √
    // Removes the start screen from the view √
    // Appends the question screen √
      // Shows the first question in the questions array √

// QUESTION SCREEN
  // Show the title of the question in the appropriate div √
  // Show the list of answers in the form √
  // Show the current question number in the status field √
  // Show n/a for correctly answered number of questions √
  // Be able to select an answer √
    // Clicking on the input will select an answer √
  // Validate the answer √
    // Check if the select answer matches the correct 'answer' field in the data
      // If it does
        // Change the input css appropriately
        // Append the success message to the feedback div √
        // Make the next question button active √
        // updated the answerStatus to correct or incorrect in the array √
          // (which I will use to count how many are correct out of the total)
      // If it does not
        // Change the input css appropriately
        // Append the failure message to the feedback div √
        // Make the next question button active √
  // Moving on to the next question
    // Once an answer has been selected and validated
      // The next button becomes active √
        // Clicking the next button,
          // Clears the form of the previous question √
          // Shows the title of the NEXT question in the appropriate div √
          // Updates the status of the current question √
          // Updates the status of correctly answered questions √

          // Appends the next question √
          // Listens for next action √

  // RESTART SCREEN
    // Once the user is on the last question,
      // Change the button text to finish
      // Show the restart screen
        // Game stats with number of right vs wrong
        // Restart button
          // Shows the question screen again, and restarts that whole process
          // Resets data as well


const START_BUTTON_CLASS = '.js-btn-start';
const QUESTION_ELEMENT_CLASS = '.js-question';
const QUESTION_FORM = '.js-question-answers';
const QUESTION_TITLE_ELEMENT = `${QUESTION_ELEMENT_CLASS} h2`;
const NEXT_BUTTON_CLASS = ".js-btn-next";
const QUESTION_FEEDBACK_ELEMENT = '.js-question-feedback p';
const QUESTION_COUNT_ELEMENT = '.js-question-count';
const SCORE_COUNT_ELEMENT = '.js-score-count';
// const RESTART_ELEMENT_CLASS = '.js-restart';
// const RESTART_BUTTON_CLASS = ".js-btn-restart";

const applicationState = {
  dataQuestionIndex: 0,
  correctQuestionStatus: [],
  resetState: function() {
    console.log('this', this);
    this.dataQuestionIndex = 0;
    this.correctQuestionStatus = [];
  }
}


// Hides/removes the start view when the start button is clicked
function hideStartView() {
  const startView = $('.start');
  startView.remove(); // or startView.hide(); Depends if I still need it in the DOM
}

// Clear the question title first then set it to the current question
function generateQuestionTitle(questionIndex) {
  $(QUESTION_TITLE_ELEMENT).html("");
  $(QUESTION_TITLE_ELEMENT).html(QUESTIONS[questionIndex].question);
}

// Generate the HTML for the current question
function generateQuestionElement(questionIndex) {
  return `<div class="question-element">
            <div class="row">
              <label class="col-6" for="answerChoice-0">${QUESTIONS[questionIndex].a}
                <input type="radio" id="answerChoice-0" name="answer" value="${QUESTIONS[questionIndex].a}">
              </label>

              <label class="col-6" for="answerChoice-1">${QUESTIONS[questionIndex].b}
                <input type="radio" id="answerChoice-1" name="answer" value="${QUESTIONS[questionIndex].b}">
              </label>
            </div>

            <div class="row">
              <label class="col-6" for="answerChoice-2">${QUESTIONS[questionIndex].c}
                <input type="radio" id="answerChoice-2" name="answer" value="${QUESTIONS[questionIndex].c}">
              </label>

              <label class="col-6" for="answerChoice-3">${QUESTIONS[questionIndex].d}
                <input type="radio" id="answerChoice-3" name="answer" value="${QUESTIONS[questionIndex].d}">
              </label>
            </div>
          </div>`
}

// Adds the generated html for the question to the page
function renderQuestionElement(questionIndex) {
  console.log('renderQuestionElement');
  $(QUESTION_FORM).html(generateQuestionElement(questionIndex));
}


// Handles all events associated with clicking the start button:
  // Hiding the start view
  // Showing the questions
function handleStartButtonClicked() {
  // $(START_BUTTON_CLASS).on('click', function() {
    console.log('start clicked');    
    hideStartView();
    $(QUESTION_ELEMENT_CLASS).show(); // could re-do this with a function
    generateQuestionTitle(getQuestionIndex());
    renderQuestionElement(getQuestionIndex());
  // });
}

// Gets the index of the current question
// Checks the element that is added, and its data attribute
// If it does not exist (initial start page), then default to 0
// If it does exist, it uses the index from the data attribute
function getQuestionIndex() {
  console.log('getQuestionIndex');
  // if($('.question-element').attr(QUESTION_INDEX_ATTR_IDENTIFIER)) {
  //   return parseInt($('.question-element').attr(QUESTION_INDEX_ATTR_IDENTIFIER), 10);
  // } else {
  //   return 0;
  // }
  return applicationState.dataQuestionIndex;
}

// Watch the next button for a click
// Get and increment the question index for the next question
// Generate the title using the index
// Render the question using the index
function handleNextButtonClicked() {
  console.log('handleNextButtonClicked');
  console.log('aqi', applicationState.dataQuestionIndex);
  // if(applicationState.dataQuestionIndex === QUESTIONS.length-2) {
  //   changeNextButton("Finish Quiz");
  // }
  // if(applicationState.dataQuestionIndex === QUESTIONS.length-1) {
  //   hideQuestionView();
  //   showRestartQuiz();
  // } else {
    applicationState.dataQuestionIndex += 1;
    const questionIndex = getQuestionIndex();
    generateQuestionTitle(questionIndex);
    renderQuestionElement(questionIndex);
    disableNextButton();
    clearFeedbackMessage();
    setQuestionCount();
  // }
}

// function showRestartQuiz() {
//   console.log('showRestartQuiz');
//   $(RESTART_ELEMENT_CLASS).show();
// }

// function hideQuestionView() {
//   $(QUESTION_ELEMENT_CLASS).hide();
// }

// Rework this
// function handleRestartButtonClicked() {
//   console.log('handleRestartButtonClicked');
//   updateFeedbackMessage("");
//   changeNextButton("Next Question");
//   setQuestionCount();
//   setScoreCount();
//   $(QUESTION_ELEMENT_CLASS).show(); // could re-do this with a function
//   generateQuestionTitle(getQuestionIndex());
//   renderQuestionElement(getQuestionIndex());
// }

// function changeNextButton(text) {
//   $(NEXT_BUTTON_CLASS).html(text);
// }

function handleAnswerChoiceClicked() {
  const answer = $(this).val();
  validateAnswer(answer);
  disableOtherAnswers($(this));
  setScoreCount();
  enableNextButton();
}

function validateAnswer(answer) {
  console.log('selected answer', answer);
  const questionIndex = getQuestionIndex();
  const correctAnswer = QUESTIONS[questionIndex][QUESTIONS[questionIndex].answer];
  if (correctAnswer === answer) {
    setCorrectStatus(answer, true);
    updateFeedbackMessage('You got that right!');
  } else {
    setCorrectStatus(answer, false);
    updateFeedbackMessage(`Sorry, the correct answer was "${correctAnswer}".`);
  }
}

function setCorrectStatus(answer, status) {
  console.log('setCorrectStatus', answer);
  const questionIndex = getQuestionIndex();
  const newCorrectStatus = {};
  newCorrectStatus['status'] = status;
  applicationState.correctQuestionStatus.push(newCorrectStatus);
}

function updateFeedbackMessage(message) {
  $(QUESTION_FEEDBACK_ELEMENT).html(`${message}`);
}

function clearFeedbackMessage() {
 $(QUESTION_FEEDBACK_ELEMENT).html(""); 
}

function disableOtherAnswers(chosenAnswer) {
  // $(QUESTION_FORM).find('input').not(chosenAnswer).attr('disabled', true);
  $(QUESTION_FORM).find('input').attr('disabled', true);
}

function enableNextButton() {
  $(NEXT_BUTTON_CLASS).attr('disabled', false);
}
function disableNextButton() {
  $(NEXT_BUTTON_CLASS).attr('disabled', true);
}

function setQuestionCount() {
  console.log('setQuestionCount');
  $(QUESTION_COUNT_ELEMENT).html(`Question: #${getQuestionIndex() + 1} out of ${QUESTIONS.length}`);
}

function setScoreCount() {
  console.log('setScoreCount');
  console.log(getScoreCount());
  $(SCORE_COUNT_ELEMENT).html(`Score: ${getScoreCount()} out of ${QUESTIONS.length} Correct`); 
}

function getScoreCount() {
  let scoreCount = 0;
  console.log('getScoreCount');
  applicationState.correctQuestionStatus.forEach(function(question) {
    if(question.status === true) {
      scoreCount += 1;
    }
  });
  return scoreCount;
}

function assignEventHandlers() {
  // ? Why does this fire immediately with the ()
  // $(START_BUTTON_CLASS).on('click', handleStartButtonClicked());
  $(START_BUTTON_CLASS).on('click', handleStartButtonClicked);
  $(NEXT_BUTTON_CLASS).on('click', handleNextButtonClicked);
  $(QUESTION_FORM).on('click', 'input', handleAnswerChoiceClicked);
  // $(RESTART_BUTTON_CLASS).on('click', handleRestartButtonClicked);
}
// Start the quiz
// Watch for start button click
// Watch for next button click
// Handle answer choice
// Set question count
function startQuiz() {
  console.log('startQuiz');
  assignEventHandlers();
  setQuestionCount();
}

$(startQuiz());

































