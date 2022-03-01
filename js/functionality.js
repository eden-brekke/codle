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
function checkResults() {


  let results = { // this will need to be placed within function control flow
    roundsPlayed: 0,
    roundsWon: 0,
    winPercent: (this.roundsPlayed / this.roundsWon) * 100,
    currentStreak: 0,
    bestStreak: 0,
  };
}

// TODO: generate a random number in relation to the length of the words array.
function randIndexGenerator() {

}

// this function will call randIndexGenerator and use return to get word for round of play.
// TODO: get function to return a word for game play.
function wordSelector() {

}

// this function checks if the users word EXACTLY matches the selected word.
// TODO: get function to check that index and content of guess word === selected word
function wordCheck() {

}

// this function checks if any of the letters in the guess match the selected word, and calls the function to check its index
// TODO: should check using .includes if letter in guess === letter in word, than calls indexcheck on that letter than yellowletter or greenletter.
function letterCheck() {

}

// this function will compare the index location of correct guessed letter vs word letter and turn board and keyboard green if match.
// TODO: should check index location of guessed letter against word. and call greenLetter if both true.
function indexCheck() {

}


// function sets data into local storage
// TODO: get data and stringify it.
// TODO: setItem with key and value.
function setToLocalStorage() {

}

// this function handles the win/lose conditions
// TODO: should display word, and description
// TODO: should increment counters/winstreak/currentStreak
// TODO: should popup with play again or go to results page options.
// TODO: on lose should reset currentStreak to zero
function winOrLose() {

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
// TODO: Takes in selected letter from on screen keyboard, displays it on game board.
function pressKey(key) {
  let activeTile = getActiveTile(); // invoke get Active tile function below -EB
  if (activeTile.length >= wordLength) return; // if the amount of active tiles is greater than the wordLength variable (5) then return -eb
  let nextTile = guessGrid.querySelector(':not([data-letter'); // makes the next active tile be one without a data-type letter -EB
  nextTile.dataset.letter = key.toLowerCase(); // ensures letter types are read as lowercase to compare to our constructor words -EB
  nextTile.textContent = key; // Makes text content of the next tile match the key that was pressed, each key is assigned their own letter in HTML -EB
  nextTile.dataset.state = 'active'; // changes data-state to active this should help work with changing the letters colors later. -EB
}

function placeLetter(key) { // function to place the letter in the right spot -EB
  let activeTile = getActiveTile(); // invokes get active tile function below -EB
  if (activeTile.length >= wordLength) return; // if the amount of active tiles is greater than the wordLength Variable (5) then return -EB
  let nextTile = guessGrid.querySelector(':not([data-letter])'); // select a tile that does not currently have a letter in it -EB
  nextTile.dataset.letter = key.toLowerCase(); // change letters to lower case to allow for comparison to constructor words -EB
  nextTile.textContent = key; // give tile text in relation to key pressed -EB
  nextTile.dataset.state = 'active'; // change data state to active -will work with changing letter colors later -EB
}

function getActiveTile() {
  return guessGrid.querySelectorAll('[data-state="active"]'); // grab the guessing grid from index.html and set all their data-states to active -EB
}

// removes letter from board when user pressed delete button on keyboard.
// TODO: removes last letter added to game board when delete button is pressed.
function removeLetter() { //
  let activeTile = getActiveTile();
  let lastTile = activeTile[activeTile.length - 1];
  if (lastTile === null) return;
  lastTile.textContent = '';
  delete lastTile.dataset.state;
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
}

// ------------- ANIMATIONS ------------

function shakeTile(tiles) {
  tiles.forEach(function (tile) {
    tile.classList.add('shake');
    tile.addEventListener(
      'animationEnd',
      function () {
        tile.classList.remove('shake');
      },
      { once: true }
    );
  });
}

// turns letter on board and keyboard yellow if letter in word but not in correct index
// TODO: should perform DOM manipulation to change styling of letter on board and keyboard << --- by adding a style class to both keyboard and game board item


// turns letter on board and keyboard green if letter in word and in correct index
// TODO: should perform DOM manipulation to change styling of letter on board and keyboard << by adding style class to both keyboard and game board items in html


// turns letter on keyboard dark color and disables letter button on keyboard.
// TODO:
//This function is going to need to be re-worked a LOT i think with other people's functions in mind but for now this is how my brains figured it out -EB
function flipTile(tile, index, array, guess) {
  let letter = tile.dataset.letter;
  let key = keyboard.querySelector(`[data-key="${letter}"i]`);
  setTimeout(function () {
    tile.classList.add('flip');
  }, (index * flipAnimationDuration) / 2);

  tile.addEventListener(
    'transitionEnd',
    function () {
      tile.classList.remove('flip');
      if (targetWord[index] === letter) {// using a variable that I haven't defined so this will need to change based on others code -EB
        tile.dataset.state = 'correct';
        key.classList.add('correct');
      } else if (targetWord.includes(letter)) {
        tile.dataset.state = 'wrong-location';
        key.classList.add('wrong-location');
      } else {
        tile.dataset.state = 'wrong';
        key.classList.add('wrong');
      }
      if (index === array.legnth - 1) {
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
