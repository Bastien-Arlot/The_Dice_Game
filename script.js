'use strict';
//Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// Variables needed for the init and to appear in the global scope
let scores, currentScore, activePlayer, playing;

// Function for Starting conditions
const startingCondition = function () {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    document.querySelector(`#name--0`).textContent = "Player 1";
    document.querySelector(`#name--1`).textContent = "Player 2";
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
};

startingCondition();

// Function to switch Player

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");

};


//We wrote the .hidden in the style with a display none value to use it.
diceEl.classList.add("hidden");

// Rolling dice functionality

btnRoll.addEventListener("click", function () {
    if (playing) {
        // Generating random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // Display dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;
        // Check for rolled 1 if true switch to next player
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

// Hold button functionality

btnHold.addEventListener("click", function () {
    if (playing) {
        // Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if player's score is 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            document.querySelector(`#name--${activePlayer}`).textContent = "You WON 🤠";
            diceEl.classList.add("hidden");

        } else {
            //Switch to the next player
            switchPlayer();
        }
    }
});

// New Button Functionality

btnNew.addEventListener("click", startingCondition);