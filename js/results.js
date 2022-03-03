let results = JSON.parse(localStorage.getItem('storedResults'));

function resultsDisplay(results) {
  let totalRounds = document.querySelector('#rounds-played');
  console.log(totalRounds);
  let pElem = document.createElement('p');
  pElem.textContent = results.roundsPlayed;
  totalRounds.appendChild(pElem);

  let winPercentage = document.getElementById('win-percentage');
  let p1Elem = document.createElement('p');
  p1Elem.textContent = `${Math.floor(results.winPercent)}%`;
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

resultsDisplay(results);
