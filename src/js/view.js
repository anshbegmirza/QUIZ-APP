// VIEW JS


//selecting dom elements
export const screen2 = document.getElementById('screen2');
export const screen3 = document.getElementById('screen3');
export const screen1 = document.getElementById('screen1');

export const questionNumber = document.getElementById('questionNumber');

export const questionCategory = document.getElementById('questionCategory');

export const questionDifficulty = document.getElementById('questionDifficulty');

export const questionType = document.getElementById('questionType');

// startQuizBtn = document.getElementById('startQuizBtn');

export const questionText = document.querySelector('.question-text');

export const optionsContainer = document.querySelector('.options');
export const scoreBtn = document.getElementById('scoreBtn');

// exitBtn = document.getElementById('exitBtn');
// nextQuestionBtn = document.getElementById('nextQuestionBtn');
// playAgainBtn = document.getElementById('playAgain-btn');

export const totalScoreEl = document.querySelector('.total-score');

export const toggleHidden = function (curScreen, nxtScreen) {
  curScreen.classList.toggle('hidden');
  nxtScreen.classList.toggle('hidden');
};

export const displayQuestions = (question, options, questionIndex, score, totalQuestions) => {
  scoreBtn.textContent = `Score : ${score} / ${totalQuestions}`;
  questionText.innerHTML = `Q${questionIndex + 1}. ${question.question}`;
  optionsContainer.innerHTML = '';

  options.forEach((option) => {
    const optionBtn = document.createElement('button');
    optionBtn.innerHTML = option;
    optionBtn.classList.add('container-btn', 'optionBtn');
    optionsContainer.appendChild(optionBtn);
  });
}

export const showFinalScore = (score) => {
  console.log('this is final score');

  totalScoreEl.textContent = `Your Score : ${score} ⭐`;
};

export const highlightAnswer = (buttons, correctAnswer) => {
  buttons.forEach((btn) => {
    if (btn.textContent === correctAnswer) btn.classList.add('option-Correct', 'option-Disabled');
  });
};

export const disableOptions = (buttons) => {
  buttons.forEach((btn) => (btn.disabled = true));
};





