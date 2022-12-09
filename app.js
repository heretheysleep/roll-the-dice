const rollButton = document.querySelector(".button--roll");
const resetButton = document.querySelector(".button--reset");
const playerOnePainel = document.querySelector(".player--1");
const playerTwoPainel = document.querySelector(".player--2");
const playerOneCurrentScoreElement = document.querySelector(
  ".player--1 .player__score"
);
const playerTwoCurrentScoreElement = document.querySelector(
  ".player--2 .player__score"
);
const playerOneMatchesWonElement = document.querySelector(
  ".player--1 .player__won-matches"
);
const playerTwoMatchesWonElement = document.querySelector(
  ".player--2 .player__won-matches"
);
const dice = document.querySelector(".dice");

let currentPlayer = 1;
let playerOneCurrentScore = 0;
let playerTwoCurrentScore = 0;
let playerOneMatchesWon = 0;
let playerTwoMatchesWon = 0;

function updateInterface() {
  if (currentPlayer != 1) {
    playerOnePainel.classList.remove("player--active");
    playerTwoPainel.classList.add("player--active");
  } else {
    playerOnePainel.classList.add("player--active");
    playerTwoPainel.classList.remove("player--active");
  }
}

function roll() {
  const sortedDice = Math.trunc(Math.random() * 6) + 1;
  dice.style.backgroundImage = "url('/dices/" + sortedDice + ".svg')";

  return sortedDice;
}

function updateCurrentScore(score) {
  if (currentPlayer == 1) {
    playerOneCurrentScore += score;

    if (playerOneCurrentScore >= 20) {
      playerOneMatchesWon += 1;
      playerOneMatchesWonElement.textContent = playerOneMatchesWon;

      resetCurrentScores();
    } else {
      playerOneCurrentScoreElement.textContent = playerOneCurrentScore;
    }
  } else {
    playerTwoCurrentScore += score;

    if (playerTwoCurrentScore >= 20) {
      playerTwoMatchesWon += 1;
      playerTwoMatchesWonElement.textContent = playerTwoMatchesWon;

      resetCurrentScores();
    } else {
      playerTwoCurrentScoreElement.textContent = playerTwoCurrentScore;
    }
  }

  if (score != 1) {
    changePlayer();
  }
}

function changePlayer() {
  currentPlayer = currentPlayer == 1 ? 2 : 1;
}

function resetCurrentScores() {
  playerOneCurrentScore = 0;
  playerTwoCurrentScore = 0;

  playerOneCurrentScoreElement.textContent = 0;
  playerTwoCurrentScoreElement.textContent = 0;

  resetDice();
}

function resetMatchesWon() {
  playerOneMatchesWon = 0;
  playerTwoMatchesWon = 0;
  playerOneMatchesWonElement.textContent = 0;
  playerTwoMatchesWonElement.textContent = 0;
}

function resetDice() {
  dice.style.backgroundImage = "none";
}

rollButton.addEventListener("click", () => {
  const score = roll();
  updateCurrentScore(score);
  updateInterface();
});

resetButton.addEventListener("click", () => {
  resetCurrentScores();
  resetMatchesWon();

  if (currentPlayer == 2) {
    changePlayer();
    updateInterface();
  }
});
