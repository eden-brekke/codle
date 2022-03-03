'use strict';

//------------- DOM WINDOW ----------------

let guessGrid = document.querySelector('[data-guess-grid]');
// let keyboard = document.querySelector("[data-keyboard]");
let alertContainer = document.querySelector("[data-alert-container]");


// ------------ FUNCTIONS ------------------

let userGuess = '';
let guess = [];
userGuess = guess.join('');

let endGameAlert = document.getElementById('alert-container');


function percentCalc(results) {
  let percent = (parseInt(results.roundsWon) / parseInt(results.roundsPlayed)) * 100;
  results.winPercent = percent;
}

function randIndexGenerator() {
  let randIndex = Math.floor(Math.random() * Word.wordsArr.length);
  return randIndex;
}

let wordIndex = 0;
function wordSelector() {
  wordIndex = randIndexGenerator();
  return Word.wordsArr[wordIndex].word;
}

let won;
let lose;
function wordCheck(word, tile) { // works
  if (userGuess === word) {
    for (let i = 0; i < wordLength; i++) {
      let tileLetter = tile[i].dataset.letter;
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

function indexCheck(word, tile) {
  for (let i = 0; i < wordLength; i++) {
    if (word[i] === userGuess[i]) {
      let tileLetter = tile[i].dataset.letter;
      let key = document.querySelector(`[data-key='${tileLetter}']`).className = 'correct';
      tile[i].className = 'tile correct';
      key.className = 'key correct';

    }
  }
}

function setToLocalStorage(results) {
  let storedResults = JSON.stringify(results);
  localStorage.setItem('storedResults', storedResults);
}


function winOrLose(results, word, attempts, wordIndex, wordsArr) {
  let h3Elem = document.createElement('h3');
  h3Elem.textContent = word;
  endGameAlert.appendChild(h3Elem);
  let pElem = document.createElement('p');
  pElem.textContent = Word.wordsArr[wordIndex].desc;
  endGameAlert.appendChild(pElem);
  results.roundsPlayed++;

  if (won) {
    results.roundsWon++;
    results.currentStreak++;
    percentCalc(results);
    setToLocalStorage(results);
    //play again button
    endGameAlert.className += 'popup';
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
    endGameAlert.className += 'popup';
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
  if (results.currentStreak > results.bestStreak) {
    results.bestStreak = results.currentStreak;
  }
}


function resultsDisplay(results) {
  let totalRounds = document.getElementById('rounds-played');
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
  if (event.target.matches('[data-key]')) {
    addLetter(event.target.dataset.key);
    return;
  }
  if (event.target.matches('[data-enter]')) {
    return;
  }
  if (event.target.matches('[data-delete]')) {
    removeLetter();
    return;
  }
}


function addLetter(key) {
  let activeTile = getActiveTile();
  let nextTile = guessGrid.querySelector(':not([data-letter]');
  nextTile.dataset.letter = key.toLowerCase();
  nextTile.textContent = key;
  nextTile.dataset.state = 'active';
  guess.push(key);
  userGuess = guess.join('');
}

function getActiveTile() {
  return [...guessGrid.querySelectorAll('[data-state="active"]')];
}

function removeLetter() {
  let activeTile = getActiveTile();
  let lastTile = activeTile[activeTile.length - 1];
  let removedTile = guessGrid.querySelector(':not([data-letter]');

  if (lastTile === null) return;
  lastTile.textContent = '';
  delete lastTile.dataset.state;
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

let wordLength = 5;
let flipAnimationDuration = 500;
let danceAnimationDuration = 500;


function playGame(wordsArr) {


  let parsedResults = JSON.parse(localStorage.getItem('storedResults'));
  let results;

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


  let word = wordSelector();
  console.log(word);


  let tileCounter = 0;
  let whileClose = 0;
  let attempts = 0;

  function enterClicked(event) {

    if ((event.target.matches('[data-enter]'))) {
      if (wordCheck(word, getActiveTile())) {
        winOrLose(results, word, attempts, wordIndex, wordsArr);
      } else {
        letterCheck(word, getActiveTile());
        indexCheck(word, getActiveTile());
      }


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
  }

  document.addEventListener("click", enterClicked);

}

playGame();

// -------------- EVENT LISTENERS ---------------


document.addEventListener("click", handleMouseClick);
// alertContainer.addEventListener("submit", handlePlayAgain);
