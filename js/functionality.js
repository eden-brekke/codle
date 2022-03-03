'use strict';

//------------- DOM WINDOW ----------------

let guessGrid = document.querySelector('[data-guess-grid]');
let alertContainer = document.querySelector("[data-alert-container]");
let endGameAlert = document.getElementById('alert-container');

// ------------- GLOBAL VARIABLES -----------
let wordLength = 5;
let danceAnimationDuration = 500;
let userGuess = '';
let guess = [];
userGuess = guess.join('');
let wordIndex = 0;
let won;

// ------------ FUNCTIONS ------------------


function percentCalc(results) {
  let percent = (parseInt(results.roundsWon) / parseInt(results.roundsPlayed)) * 100;
  results.winPercent = percent;
}

function bestStreakCalc(results) {
  let best = parseInt(results.bestStreak);
  let current = parseInt(results.currentStreak);
  if(best < current) {
    results.bestStreak = current;
  }
}

function randIndexGenerator() {
  let randIndex = Math.floor(Math.random() * Word.wordsArr.length);
  return randIndex;
}

function wordSelector() {
  wordIndex = randIndexGenerator();
  return Word.wordsArr[wordIndex].word;
}


function wordCheck(word, tile) {
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
      let key = document.querySelector(`[data-key='${tileLetter}']`);
      tile[i].className = 'tile correct';
      key.className = 'key correct';
    }
  }
}

function setToLocalStorage(results) {
  let storedResults = JSON.stringify(results);
  localStorage.setItem('storedResults', storedResults);
}

function winOrLose(results, word, attempts, wordIndex) {
  results.roundsPlayed++;
  if (won) {
    let h2Elem = document.createElement('h2');
    h2Elem.textContent = 'Nice Job! You Won!';
    endGameAlert.appendChild(h2Elem);
    let h3Elem = document.createElement('h3');
    h3Elem.textContent = word;
    endGameAlert.appendChild(h3Elem);
    let pElem = document.createElement('p');
    pElem.textContent = Word.wordsArr[wordIndex].desc;
    endGameAlert.appendChild(pElem);
    results.roundsWon++;
    results.currentStreak++;
    percentCalc(results);
    bestStreakCalc(results);
    setToLocalStorage(results);
    endGameAlert.className += 'popup';
    let playAgainButton = document.createElement('button');
    playAgainButton.setAttribute('type', 'submit');
    playAgainButton.textContent = 'Play Again';
    endGameAlert.appendChild(playAgainButton);
    let aElem = document.createElement('a');
    aElem.href = '/code-wordle/results.html';
    let resultsButton = document.createElement('button');
    resultsButton.textContent = 'Results';
    aElem.appendChild(resultsButton);
    endGameAlert.appendChild(aElem);
  }
  else if (attempts === 6) {
    let h2Elem = document.createElement('h2');
    h2Elem.textContent = 'Oh No! You Lost! Play again?';
    endGameAlert.appendChild(h2Elem);
    let h3Elem = document.createElement('h3');
    h3Elem.textContent = word;
    endGameAlert.appendChild(h3Elem);
    let pElem = document.createElement('p');
    pElem.textContent = Word.wordsArr[wordIndex].desc;
    endGameAlert.appendChild(pElem);
    results.currentStreak = 0;
    percentCalc(results);
    bestStreakCalc();
    setToLocalStorage(results);
    endGameAlert.className += 'popup';
    let indexElem = document.createElement('a');
    indexElem.href = '/index.html';
    let playAgainButton = document.createElement('button');
    playAgainButton.setAttribute('type', 'submit');
    playAgainButton.textContent = 'Play Again';
    indexElem.appendChild(playAgainButton);
    endGameAlert.appendChild(playAgainButton);
    let aElem = document.createElement('a');
    aElem.href = '/code-wordle/results.html';
    let resultsButton = document.createElement('button');
    resultsButton.textContent = 'Results';
    aElem.appendChild(resultsButton);
    endGameAlert.appendChild(aElem);
  }
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



// --------------- CONTROL FLOW ---------------

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
        winOrLose(results, word, attempts, wordIndex);
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
        winOrLose(results, word, attempts, wordIndex);
      }
    }
  }
  document.addEventListener('click', enterClicked);
}

playGame();

// -------------- EVENT LISTENERS ---------------

document.addEventListener('click', handleMouseClick);

// -------------- COMMENTED OUT VARIABLES DOM WINDOWS, FUNCTIONS AND LISTENER ----------------------

// let keyboard = document.querySelector("[data-keyboard]");
// let flipAnimationDuration = 500;

// Flip tile function unused as of now
// function flipTile(tiles) {
  //   tiles.forEach(function (tile, index) {
//     setTimeout(function () {
//       tile.className = 'tile flip';
//       tile.addEventListener(
//         'animationEnd',
//         function () {
//           tile.className = 'tile';
//         },
//         { once: true }
//       );
//     }, (index * flipAnimationDuration) / 5);
//   });
// }

// play again functionality still not working #############
// function handlePlayAgain() {
//   window.location.reload();
//   // playGame();
// }


// endGameAlert.addEventListener('submit', handlePlayAgain);
