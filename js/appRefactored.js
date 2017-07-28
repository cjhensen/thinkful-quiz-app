// Start View
const applicationState = {
  dataQuestionIndex: 0,
  correctQuestionStatus: [],
  resetState: function() {
    console.log('this', this);
    this.dataQuestionIndex = 0;
    this.correctQuestionStatus = [];
  }
}
const startView = {
  viewContainerSelector: '.js-start',
  startButtonSelector: '.js-btn-start',

  hideStartView: () => {
    console.log('hideStartView');
    $(this).viewContainerSelector.hide();
  },
  showStartView: () => {
    console.log('showStartView');
    $(this).viewContainerSelector.show();
  },
  handleStartButtonClicked: () => {
    $(questionView.viewContainerSelector).show(); // could re-do this with a function
    questionView.generateQuestionTitle(getQuestionIndex());
    questionView.renderQuestionElement(getQuestionIndex());
  }
}


// Question View
const questionView = {
  viewContainerSelector: '.js-question',
  viewAnswersSelector: '.js-question-answers',
  viewFeedbackSelector: '.js-question-feedback',
  viewNextBtnSelector: '.js-btn-next',
  viewQuestionCountSelector: '.js-question-count',
  viewScoreCountSelector: '.js-score-count',
  viewQuestionTitleSelector: `${QUESTION_ELEMENT_CLASS} h2`,

  hideQuestionView: () => {
    console.log('hideQuestionView');
    $(this).viewContainerSelector.hide();
  },
  showQuestionView: () => {
    console.log('showQuestionView');
    $(this).viewContainerSelector.show();
  },
  generateQuestionTitle: (questionIndex) => {
    $(this.viewQuestionTitleSelector).html("");
    $(this.viewQuestionTitleSelector).html(QUESTIONS[questionIndex].question);
  },
  generateQuestionElement: (questionIndex) => {
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
        },
  renderQuestionElement: (questionIndex) => {
    $(this.viewAnswersSelector).html(generateQuestionElement(questionIndex));
  }
}


// Restart View
const restartView = {
  viewContainerSelector: '.js-restart',

  hideRestartView: () => {
    console.log('hideRestartView');
    $(this).viewContainerSelector.hide();
  },
  showRestartView: () => {
    console.log('showRestartView');
    $(this).viewContainerSelector.show();
  }
}


function assignEventHandlers() {

}