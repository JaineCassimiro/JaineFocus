// Pomodoro Timer
let minutes = 25;
let seconds = 0;
let isRunning = false;
let timer;

const timerDisplay = document.getElementById("timer-display");
const startPauseBtn = document.getElementById("start-pause");
const resetBtn = document.getElementById("reset");

startPauseBtn.addEventListener("click", () => {
  isRunning = !isRunning;
  if (isRunning) startTimer();
  else clearInterval(timer);
  startPauseBtn.textContent = isRunning ? "Pausar" : "Iniciar";
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  minutes = 25;
  seconds = 0;
  isRunning = false;
  startPauseBtn.textContent = "Iniciar";
  updateDisplay();
});

function startTimer() {
  timer = setInterval(() => {
    if (seconds > 0) seconds--;
    else if (minutes > 0) {
      minutes--;
      seconds = 59;
    } else {
      clearInterval(timer);
      alert("⏰ Pomodoro finalizado! Faça uma pausa!");
      isRunning = false;
      startPauseBtn.textContent = "Iniciar";
    }
    updateDisplay();
  }, 1000);
}

function updateDisplay() {
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

updateDisplay();

// Task Manager
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    const li = document.createElement("li");
    li.textContent = text;
    li.addEventListener("click", () => li.classList.toggle("done"));
    taskList.appendChild(li);
    taskInput.value = "";
  }
});

// Agenda Manager
const datePicker = document.getElementById("date-picker");
const agendaNote = document.getElementById("agenda-note");
const saveAgendaBtn = document.getElementById("save-agenda");
const agendaDisplay = document.getElementById("agenda-display");

saveAgendaBtn.addEventListener("click", () => {
  const date = datePicker.value;
  const note = agendaNote.value.trim();
  if (date && note) {
    localStorage.setItem(`agenda-${date}`, note);
    showAgenda(date);
    agendaNote.value = "";
  }
});

datePicker.addEventListener("change", () => {
  showAgenda(datePicker.value);
});

function showAgenda(date) {
  const saved = localStorage.getItem(`agenda-${date}`);
  agendaDisplay.textContent = saved ? `📝 ${saved}` : "(Sem anotações para este dia)";
}