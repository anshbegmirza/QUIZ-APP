import * as config from './config.js'

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long ! Timeout after ${s} seconds`))
    }, s * 1000);
  });
};


// function to shuffle array
export const shuffleArray = function (array) {
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
