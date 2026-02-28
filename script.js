let total = 0;
let remainingMs = 0; // store milliseconds instead of seconds
let timer = null;
let paused = false;

const CIRCLE = 377;
const t = document.getElementById("t");
const p = document.getElementById("p");
const msg = document.getElementById("msg");
const pauseBtn = document.getElementById("pauseBtn");

function formatTime(seconds) {
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = seconds % 60;
  return [h, m, s].map(v => String(v).padStart(2,"0")).join(":");
}

function update() {
  if (!paused && remainingMs > 0) {
    remainingMs = Math.max(0, remainingMs - 100); // decrement 100ms per tick
    const remainingSec = Math.ceil(remainingMs / 1000);
    t.textContent = formatTime(remainingSec);
    p.style.strokeDashoffset = CIRCLE * (1 - remainingSec / (total / 1000));
  }

  if (remainingMs <= 0) {
    clearInterval(timer);
    msg.style.opacity = 1;
    pauseBtn.textContent = "Pause";
  }
}

function start() {
  const hVal = +h.value || 0;
  const mVal = +m.value || 0;
  const sVal = +s.value || 0;

  total = (hVal * 3600 + mVal * 60 + sVal) * 1000; // store in ms
  if (total <= 0) return alert("Enter a time");

  remainingMs = total;
  paused = false;
  msg.style.opacity = 0;
  pauseBtn.textContent = "Pause";

  clearInterval(timer);
  timer = setInterval(update, 100);
  update(); // immediately show first tick
}

function pause() {
  paused = !paused;
  pauseBtn.textContent = paused ? "Resume" : "Pause";
}

function reset() {
  clearInterval(timer);
  remainingMs = 0;
  t.textContent = "00:00:00";
  p.style.strokeDashoffset = CIRCLE;
  paused = false;
  pauseBtn.textContent = "Pause";
  msg.style.opacity = 0;
}