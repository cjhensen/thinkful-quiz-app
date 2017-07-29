// GLOBAL ELEMENT SELECTORS
// startView
const startViewContainer = '.js-startView--start';
const startViewStartButton = '.js-startView--btn-start';
// questionView
const questionViewContainer = '.js-questionView--question';
const questionViewAnswers = '.js-questionView--answers';
const questionViewFeedback = '.js-questionView--feedback';
const questionViewNextBtn = '.js-questionView--btn-next';
const questionViewFinishBtn = '.js-questionView--btn-finish';
const questionViewCount = '.js-questionView--count';
const questionViewScore = '.js-questionView--score';
const questionViewTitle = `${questionViewContainer} h2`;
// restartView
const restartViewContainer = '.js-restartView--restart';
const restartViewRestartBtn = '.js-restartView--btn-restart';
const restartViewEndMessage = `${restartViewContainer} h2`;



// applicationState
const applicationState = {
  dataQuestionIndex: 0,
  correctQuestionStatus: [],
  resetState() {
    console.log('resetState');
    this.dataQuestionIndex = 0;
    this.correctQuestionStatus = [];
  }
};

// startView
const startView = {
  hideStartView() {
    console.log('hideStartView');
    $(startViewContainer).hide();
  },
  showStartView() {
    console.log('showStartView');
    $(startViewContainer).show();
  },
  handleStartButtonClicked() {
    console.log('handleStartButtonClicked');
    $(questionViewContainer).show(); // could re-do this with a function
    // same 'this' issue
    startView.hideStartView();
    questionView.generateQuestionTitle(questionView.getQuestionIndex());
    questionView.renderQuestionElement(questionView.getQuestionIndex());
  }
};


// questionView
const questionView = {
  hideQuestionView() {
    console.log('hideQuestionView');
    $(questionViewContainer).hide();
  },
  showQuestionView() {
    console.log('showQuestionView');
    $(questionViewContainer).show();
  },
  generateQuestionTitle(questionIndex) {
    console.log('generateQuestionTitle');
    $(questionViewTitle).html("");
    $(questionViewTitle).html(QUESTIONS[questionIndex].question);
  },
  generateQuestionElement(questionIndex) {
    console.log('generateQuestionElement');
    return `<div class="question-element">
            <div class="row">
              <label class="col-6 answer-choice" for="answerChoice-0">${QUESTIONS[questionIndex].a}
                <input type="radio" id="answerChoice-0" name="answer" value="${QUESTIONS[questionIndex].a}">
              </label>

              <label class="col-6 answer-choice" for="answerChoice-1">${QUESTIONS[questionIndex].b}
                <input type="radio" id="answerChoice-1" name="answer" value="${QUESTIONS[questionIndex].b}">
              </label>
            </div>

            <div class="row">
              <label class="col-6 answer-choice" for="answerChoice-2">${QUESTIONS[questionIndex].c}
                <input type="radio" id="answerChoice-2" name="answer" value="${QUESTIONS[questionIndex].c}">
              </label>

              <label class="col-6 answer-choice" for="answerChoice-3">${QUESTIONS[questionIndex].d}
                <input type="radio" id="answerChoice-3" name="answer" value="${QUESTIONS[questionIndex].d}">
              </label>
            </div>
          </div>`
        },
  renderQuestionElement(questionIndex) {
    console.log('renderQuestionElement');
    $(questionViewAnswers).html(this.generateQuestionElement(questionIndex));
  },
  getQuestionIndex() {
    console.log('getQuestionIndex');
    return applicationState.dataQuestionIndex;
  },
  validateAnswer(answer, answerElement) {
    console.log('validateAnswer');
    const questionIndex = this.getQuestionIndex();
    const correctAnswer = QUESTIONS[questionIndex][QUESTIONS[questionIndex].answer];
    if (correctAnswer === answer) {
      this.setCorrectStatus(answer, true);
      this.updateFeedbackMessage('You got that right!');
      questionView.updateAnswerChoiceFeedback(answerElement, true);
    } else {
      this.setCorrectStatus(answer, false);
      this.updateFeedbackMessage(`Sorry, the correct answer was "${correctAnswer}".`);
      questionView.updateAnswerChoiceFeedback(answerElement, false);
    }
  },
  setCorrectStatus(answer, status) {
    console.log('setCorrectStatus');
    const questionIndex = this.getQuestionIndex();
    const newCorrectStatus = {};
    newCorrectStatus['status'] = status;
    applicationState.correctQuestionStatus.push(newCorrectStatus);
  },
  updateFeedbackMessage(message) {
    console.log('updateFeedbackMessage');
    $(questionViewFeedback).find('p').html(`${message}`);
  },
  clearFeedbackMessage() {
    console.log('clearFeedbackMessage');
    $(questionViewFeedback).find('p').html(""); 
  },
  disableOtherAnswers(chosenAnswer) {
    console.log('disableOtherAnswers');
    $(questionViewAnswers).find('input').attr('disabled', true);
  },
  enableNextButton() {
    console.log('enableNextButton');
    $(questionViewNextBtn).attr('disabled', false);
  },
  disableNextButton() {
    console.log('disableNextButton');
    $(questionViewNextBtn).attr('disabled', true);
  },
  showNextButton() {
    console.log('showNextButton');
    $(questionViewNextBtn).show();
  },
  hideNextButton() {
    console.log('hideNextButton');
    $(questionViewNextBtn).hide();
  },
  showFinishButton() {
    console.log('showFinishButton');
    $(questionViewFinishBtn).show();
  },
  hideFinishButton() {
    console.log('hideFinishButton');
    $(questionViewFinishBtn).hide();
  },
  enableFinishButton() {
    console.log('enableFinishButton');
    $(questionViewFinishBtn).attr('disabled', false);
  },
  disableFinishButton() {
    $(questionViewFinishBtn).attr('disabled', true);
  },
  setQuestionCount() {
    console.log('setQuestionCount');
    $(questionViewCount).html(`Question: #${this.getQuestionIndex() + 1} out of ${QUESTIONS.length}`);
  },
  getScoreCount() {
    console.log('getScoreCount');
    let scoreCount = 0;
    applicationState.correctQuestionStatus.forEach(function(question) {
      if(question.status === true) {
        scoreCount += 1;
      }
    });
    return scoreCount;
  },
  setScoreCount() {
    console.log('setScoreCount');
    $(questionViewScore).html(`Score: ${this.getScoreCount()} out of ${QUESTIONS.length} Correct`); 
  },
  updateAnswerChoiceFeedback(answerElement, status) {
    console.log('ANSWER ELEMENT', answerElement);
    // console.log('PARENT', $(answerChoice).parent());
    if(status === true) {
      $(answerElement).parent().addClass('answer-correct');
    }
    if(status === false) {
      $(answerElement).parent().addClass('answer-incorrect');
    }

  },
  handleNextButtonClicked() {
    // same 'this' clicking on issue, so need to use full object name
    console.log('handleNextButtonClicked');
    applicationState.dataQuestionIndex += 1;
    const questionIndex = questionView.getQuestionIndex();
    if(questionIndex === QUESTIONS.length-1) {
      questionView.showFinishButton();
      questionView.hideNextButton();
    }
      questionView.setQuestionCount();
      questionView.generateQuestionTitle(questionIndex);
      questionView.renderQuestionElement(questionIndex);
      questionView.disableNextButton();
      questionView.clearFeedbackMessage();
  },
  handleAnswerChoiceClicked() { // skeptical of what 'this' will do here
    // clicking on an element, so 'this' is different and would not run the functions in the 
    // object properly unless I used the full object name
    const questionIndex = questionView.getQuestionIndex();
    console.log('handleAnswerChoiceClicked');
    if(questionIndex === QUESTIONS.length-1) {
      questionView.enableFinishButton();
    }
    const answerElement = $(this);
    const answer = $(this).val();
    questionView.validateAnswer(answer, answerElement);
    questionView.disableOtherAnswers($(this));
    questionView.setScoreCount();
    questionView.enableNextButton();
  },
  handleFinishButtonClicked() {
    console.log('handleFinishButtonClicked');
    restartView.showRestartView();
    questionView.hideQuestionView();
    restartView.updateEndMessage();
  }
};


// restartView
const restartView = {
  hideRestartView() {
    console.log('hideRestartView');
    $(restartViewContainer).hide();
  },
  showRestartView() {
    console.log('showRestartView');
    $(restartViewContainer).show();
  },
  updateEndMessage() {
    if(questionView.getScoreCount() < 5) {
      $(restartViewEndMessage).html(`Sorry, you got ${questionView.getScoreCount()} out of ${QUESTIONS.length} correct. Try again!`);
    } else {
      $(restartViewEndMessage).html(`Yay! You got ${questionView.getScoreCount()} out of ${QUESTIONS.length} correct. Want to take it again?`);
    }
  },
  // same 'input' issue
  handleRestartButtonClicked() {
    questionView.disableFinishButton();
    questionView.disableNextButton();
    restartView.hideRestartView();
    questionView.hideFinishButton();
    questionView.showNextButton();
    applicationState.resetState();
    startView.handleStartButtonClicked();
    questionView.clearFeedbackMessage();
    questionView.setQuestionCount();
    questionView.setScoreCount();
  }
};

// assignEventHandlers
function assignEventHandlers() {
  console.log('assignEventHandlers');
  $(startViewStartButton).on('click', startView.handleStartButtonClicked);
  $(questionViewNextBtn).on('click', questionView.handleNextButtonClicked);
  $(questionViewAnswers).on('click', 'input', questionView.handleAnswerChoiceClicked);
  $(questionViewFinishBtn).on('click', questionView.handleFinishButtonClicked);
  $(restartViewRestartBtn).on('click', restartView.handleRestartButtonClicked);
}

// runApp
function runApp() {
  console.log('runApp');
  assignEventHandlers();
  questionView.setQuestionCount();
  startView.showStartView();
  questionView.hideQuestionView();
  restartView.hideRestartView();
  questionView.hideFinishButton();
}

$(runApp());