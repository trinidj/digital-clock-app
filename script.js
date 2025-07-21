import { ClockManager } from "./helpers/ClockManager.js";

const clockManager = new ClockManager();
let is24Hour = true;
const UPDATE_INTERVAL = 1000;

const timeElements = {
  hour: document.querySelector('.hours'),
  minutes: document.querySelector('.minutes'),
  seconds: document.querySelector('.seconds'),
  period: document.querySelector('.period'),
}

const displayElements = {
  date: document.querySelector('.date-display'),
  timezone: document.querySelector('.timezone-display'),
}

const controlElements = {
  clockControls: document.querySelector('.clock-controls'),
  settings: document.querySelector('.settings'),
  formatControls: document.querySelector('.right-controls'),
}

function updateClockDisplay() {
  const [ hours, minutes, seconds, period ] = clockManager.formatTime(is24Hour);

  displayElements.date.innerHTML = clockManager.formatDate();
  timeElements.hour.innerHTML = hours;
  timeElements.minutes.innerHTML = minutes;
  timeElements.seconds.innerHTML = seconds;

  if (!is24Hour) {
    timeElements.period.innerHTML = period;
    timeElements.period.style.display = 'block';
  } else {
    timeElements.period.style.display = 'none';
  }
}

displayElements.timezone.innerHTML = clockManager.getTimezone();

updateClockDisplay();

setInterval(() => {
  clockManager.updateTime();
  updateClockDisplay();
}, UPDATE_INTERVAL);

controlElements.clockControls.addEventListener('click', e => {
  const button = e.target.classList.contains('button') ? e.target : e.target.closest('.button');

  if (button) {
    const controlButtons = controlElements.clockControls.querySelectorAll('.button');
    controlButtons.forEach(button => button.classList.remove('active'));

    button.classList.toggle('active');

    const isActive = button.classList.contains('active');
    button.dataset.state = isActive;
  }
});

controlElements.settings.addEventListener('click', () => {
  controlElements.settings.classList.toggle('active');

  controlElements.formatControls.classList.toggle('show');
});

controlElements.formatControls.addEventListener('click', e => {
  const button = e.target.classList.contains('format-button') ? e.target : e.target.closest('.format-button');

  if (button) {
    const formatButtons = controlElements.formatControls.querySelectorAll('.format-button');
    formatButtons.forEach(button => button.classList.remove('active'));

    button.classList.toggle('active');

    const isActive = button.classList.contains('active');
    button.dataset.state = isActive;

    if (e.target.classList.contains('format-24h')) {
      is24Hour = true;
      updateClockDisplay();

    } else if (e.target.classList.contains('format-12h')) {
      is24Hour = false
      updateClockDisplay();
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const clockButton = document.querySelector('.digital-clock');
  const timeFormat = document.querySelector('.format-24h');

  if (clockButton && timeFormat) {
    clockButton.classList.toggle('active');
    timeFormat.classList.toggle('active');
  }
});