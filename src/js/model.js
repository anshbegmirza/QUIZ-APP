import { async } from 'regenerator-runtime';
import 'core-js/es/object/create';
import * as helper from "./helper.js";
import * as config from "./config.js"


//MODEL JS 

// to store the quiz state as a state object in model
export const state = {
  currentQuestionIndex: 0,
  questions: [],
  score: 0,
  TIMEOUT_SEC: config.TIMEOUT_SEC,
};


// to save the quiz state to the local storage
export const saveState = function () {
  const quizState = {
    currentQuestionIndex: state.currentQuestionIndex,
    questions: state.questions,
    score: state.score,
  };
  localStorage.setItem('quizState', JSON.stringify(quizState));
};


// function to restore data from the saved local storage
export const restoreState = function () {
  const savedState = JSON.parse(localStorage.getItem('quizState'));
  // if saved state exists
  if (savedState) {
    state.currentQuestionIndex = savedState.currentQuestionIndex;
    state.questions = savedState.questions;
    state.score = savedState.score;
    return true;
  }
  // else move ahead
  return false;
};

//function to clear state
export const clearState = () => {
  localStorage.removeItem('quizState');
}

// to fetch questions data from the api
export const fetchQuestions = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, helper.timeout(state.TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    state.questions = data.results;
    return state.questions;
  } catch (err) {
    throw new Error(`Error fetching data: ${err.message}`);
  }
};



