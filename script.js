let totalSeconds = 0;
let remainingSeconds = 0;
let countdownInterval;
let isPaused = false;

const timerEl = document.getElementById('timer');
const progressEl = document.getElementById('progress');

function updateTimerDisplay(seconds){
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  timerEl.textContent = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  timerEl.style.animation = 'pop 0.2s ease';
  const percent = totalSeconds === 0 ? 0 : seconds / totalSeconds;
  const dash = 565 * (1 - percent);
  progressEl.style.strokeDashoffset = dash;
}

// Start button
document.getElementById('startBtn').addEventListener('click', () => {
  clearInterval(countdownInterval);

  const h = parseInt(document.getElementById('hours').value) || 0;
  const m = parseInt(document.getElementById('minutes').value) || 0;
  const s = parseInt(document.getElementById('seconds').value) || 0;
  totalSeconds = h*3600 + m*60 + s;

  if(totalSeconds <= 0) return alert("Enter a time greater than 0.");

  remainingSeconds = totalSeconds;
  isPaused = false;

  updateTimerDisplay(remainingSeconds);

  countdownInterval = setInterval(() => {
    if(!isPaused){
      remainingSeconds--;
      updateTimerDisplay(remainingSeconds);
      if(remainingSeconds <= 0){
        clearInterval(countdownInterval);
        updateTimerDisplay(0);
        alert("Time's up!");
        if(navigator.vibrate) navigator.vibrate([500,200,500]);
      }
    }
  }, 1000);
});

// Pause button
document.getElementById('pauseBtn').addEventListener('click', () => { isPaused = true; });

// Reset button
document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(countdownInterval);
  totalSeconds = 0;
  remainingSeconds = 0;
  isPaused = false;
  updateTimerDisplay(0);
  document.getElementById('hours').value = '';
  document.getElementById('minutes').value = '';
  document.getElementById('seconds').value = '';
});

// Theme selector
document.querySelectorAll('.theme-selector button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.style.background = btn.getAttribute('data-gradient');
  });
});

// Initialize
updateTimerDisplay(0);