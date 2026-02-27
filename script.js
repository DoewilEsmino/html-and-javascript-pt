// script.js

const timerEl = document.getElementById('timer');
const progressEl = document.getElementById('progress');
const CIRCLE_LENGTH = 565;

let totalSeconds = 0;
let remainingSeconds = 0;
let countdownInterval;
let isPaused = false;
let endTime = 0;

function updateDisplay(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  timerEl.textContent = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  timerEl.style.animation = 'pop 0.2s ease';
  const percent = totalSeconds === 0 ? 0 : seconds / totalSeconds;
  progressEl.style.strokeDashoffset = CIRCLE_LENGTH * (1 - percent);
}

function startInterval() {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    if (!isPaused) {
      const now = Date.now();
      remainingSeconds = Math.max(0, Math.ceil((endTime - now)/1000));
      updateDisplay(remainingSeconds);
      if (remainingSeconds <= 0) {
        clearInterval(countdownInterval);
        alert("Time's up!");
        if(navigator.vibrate) navigator.vibrate([500,200,500]);
      }
    }
  }, 100);
}

// Start button
document.getElementById('startBtn').addEventListener('click', () => {
  const h = parseInt(document.getElementById('hours').value) || 0;
  const m = parseInt(document.getElementById('minutes').value) || 0;
  const s = parseInt(document.getElementById('seconds').value) || 0;
  totalSeconds = h*3600 + m*60 + s;
  if(totalSeconds <= 0) return alert("Enter a time greater than 0");

  remainingSeconds = totalSeconds;
  isPaused = false;
  endTime = Date.now() + remainingSeconds*1000;
  document.getElementById('pauseBtn').textContent = "Pause";
  updateDisplay(remainingSeconds);
  startInterval();
});

// Pause/Resume button
const pauseBtn = document.getElementById('pauseBtn');
pauseBtn.addEventListener('click', () => {
  if (remainingSeconds <= 0) return;
  if (!isPaused) {
    isPaused = true;
    clearInterval(countdownInterval);
    pauseBtn.textContent = "Resume";
  } else {
    isPaused = false;
    endTime = Date.now() + remainingSeconds*1000;
    pauseBtn.textContent = "Pause";
    updateDisplay(remainingSeconds); // instant update
    startInterval();
  }
});

// Reset button
document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(countdownInterval);
  totalSeconds = 0;
  remainingSeconds = 0;
  isPaused = false;
  document.getElementById('pauseBtn').textContent = "Pause";
  updateDisplay(0);
  document.getElementById('hours').value = '';
  document.getElementById('minutes').value = '';
  document.getElementById('seconds').value = '';
});

// Theme selector
document.querySelectorAll('.theme-selector button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.setAttribute('data-font', btn.getAttribute('data-font'));
    document.body.setAttribute('data-theme', btn.getAttribute('data-theme'));
  });
});

// Initialize display
updateDisplay(0);