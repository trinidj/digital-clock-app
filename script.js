import { ClockManager } from "./helpers/ClockManager.js";

const clockManager = new ClockManager();
const dateDisplay = document.querySelector('.date-display');
const hourDisplay = document.querySelector('.hours');
const minuteDisplay = document.querySelector('.minutes');
const secondDisplay = document.querySelector('.seconds');
const periodDisplay = document.querySelector('.period');
const timezoneDisplay = document.querySelector('.timezone-display');

  let is24Hour = false

const updateDisplay = (is24Hour) => {
  const [ hours, minutes, seconds, period ] = clockManager.formatTime(is24Hour);

  dateDisplay.innerHTML = clockManager.formatDate();
  hourDisplay.innerHTML = hours;
  minuteDisplay.innerHTML = minutes;
  secondDisplay.innerHTML = seconds;

  if (!is24Hour && periodDisplay) {
    periodDisplay.innerHTML = period;
    periodDisplay.style.display = 'block';
  } else if (periodDisplay) {
    periodDisplay.style.display = 'none';
  }
};

timezoneDisplay.innerHTML = clockManager.getTimezone();

updateDisplay(is24Hour);

setInterval(() => {
  clockManager.updateTime();
  updateDisplay(is24Hour);
}, 1000);

const clockControls = document.querySelector('.clock-controls');
clockControls.addEventListener('click', e => {
  const button = e.target.classList.contains('button') ? e.target : e.target.closest('.button');

  if (button) {
    const controlButtons = clockControls.querySelectorAll('.button');
    controlButtons.forEach(button => button.classList.remove('active'));

    button.classList.toggle('active');

    const isActive = button.classList.contains('active');
    button.dataset.state = isActive;
  }
});


const settings = document.querySelector('.settings');
settings.addEventListener('click', () => {
  settings.classList.toggle('active');

  formatControls.classList.toggle('show');
});

const formatControls = document.querySelector('.right-controls');
formatControls.addEventListener('click', e => {
  const button = e.target.classList.contains('format-button') ? e.target : e.target.closest('.format-button');

  if (button) {
    const formatButtons = formatControls.querySelectorAll('.format-button');
    formatButtons.forEach(button => button.classList.remove('active'));

    button.classList.toggle('active');

    const isActive = button.classList.contains('active');
    button.dataset.state = isActive;

    if (e.target.classList.contains('format-24h')) {
      updateDisplay(is24Hour = true);

    } else if (e.target.classList.contains('format-12h')) {
      updateDisplay(is24Hour = false);
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