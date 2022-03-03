'use strict';
// app.js will hold the control flow for the game itself and make reference to constructors.js and functionality.js.

// -------------- GLOBAL VARIABLES/IMPORTS -----------

let wordLength = 5;
let flipAnimationDuration = 500;
let danceAnimationDuration = 500;

// --------------- DOM Windows ------------------
let keyboard = document.querySelector("[data-keyboard]");
let alertContainer = document.querySelector("[data-alert-container]");

// --------------- CONTROL FLOW ---------------

// main game play function.
// Comments above function calls, apply to which box on flowchart is being called.
// word objects instantiated on page load.


function playGame() {

  // checking local storage for past results.
  let parsedResults = JSON.parse(localStorage.getItem('storedResults'));
  let results;
  let attempts = 0

  // if localStorage results exist load, else create results.
  if (parsedResults) {
    results = parsedResults;
  } else {
    results = {
      roundsPlayed: 0,
      roundsWon: 0,
      winPercent: 0,
      currentStreak: 0,
      bestStreak: 0,
    };
  }

  // gameplay begins

  let word = wordSelector(); // getting  word for play.

  // receive guess from user >> happens on user press of submit button.
  // check guess with wordCheck/letterCheck/indexCheck.
  
  function performChecks(enterClicked) {

    if (wordCheck() === true) {
      winOrLose();
    } else {
      letterCheck(); // return indexs in userguess that are in word
      indexCheck();
      
    }
  }

  

} // << gameplay function closing squiggle



// -------------- FUNCTION CALLS --------------

// stretch goal: to get keypress to work this will need a separate placeLetters function
document.addEventListener("click", enterClicked);

// event listener for submit button press.

