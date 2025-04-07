// Initial js file where started building the app, then refactored the code into mvc architecture.


'use strict';

// const { all } = require("core-js/fn/promise");

const screen2 = document.getElementById('screen2');
const screen3 = document.getElementById('screen3');
const screen1 = document.getElementById('screen1');

const questionNumber = document.getElementById('questionNumber');

const questionCategory = document.getElementById('questionCategory');

const questionDifficulty = document.getElementById('questionDifficulty');

const questionType = document.getElementById('questionType');

const startQuizBtn = document.getElementById('startQuizBtn');

const questionText = document.querySelector('.question-text');

const optionsContainer = document.querySelector('.options');

const exitBtn = document.getElementById('exitBtn');
const scoreBtn = document.getElementById('scoreBtn');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const playAgainBtn = document.getElementById('playAgain-btn');

const totalScoreEl = document.querySelector('.total-score');

console.log(playAgainBtn)

let currentQuestionIndex = 0;
let questions = [];
let score = 0;

const TIMEOUT_SEC = 10;


// saving quiz data to local storage
const saveState = function () {
  const quizState = {
    currentQuestionIndex,
    questions,
    score,
  };
  localStorage.setItem('quizState', JSON.stringify(quizState));
}

//resotring session from locale storage.
const restoreState = function () {
  const savedState = JSON.parse(localStorage.getItem('quizState'));
  if (savedState) {
    currentQuestionIndex = savedState.currentQuestionIndex;
    questions = savedState.questions;
    score = savedState.score;
    return true;
  }
  return false;
}

//clearing locale storage
const clearState = function () {
  localStorage.removeItem('quizState');
}

//timeout function
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long ! Timeout after ${s} seconds`))
    }, s * 1000);
  });
};

// Function to build the API URL dynamically
const buildApiUrl = () => {
  const amount = questionNumber.value || 10; // minimum 10 questions
  const category = questionCategory.value || 9; // any category
  const difficulty = questionDifficulty.value || 'medium'; // default level
  const type = questionType.value || 'multiple'; // default type

  return `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
};

// Function to fetch and handle JSON data
const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }
    questions = data.results;
    console.log(questions); // Log the fetched data
    return questions;
  } catch (err) {
    console.error(err);
    alert(`Error fetching data: ${err.message}`);
  }
};


//toggle visibility between screens.
const toggleHidden = function (curScreen, nxtScreen) {
  curScreen.classList.toggle('hidden');
  nxtScreen.classList.toggle('hidden');
}


// Event listener for the Next button
startQuizBtn.addEventListener('click', async function () {
  if (!restoreState()) {
    const apiUrl = buildApiUrl();
    await getJSON(apiUrl);
  }
  toggleHidden(screen1, screen2);
  displayQuestions(currentQuestionIndex);
});

console.log(scoreBtn)

// getting questions from the result 
const displayQuestions = function (index) {
  if (index >= questions.length) {
    toggleHidden(screen2, screen3);
    // Your Total Score: 3 ⭐
    totalScoreEl.textContent = `Your Score : ${score} ⭐`;
    clearState();
    return;
  };
  saveState();
  scoreBtn.textContent = `Score : ${score} / ${questions.length}`;

  const question = questions[index];
  // Q1. Which is the largest animal ? this formate
  questionText.innerHTML = `Q${currentQuestionIndex + 1}. ${question.question}`;

  const options = [...question.incorrect_answers, question.correct_answer]
  // console.log(options);
  console.log(question.question);
  console.log(options);

  console.log(question.correct_answer,);

  const shuffledOptions = shuffleArray(options);


  optionsContainer.innerHTML = ""; // clear all the contents
  shuffledOptions.forEach(option => {
    const optionBtn = document.createElement('button');
    optionBtn.innerHTML = option;
    optionBtn.classList.add('container-btn', 'optionBtn')
    optionBtn.addEventListener('click', () => checkAnswer(optionBtn, option, question.correct_answer));

    optionsContainer.appendChild(optionBtn);
  });

};

// function to check correct Answer
const checkAnswer = function (optionBtn, selectedAnswer, correctAnswer) {
  // console.log(selectedAnswer, correctAnswer);

  const allButtons = document.querySelectorAll('.optionBtn');
  // console.log(allButtons.classList);
  allButtons.forEach(btn => btn.disabled = true);
  // allButtons.forEach(btn => btn.classList.add('option-Disabled'));
  if (selectedAnswer === correctAnswer) {
    optionBtn.classList.add('option-Correct');
    score++;
    // console.log(selectedAnswer.classList)
  }
  else {
    optionBtn.classList.add('option-Wrong');
    // score--;
  }

  // HighLight correct answer;
  allButtons.forEach(btn => {
    if (btn.textContent === correctAnswer) {
      btn.classList.add('option-Correct', 'option-Disabled')

    }
  })
  nextQuestionBtn.disabled = false;
}

// Event listener for the Next Question button
nextQuestionBtn.addEventListener('click', function () {
  currentQuestionIndex++;
  nextQuestionBtn.disabled = true;
  displayQuestions(currentQuestionIndex);
});

//reset quiz
const resetQuiz = function () {
  // location.reload(); // 
  currentQuestionIndex = 0;
  score = 0;
  questions = [];
  clearState()
  toggleHidden(screen2, screen1);
};



// Event listener for the Exit button
exitBtn.addEventListener('click', resetQuiz);
playAgainBtn.addEventListener('click', function () {
  resetQuiz();
  toggleHidden(screen3, screen1);
  location.reload();
})


// helper functions
const shuffleArray = function (array) {
  // looping in reverse order
  for (let i = array.length - 1; i > 0; i--) {

    // Generate random index 
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};


// to decode the api response of complex entites we can use this function
// although not required for this project.
const decodeHtmlEntites = function (response) {
  const he = require('he');
  return he.decode(response);
}

// let example = `In the &quot;Call Of Duty: Zombies&quot; map &quot;Origins&quot;, how many numbered power generators are there?`;
// console.log(decodeHtmlEntites(example));