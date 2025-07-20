import { ClockManager } from "./helpers/ClockManager.js";

const clockManager = new ClockManager();
const dateDisplay = document.querySelector('.date-display');
const hourDisplay = document.querySelector('.hours');
const minuteDisplay = document.querySelector('.minutes');
const secondDisplay = document.querySelector('.seconds');
const timezoneDisplay = document.querySelector('.timezone-display');

const updateDisplay = () => {
  const [ hours, minutes, seconds ] = clockManager.formatTime();

  dateDisplay.innerHTML = clockManager.formatDate();
  hourDisplay.innerHTML = hours;
  minuteDisplay.innerHTML = minutes;
  secondDisplay.innerHTML = seconds;
};

timezoneDisplay.innerHTML = clockManager.getTimezone();

updateDisplay();

setInterval(() => {
  clockManager.updateTime();
  updateDisplay();
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
});

document.addEventListener('DOMContentLoaded', () => {
  const clockButton = document.querySelector('.digital-clock');

  if (clockButton) {
    clockButton.classList.toggle('active');
  }
})