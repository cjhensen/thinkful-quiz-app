const QUESTIONS = [
  {
    question: "In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?",
    a: "William and Elizabeth",
    b: "Joseph and Catherine",
    c: "John and Mary",
    d: "George and Anne",
    answer: "c"
  },
  {
    question: "When did the Liberty Bell get its name?",
    a: "When it was made, in 1701",
    b: "When it rang on July 4, 1776",
    c: "In the 19th century, when it became a symbol of the abolition of slavery",
    d: "None of the above",
    answer: "c"
  },
  {
    question: "Which of the following items was owned by the fewest U.S. homes in 1990?",
    a: "Home computer",
    b: "Compact Disk Player",
    c: "Cordless phone",
    d: "Dishwasher",
    answer: "b"
  },
  {
    question: "In 1990, in what percentage of U.S. married couples did the wife earn more money than the husband?",
    a: 8,
    b: 18,
    c: 38,
    d: 58,
    answer: "b"
  },
  {
    question: "During the 1980s for six consecutive years what breed of dog was the most popular in the U.S.?",
    a: "Cocker Spaniel",
    b: "German Shepherd",
    c: "Labrador Retriever",
    d: "Poodle",
    answer: "a"
  },
  {
    question: "In 1985, five percent of U.S. households had telephone answering machines. By 1990 what percentage of homes had answering machines?",
    a: "10%",
    b: "15%",
    c: "31%",
    d: "51%",
    answer: "c"
  },
  {
    question: "The first black American pictured on a U.S. postage stamp was who?",
    a: "Frederick Douglass",
    b: "Booker T Washington",
    c: "Louis Armstrong",
    d: "Joe Louis",
    answer: "d"
  },
  {
    question: "What did the \"D\" in \"D-Day\" stand for?",
    a: "doom",
    b: "day",
    c: "Dwight (Eisenhower)",
    d: "Dunkirk",
    answer: "b"
  },
  {
    question: "Which of these characters turned 40 years old in 1990?",
    a: "Charlie Brown",
    b: "Bugs Bunny",
    c: "Mickey Mouse",
    d: "Fred Flintstone",
    answer: "a"
  },
  {
    question: "Before becoming George Bush's Secretary of Defense, what was Dick Cheney's position?",
    a: "congressman from Wyoming",
    b: "governor of New Hampshire",
    c: "secretary of defense under Ronald Reagan",
    d: "monkey",
    answer: "a"
  }
];






// START SCREEN
// Start the game
  // Click the start button
    // Removes the start screen from the view
    // Appends the question screen
      // Shows the first question in the questions array

// QUESTION SCREEN
  // Show the title of the question in the appropriate div
  // Show the list of answers in the form
  // Show the current question number in the status field
  // Show n/a for correctly answered number of questions
  // Be able to select an answer
    // Clicking on the input will select an answer
  // Validate the answer
    // Check if the select answer matches the correct 'answer' field in the data
      // If it does
        // Change the input css appropriately
        // Append the success message to the feedback div
        // Make the next question button active
        // updated the answerStatus to correct or incorrect in the array 
          // (which I will use to count how many are correct out of the total)
      // If it does not
        // Change the input css appropriately
        // Append the failure message to the feedback div
        // Make the next question button active
  // Moving on to the next question
    // Once an answer has been selected and validated
      // The next button becomes active
        // Clicking the next button,
          // Clears the form of the previous question
          // Shows the title of the NEXT question in the appropriate div
          // Updates the status of the current question
          // Updates the status of correctly answered questions

          // Appends the next question
          // Listens for next action

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
const QUESTION_INDEX_ATTR_IDENTIFIER = 'data-question-index';
const NEXT_BUTTON_CLASS = ".js-btn-next";


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
  return `<div class="question-element" data-question-index="${questionIndex}">
            <div class="row">
              <label class="col-6" for="answerChoice-0">${QUESTIONS[questionIndex].a}
                <input type="radio" id="answerChoice-0" name="answer" value="0">
              </label>

              <label class="col-6" for="answerChoice-1">${QUESTIONS[questionIndex].b}
                <input type="radio" id="answerChoice-1" name="answer" value="1">
              </label>
            </div>

            <div class="row">
              <label class="col-6" for="answerChoice-2">${QUESTIONS[questionIndex].c}
                <input type="radio" id="answerChoice-2" name="answer" value="2">
              </label>

              <label class="col-6" for="answerChoice-3">${QUESTIONS[questionIndex].d}
                <input type="radio" id="answerChoice-3" name="answer" value="3">
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
  $(START_BUTTON_CLASS).on('click', function() {
    console.log('start clicked');    
    hideStartView();
    generateQuestionTitle(getQuestionIndex());
    renderQuestionElement(getQuestionIndex());
  });
}

// Gets the index of the current question
// Checks the element that is added, and its data attribute
// If it does not exist (initial start page), then default to 0
// If it does exist, it uses the index from the data attribute
function getQuestionIndex() {
  console.log('getQuestionIndex');
  if($('.question-element').attr(QUESTION_INDEX_ATTR_IDENTIFIER)) {
    return parseInt($('.question-element').attr(QUESTION_INDEX_ATTR_IDENTIFIER), 10);
  } else {
    return 0;
  }
}

// Watch the next button for a click
// Get and increment the question index for the next question
// Generate the title using the index
// Render the question using the index
function handleNextButtonClicked() {
  $(NEXT_BUTTON_CLASS).on('click', function() {
    console.log('handleNextButtonClicked');
    const questionIndex = getQuestionIndex() + 1;
    generateQuestionTitle(questionIndex);
    renderQuestionElement(questionIndex);
  });
}

// Start the quiz
// Watch for start button click
// Watch for next button click
function startQuiz() {
  console.log('startQuiz');
  handleStartButtonClicked();
  handleNextButtonClicked();
}

$(startQuiz());

































