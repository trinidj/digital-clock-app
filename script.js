import { ClockManager } from "./helpers/ClockManager.js";

const clockManager = new ClockManager();
let is24Hour = true;
const UPDATE_INTERVAL = 1000;

const timeElements = {
  clock: {
    hour: document.querySelector('.clock-hours'),
    minutes: document.querySelector('.clock-minutes'),
    seconds: document.querySelector('.clock-seconds'),
    period: document.querySelector('.period'),
  },

  stopwatch: {
    minutes: document.querySelector('.stopwatch-minutes'),
    seconds: document.querySelector('.stopwatch-seconds'),
    milliseconds: document.querySelector('.stopwatch-milliseconds'),
  },
}

const displayElements = {
  date: document.querySelector('.date-display'),
  timezone: document.querySelector('.timezone-display'),
}

const controlElements = {
  contentControls: document.querySelector('.content-controls'),

  clock: {
    settings: document.querySelector('.settings'),
    formatControls: document.querySelector('.right-controls'),
  },

  stopwatch: {
    controls: document.querySelector('.stopwatch-controls'),
    start: document.querySelector('.stopwatch-start'),
    reset: document.querySelector('.stopwatch-reset'),
  }
}

function updateClockDisplay() {
  const [ hours, minutes, seconds, period ] = clockManager.formatTime(is24Hour);

  displayElements.date.innerHTML = clockManager.formatDate();
  timeElements.clock.hour.innerHTML = hours;
  timeElements.clock.minutes.innerHTML = minutes;
  timeElements.clock.seconds.innerHTML = seconds;

  if (!is24Hour) {
    timeElements.clock.period.innerHTML = period;
    timeElements.clock.period.style.display = 'block';
  } else {
    timeElements.clock.period.style.display = 'none';
  }
}

displayElements.timezone.innerHTML = clockManager.getTimezone();

updateClockDisplay();

setInterval(() => {
  clockManager.updateTime();
  updateClockDisplay();
}, UPDATE_INTERVAL);

controlElements.contentControls.addEventListener('click', e => {
  const button = e.target.classList.contains('button') ? e.target : e.target.closest('.button');

  if (button) {
    const controlButtons = controlElements.contentControls.querySelectorAll('.button');
    controlButtons.forEach(button => button.classList.remove('active'));

    button.classList.toggle('active');

    const isActive = button.classList.contains('active');
    button.dataset.state = isActive;

    let content = '';
    if (e.target.classList.contains('.clock-section')) {
      content = 'clock';
      switchContent(content);
    }
  }
});

controlElements.clock.settings.addEventListener('click', () => {
  controlElements.clock.settings.classList.toggle('active');

  controlElements.clock.formatControls.classList.toggle('show');
});

controlElements.clock.formatControls.addEventListener('click', e => {
  const button = e.target.classList.contains('format-button') ? e.target : e.target.closest('.format-button');

  if (button) {
    const formatButtons = controlElements.clock.formatControls.querySelectorAll('.format-button');
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

controlElements.stopwatch.controls.addEventListener('click', e => {
  const button = e.target.classList.contains('button') ? e.target : e.target.closest('.button');

  if (button) {
    button.classList.toggle('active');
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