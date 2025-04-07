
// Controller.js
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import * as view from './view.js';
import * as helper from "./helper.js"
import * as config from "./config.js"


const controlStartQuiz = async () => {
  // Validate any required input or state

  // if (!view.questionCategory.value) {
  //   alert('Please select a category to start the quiz!');
  //   return;
  // }

  if (!model.restoreState()) {
    const apiUrl = config.buildApiUrl();
    try {
      await model.fetchQuestions(apiUrl);
    } catch (err) {
      alert(err.message);
      return;
    }
  }

  view.toggleHidden(view.screen1, view.screen2);
  controlDisplayQuestion();
};

const controlDisplayQuestion = () => {
  if (model.state.currentQuestionIndex >= model.state.questions.length) {
    view.toggleHidden(view.screen2, view.screen3);
    view.showFinalScore(model.state.score);
    model.clearState();
    return;
  }
  model.saveState();
  const question = model.state.questions[model.state.currentQuestionIndex];
  const options = helper.shuffleArray([...question.incorrect_answers, question.correct_answer]);
  view.displayQuestions(question, options, model.state.currentQuestionIndex, model.state.score, model.state.questions.length);

  const optionButtons = document.querySelectorAll('.optionBtn');
  optionButtons.forEach((btn) =>
    btn.addEventListener('click', () => controlCheckAnswer(btn, btn.textContent, question.correct_answer))
  );
};

const controlCheckAnswer = (optionBtn, selectedAnswer, correctAnswer) => {
  const allButtons = document.querySelectorAll('.optionBtn');
  view.disableOptions(allButtons);

  if (selectedAnswer === correctAnswer) {
    optionBtn.classList.add('option-Correct');
    model.state.score++;
  } else {
    optionBtn.classList.add('option-Wrong');
  }

  view.highlightAnswer(allButtons, correctAnswer);
  // view.nextQuestionBtn.disabled = false;
  nextQuestionBtn.disabled = false;

};

const controlNextQuestion = () => {
  model.state.currentQuestionIndex++;
  // view.nextQuestionBtn.disabled = true;
  nextQuestionBtn.disabled = true;
  controlDisplayQuestion();
};

const controlResetQuiz = () => {
  // show model window

  model.state.currentQuestionIndex = 0;
  model.state.score = 0;
  model.state.questions = [];
  model.clearState();
  view.toggleHidden(view.screen2, view.screen1);
};

const controlPlayAgain = () => {
  controlResetQuiz();
  view.toggleHidden(view.screen3, view.screen1);
  location.reload();
};




const startQuizBtn = document.getElementById('startQuizBtn');

const exitBtn = document.getElementById('exitBtn');

const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const playAgainBtn = document.getElementById('playAgain-btn');

// console.log(startQuizBtn, exitBtn, nextQuestionBtn, playAgainBtn);
// Event Listeners
startQuizBtn.addEventListener('click', controlStartQuiz);
nextQuestionBtn.addEventListener('click', controlNextQuestion);
exitBtn.addEventListener('click', controlResetQuiz);
playAgainBtn.addEventListener('click', controlPlayAgain);
