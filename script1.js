const gameContainer = document.getElementById('game-container');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const instructionsDiv = document.getElementById('instructions');
const startBtn = document.getElementById('startBtn');
const homeBtn = document.getElementById('homeBtn');

let timer;
let score = 0;
let timeLeft = 120; // 2 minutes

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.left = `${getRandomNumber(0, window.innerWidth - 50)}px`;
  gameContainer.appendChild(balloon);
  balloon.addEventListener('click', () => {
    score += 2;
    updateScore();
    balloon.remove();
  });
}

function startGame() {
    timer = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft === 0) {
        clearInterval(timer); // Clear the interval when time runs out
        alert('Game Over! Your final score is ' + score);
      }
    }, 1000);
    setInterval(createBalloon, 2000);
  }



function showInstructions() {
  instructionsDiv.style.display = 'block';
  gameContainer.style.display = 'none';
}

function startButtonClickHandler() {
  instructionsDiv.style.display = 'none';
  gameContainer.style.display = 'block';
  startGame();
}

homeBtn.addEventListener('click', showInstructions);
startBtn.addEventListener('click', startButtonClickHandler);

// Initialize the game
updateTimer();
updateScore();
showInstructions();
