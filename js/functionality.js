'use strict';

//------------- DOM WINDOW -------------
let guessGrid = document.querySelector('[data-guess-grid]');
let keyboard = document.querySelector("[data-keyboard]");
let alertContainer = document.querySelector("[data-alert-container]");

// This page will contain the functions for use within app.js.

// ------------ FUNCTIONS ------------------


let userGuess = '';
let guess = [];
userGuess = guess.join('');
/*
This function checks for existing game play results within local storage.
If results
access them, so counters are incremented correctly on game win or lose.
else no results,
instantiate new results object to increment on game win or lose.
*/
//DOM window for winOrLose
let endGameAlert = document.getElementById('alert-container');

// local storage use
// let parsedResults = JSON.parse(localStorage.getItem('storedResults'));
// let results;

// if (parsedResults) {
//   results = parsedResults;
// } else {
//   results = {
//     roundsPlayed: 0,
//     roundsWon: 0,
//     winPercent: 0,
//     currentStreak: 0,
//     bestStreak: 0,
//   };
// }

//reassigns results.winPercent with proper value - would return null if this function was a method of results
function percentCalc(results) {
  let percent = (parseInt(results.roundsWon) / parseInt(results.roundsPlayed)) * 100;
  results.winPercent = percent;
}

// DONE: generate a random number in relation to the length of the words array.
function randIndexGenerator() {
  let randIndex = Math.floor(Math.random() * Word.wordsArr.length);
  return randIndex;
}

// this function will call randIndexGenerator and use return to get word for round of play.
// DONE: get function to return a word for game play.
let wordIndex = 0; 
function wordSelector() {
  wordIndex = randIndexGenerator();
  return Word.wordsArr[wordIndex].word;
}

// this function checks if the users word EXACTLY matches the selected word.
// DONE: get function to check that index and content of guess word === selected word
let won;
let lose;
function wordCheck(word, tile) { // works
  if (userGuess === word) {
    for (let i = 0; i < wordLength; i++) {
      let tileLetter = tile[i].dataset.letter;
      // let tileArr = Array.from(tile);
      let key = document.querySelector(`[data-key='${tileLetter}']`);
      tile[i].className = 'tile correct';
      key.className = 'key correct';
    }
    won = true;
    danceTile(tile);
    return true;
  } else {
    won = false;
    shakeTile(tile);
    return false;
  }
}

// this function checks if any of the letters in the guess match the selected word, and calls the function to check its index
// TODO: should check using .includes if letter in guess === letter in word, than calls indexcheck on that letter than yellowletter or greenletter.
function letterCheck(word, tile) {
  for (let i = 0; i < wordLength; i++) {
    if (word.includes(userGuess[i])) {
      let tileLetter = tile[i].dataset.letter;
      let key = document.querySelector(`[data-key='${tileLetter}']`);
      tile[i].className = 'tile wrong-location';
      key.className = 'key wrong-location';
    }
  }
}

// this function will compare the index location of correct guessed letter vs word letter and turn board and keyboard green if match.
// TODO: should check index location of guessed letter against word. and call greenLetter if both true.
function indexCheck(word, tile) {
  for (let i = 0; i < wordLength; i++) {
    if (word[i] === userGuess[i]) {
      let tileLetter = tile[i].dataset.letter;
      let key = document.querySelector(`[data-key='${tileLetter}']`).className = 'correct';
      // delete tile[i].dataset.state;
      tile[i].className = 'tile correct';
      key.className = 'key correct';
    // } else if(word[i] !== userGuess[i]) {
    //   let tileLetter = tile[i].dataset.letter;
    //   let key = document.querySelector(`:not([data-key=${tileLetter}]`).className = 'wrong';
    //   tile[i].className = 'tile wrong shake';
    //   key.className = 'key wrong';
    }
  }
}

// function sets data into local storage
// DONE: get data and stringify it.
// DONE: setItem with key and value.
// TODO: test functionality
function setToLocalStorage(results) {
  let storedResults = JSON.stringify(results);
  localStorage.setItem('storedResults', storedResults);
}

// this function handles the win/lose conditions
// DONE: should display word, and description
// DONE: should increment counters/winstreak/currentStreak
// DONE: should popup with play again or go to results page options.
// DONE: on lose should reset currentStreak to zero
// TODO: test functionality, iterate.
function winOrLose(results, word, attempts, wordIndex, wordsArr) {
  //display word and description - need logic from wordSelector() for currentWord and currentDesc
  let h3Elem = document.createElement('h3');
  h3Elem.textContent = word;
  endGameAlert.appendChild(h3Elem);
  let pElem = document.createElement('p');
  pElem.textContent = Word.wordsArr[wordIndex].desc; // Word.word.desc
  endGameAlert.appendChild(pElem);
  //increment roundsPlayed
  results.roundsPlayed++;
  //increments roundsWon if the player won the round and set currentSteak to 0 if lost- need logic from check functions
  if (won) {
    results.roundsWon++;
    results.currentStreak++;
    percentCalc(results);
    setToLocalStorage(results);
    //play again button
    let playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    endGameAlert.appendChild(playAgainButton);
    //view results button
    let aElem = document.createElement('a');
    aElem.href = '/results.html';
    let resultsButton = document.createElement('button');
    resultsButton.textContent = 'Results';
    aElem.appendChild(resultsButton);
    endGameAlert.appendChild(aElem);
  }
  else if (attempts === 6) {
    results.currentStreak = 0;
    percentCalc(results);
    setToLocalStorage(results);
    //play again button
    let playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    endGameAlert.appendChild(playAgainButton);
    //view results button
    let aElem = document.createElement('a');
    aElem.href = '/results.html';
    let resultsButton = document.createElement('button');
    resultsButton.textContent = 'Results';
    aElem.appendChild(resultsButton);
    endGameAlert.appendChild(aElem);
  }
  //checks currentSteak against best Streak
  if (results.currentStreak > results.bestStreak) {
    results.bestStreak = results.currentStreak;
  }
}


function resultsDisplay(results) {
  let totalRounds = document.querySelector('#rounds-played');
  console.log(totalRounds);
  let pElem = document.createElement('p');
  pElem.textContent = results.roundsPlayed;
  totalRounds.appendChild(pElem);

  let winPercentage = document.getElementById('win-percentage');
  let p1Elem = document.createElement('p');
  p1Elem.textContent = results.winPercent;
  winPercentage.appendChild(p1Elem);

  let currentWins = document.getElementById('win-streak');
  let p2Elem = document.createElement('p');
  p2Elem.textContent = results.currentStreak;
  currentWins.appendChild(p2Elem);

  let bestWins = document.getElementById('best-win-streak');
  let p3Elem = document.createElement('p');
  p3Elem.textContent = results.bestStreak;
  bestWins.appendChild(p3Elem);
}


// ------------ EVENT HANDLERS -------------

function handleMouseClick(event) {
  if (event.target.matches('[data-key]')) { // if the click matches anything with the data-attribute data-key -EB
    addLetter(event.target.dataset.key); // press the key! -EB
    return;
  }
  if (event.target.matches('[data-enter]')) { // data-enter is assigned to enter key so that when you press it it will invoke the userGuess -EB
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
function addLetter(key) {
  let activeTile = getActiveTile(); // invoke get Active tile function below -EB
  // if (activeTile.length >= wordLength) return; // if the amount of active tiles is greater than the wordLength variable (5) then return -eb
  let nextTile = guessGrid.querySelector(':not([data-letter]'); // makes the next active tile be one without a data-type letter -EB
  // console.dir(nextTile);
  nextTile.dataset.letter = key.toLowerCase(); // ensures letter types are read as lowercase to compare to our constructor words -EB
  nextTile.textContent = key; // Makes text content of the next tile match the key that was pressed, each key is assigned their own letter in HTML -EB
  nextTile.dataset.state = 'active'; // changes data-state to active this should help work with changing the letters colors later. -EB
  guess.push(key);
  userGuess = guess.join('');
}

function getActiveTile() {
  return [...guessGrid.querySelectorAll('[data-state="active"]')]; // grab the guessing grid from index.html and set all their data-states to active -EB
}

// removes letter from board when user pressed delete button on keyboard.
// DONE: removes last letter added to game board when delete button is pressed.
// TODO: test and fix
function removeLetter() { // remove a letter from grid -EB
  let activeTile = getActiveTile(); // run function getactivetiles which changes grid state to active -EB
  let lastTile = activeTile[activeTile.length - 1]; // create variable for last tile, as the active times minus 1 - EB
  // console.dir(lastTile);
  let removedTile = guessGrid.querySelector(':not([data-letter]');

  if (lastTile === null) return; // if the last tile is null then return.
  lastTile.textContent = ''; // else make last tile text content blank -EB
  delete lastTile.dataset.state; // sets delete data state and letter
  delete lastTile.dataset.letter;
  guess.pop();
}


// ------------- ANIMATIONS ------------

function shakeTile(tiles) {
  tiles.forEach(function (tile) {
    tile.classList.add('shake');
    tile.addEventListener(
      'animationEnd',
      function () {
        tile.className = 'tile';
      },
      { once: true }
    );
  });
}


function danceTile(tiles) {
  tiles.forEach(function (tile, index) {
    setTimeout(function () {
      tile.className = 'tile dance correct';
      tile.addEventListener(
        'animationEnd',
        function () {
          tile.className = 'tile';
        },
        { once: true }
      );
    }, (index * danceAnimationDuration) / 5);
  });
}

function flipTile(tiles) {
  tiles.forEach(function (tile, index) {
    setTimeout(function () {
      tile.className = 'tile flip';
      tile.addEventListener(
        'animationEnd',
        function () {
          tile.className = 'tile';
        },
        { once: true }
      );
    }, (index * flipAnimationDuration) / 5);
  });
}


function handlePlayAgain() {
  if ((event.target.matches('[data-enter]'))) {
    playGame();
  }
}


// --------------- CONTROL FLOW ---------------

// main game play function.
// Comments above function calls, apply to which box on flowchart is being called.
// word objects instantiated on page load.

let wordLength = 5;
let flipAnimationDuration = 500;
let danceAnimationDuration = 500;


function playGame(wordsArr) {

  // checking local storage for past results.
  let parsedResults = JSON.parse(localStorage.getItem('storedResults'));
  let results;
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
  let word = wordSelector();
  console.log(word);

  // receive guess from user >> happens on user press of submit button.
  // check guess with wordCheck/letterCheck/indexCheck.
  let tileCounter = 0;
  let whileClose = 0;
  let attempts = 0;

  function enterClicked(event) {

    if ((event.target.matches('[data-enter]'))) {
      if (wordCheck(word, getActiveTile())) {
        winOrLose(results, word, attempts, wordIndex, wordsArr);
        resultsDisplay(results);
      } else {
        letterCheck(word, getActiveTile()); // return indexs in userguess that are in word
        indexCheck(word, getActiveTile());
      }
      // lock row one from further edits <by removing active row ID>, and set next row as active row.

      while (tileCounter <= whileClose) {
        for (let i = 1; i < 6; i++) {
          let rowDivs = document.getElementById(`tile${tileCounter + 1}`);
          delete rowDivs.dataset.state;
          tileCounter++;
        }
      }
      whileClose += 5;
      guess = [];
      userGuess = '';
      attempts++;
      if (attempts === 6) {
        winOrLose(results, word, attempts, wordIndex, wordsArr);
      }
    }
    // nextTile.dataset.state = 'active'; // we only need this if we need another data state for used rows. 
  }

  document.addEventListener("click", enterClicked);

} // << gameplay function closing squiggle

playGame();

// -------------- EVENT LISTENERS ---------------


// End of app JS listeners ^^^

document.addEventListener("click", handleMouseClick);
// alertContainer.addEventListener("submit", handlePlayAgain);
