// this contains all the variables which we are going to use throughout this project.

// the ones which are responsible for the imp stuff.

// use uppercase for consts

export const TIMEOUT_SEC = 10;

// Function to build the API URL dynamically
export const buildApiUrl = () => {
  const amount = questionNumber.value || 10; // minimum 10 questions
  if (amount < 5) {
    return alert('Please enter number of question greater than 5');
  }
  let category = questionCategory.value
  if (category.value === undefined) {
    category = 9;
  }


  let difficulty = questionDifficulty.value;
  if (difficulty.length === 3) {
    difficulty = 'easy';
  }


  let type = questionType.value;

  if (type.length === 3) {
    type = 'multiple';
  }

  // console.log(type.length, difficulty.length);


  return `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
};