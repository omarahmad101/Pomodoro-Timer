const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");
const titleInput = document.getElementById("titleInput");
const timeInput = document.getElementById("timeInput");
const bell = document.getElementById("bell");
const pomodoroHistoryEl = document.getElementById("pomodoro-history");

let interval;
let timeLeft = 1500;
let initialTime = 1500;
let startTime;

function updateFormattedTime() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let formattedTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  timerEl.innerHTML = formattedTime;
}

updateFormattedTime();

function startTimer() {
  if (interval) return; // Prevent multiple intervals
  startTime = new Date();
  interval = setInterval(() => {
    updateTimer();
  }, 1000);
}

function updateTimer() {
  if (timeLeft <= 0) {
    clearInterval(interval);
    interval = null;
    bell.play();
    savePomodoroHistory(true);
    return;
  }
  timeLeft--;
  updateFormattedTime();
}

function stopTimer() {
  if (interval) {
    clearInterval(interval);
    interval = null;
    savePomodoroHistory(false);
  }
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  let minutes = parseInt(timeInput.value) || 25;
  timeLeft = minutes * 60;
  initialTime = timeLeft;
  updateFormattedTime();
}

function updateTitle() {
  const newTitle = titleInput.value.trim() || "Pomodoro Timer";
  document.querySelector(".title").textContent = newTitle;
}

function savePomodoroHistory(isCompleted) {
  const title = titleInput.value.trim() || "Pomodoro Timer";
  const setTime = Math.floor(initialTime / 60);
  const actualTime = Math.floor((new Date() - startTime) / 60000); // Convert milliseconds to minutes
  const status = isCompleted ? "Completed" : "Stopped";
  const historyItem = document.createElement("li");
  historyItem.innerHTML = `
    Title: ${title}<br>
    Set Time: ${setTime} mins<br>
    Actual Time: ${actualTime} mins<br>
    Status: ${status}
  `;
  pomodoroHistoryEl.appendChild(historyItem);
}

titleInput.addEventListener("input", updateTitle);
timeInput.addEventListener("input", resetTimer);
startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);
