'use strict';

//------------- DOM WINDOW -------------
let guessGrid = document.querySelector('[data-guess-grid]');
// This page will contain the functions for use within app.js.

// ------------ FUNCTIONS ------------------

/*

This function checks for existing game play results within local storage.
If results
access them, so counters are incremented correctly on game win or lose.

else no results,
instantiate new results object to increment on game win or lose.

*/
//DOM window for winOrLose
let endGameAlert = document.getElementById('alert-container');

//local storage use
let parsedResults = JSON.parse(localStorage.getItem('storedResults'));
let results;

if (parsedResults) {
  results = parsedResults;
}
else {
  results = {
    roundsPlayed: 20,
    roundsWon: 10,
    winPercent: 0,
    currentStreak: 0,
    bestStreak: 0,
    percentCalc: function() {
      let percent = (parseInt(this.roundsWon) / parseInt(this.roundsPlayed)) * 100;
      this.winPercent = percent;
    },
  };
  results.percentCalc();
}

// DONE: generate a random number in relation to the length of the words array.
function randIndexGenerator(wordsArr) {
  let randIndex = Math.floor(Math.random() * wordsArr.length);
  return randIndex;
}

// this function will call randIndexGenerator and use return to get word for round of play.
// DONE: get function to return a word for game play.
function wordSelector(wordsArr) {
  let word = wordsArr[randIndexGenerator(wordsArr)];
  return word;
}

// this function checks if the users word EXACTLY matches the selected word.
// DONE: get function to check that index and content of guess word === selected word
function wordCheck(userGuess, word) {
  if (userGuess === word) {
    return true;
  } else {
    return false;
  }
}

// this function checks if any of the letters in the guess match the selected word, and calls the function to check its index
// TODO: should check using .includes if letter in guess === letter in word, than calls indexcheck on that letter than yellowletter or greenletter.
function letterCheck() {
  for (let i = 0; i < word.legnth; i++) {
    if (word.contains(userGuess[i])) {
      indexCheck(userGuess[i]) // if this returns true > turn letter green. 
      return
    } else {
      //turn letterYellow
    }
  }
}

// this function will compare the index location of correct guessed letter vs word letter and turn board and keyboard green if match.
// TODO: should check index location of guessed letter against word. and call greenLetter if both true.
function indexCheck() {

}

// function sets data into local storage
// DONE: get data and stringify it.
// DONE: setItem with key and value.
// TODO: test functionality
function setToLocalStorage() {
  let storedResults = JSON.stringify(results);
  localStorage.setItem('storedResults', storedResults);
}

// this function handles the win/lose conditions
// DONE: should display word, and description
// DONE: should increment counters/winstreak/currentStreak
// DONE: should popup with play again or go to results page options.
// DONE: on lose should reset currentStreak to zero
// TODO: test functionality, iterate.
function winOrLose() {
  //display word and description - need logic from wordSelector() for currentWord and currentDesc
  let h3Elem = document.createElement('h3');
  h3Elem.textContent = currentWord;
  endGameAlert.appendChild(h3Elem);
  let pElem = document.createElement('p');
  pElem.textContent = currentDesc;
  endGameAlert.appendChild(pElem);
  //increment roundsPlayed
  results.roundsPlayed++;
  //increments roundsWon if the player won the round and set currentSteak to 0 if lost- need logic from check functions
  if (won) {
    results.roundsWon++;
    results.currentStreak++;
  }
  else {
    results.currentStreak = 0;
  }
  //checks currentSteak against best Streak
  if (results.currentStreak > results.bestStreak) {
    results.bestSteak = results.currentStreak;
  }
  //play again button
  let playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play Again';
  endGameAlert.appendChild(playAgainButton);
  //view results button
  let resultsButton = document.createElement('button');
  resultsButton.textContent = 'Results';
  endGameAlert.appendChild(resultsButton);
}

// ------------ EVENT HANDLERS -------------

function handleMouseClick(event) {
  if (event.target.matches('[data-key]')) { // if the click matches anything with the data-attribute data-key -EB
    pressKey(event.target.dataset.key); // press the key! -EB
    return;
  }
  if (event.target.matches('[data-enter]')) { // data-enter is assigned to enter key so that when you press it it will invoke the userGuess -EB
    userGuess();
    return;
  }
  if (event.target.matches('[data-delete]')) { // data-delete is assigned to the delete key so that when you press it it will invoke the removeLetter function -EB
    removeLetter();
    return;
  }
}

// places letter on board when user selects letter on keyboard.
// DONE: Takes in selected letter from on screen keyboard, displays it on game board.
// TODO: Test and fix. 
function pressKey(key) {
  let activeTile = getActiveTile(); // invoke get Active tile function below -EB
  if (activeTile.length >= wordLength) return; // if the amount of active tiles is greater than the wordLength variable (5) then return -eb
  let nextTile = guessGrid.querySelector(':not([data-letter'); // makes the next active tile be one without a data-type letter -EB
  nextTile.dataset.letter = key.toLowerCase(); // ensures letter types are read as lowercase to compare to our constructor words -EB
  nextTile.textContent = key; // Makes text content of the next tile match the key that was pressed, each key is assigned their own letter in HTML -EB
  nextTile.dataset.state = 'active'; // changes data-state to active this should help work with changing the letters colors later. -EB
}

function getActiveTile() {
  return guessGrid.querySelectorAll('[data-state="active"]'); // grab the guessing grid from index.html and set all their data-states to active -EB
}

// removes letter from board when user pressed delete button on keyboard.
// DONE: removes last letter added to game board when delete button is pressed.
// TODO: test and fix
function removeLetter() { // remove a letter from grid -EB
  let activeTile = getActiveTile(); // run function getactivetiles which changes grid state to active -EB
  let lastTile = activeTile[activeTile.length - 1]; // create variable for last tile, as the active times minus 1 - EB
  if (lastTile === null) return; // if the last tile is null then return.
  lastTile.textContent = ''; // else make last tile text content blank -EB
  delete lastTile.dataset.state; // sets delete data state and letter
  delete lastTile.dataset.letter;
}

// gets users guess from index.html and passes to the processing functions < triggered by user pressing enter or submit button on game board.
// TODO: save users guess letters.
// TODO: place all letters in a Array.
// TODO: returns that guess variable for other functions to use.
function userGuess() {
  let activeTile = [...getActiveTile()]; // using a ... rest parameter to accept an indefinite number of arguments into the array -EB
  if (activeTile.length !== wordLength) {
    alert('Not Enough Letter!');
    shakeTile(activeTile);
    return;
  } 
  let guess = getActiveTile((function (word, tile) {
    return word + tile.dataset.letter;
  }, ''));
  if (!wordsArr.includes(guess)) {
    alert('Not in word list');
    shakeTile(activeTile);
    return;
  }
  // I'm iffy about if this will work, the idea is that it removes the event and then flips to active tiles, but I'm not sure which parameters to set -EB
  document.removeEventListener('click', handleMouseClick);
  activeTile.forEach(function (...parameters) {
    flipTile(...parameters, guess);
  });
}

// ------------- ANIMATIONS ------------

function shakeTile(tiles) {
  tiles.forEach(function (tile) { // if the tiles are regarded as an array then forEach targets each individual tile -EB
    tile.classList.add('shake'); // shake is reference to CSS style -EB
    tile.addEventListener(
      'animationEnd',
      function () {
        tile.classList.remove('shake');
      },
      { once: true }
    );
  });
}

//This function is going to need to be re-worked a LOT i think with other people's functions in mind but for now this is how my brains figured it out -EB
function flipTile(tile, index, array, guess) {
  let letter = tile.dataset.letter;
  let key = keyboard.querySelector(`[data-key="${letter}"]`);
  setTimeout(function () {
    tile.classList.add('flip');
  }, (index * flipAnimationDuration) / 2);
  
  tile.addEventListener(
    'transitionEnd',
    function () {
      tile.classList.remove('flip');
      if (wordSelector[index] === letter) {// using a variable that I haven't defined so this will need to change based on others code -EB
        tile.dataset.state = 'correct';
        key.classList.add('correct');
      } else if (wordSelector.includes(letter)) {
        tile.dataset.state = 'wrong-location';
        key.classList.add('wrong-location');
      } else {
        tile.dataset.state = 'wrong';
        key.classList.add('wrong');
      }
      if (index === array.length - 1) {
        tile.addEventListener(
          'transitionEnd',
          function () {
            handleMouseClick();
            winOrLose(guess, array);
          },
          { once: true }
        );
      }
    },
    { once: true }
  );
}

// -------------- EVENT LISTENERS ---------------

document.addEventListener("click", handleMouseClick);
