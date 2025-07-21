import { ClockManager } from "./helpers/ClockManager.js";
import { svgIcons } from "./helpers/svgIcons.js";

const clockManager = new ClockManager();
let is24Hour = true;
let isPlaying = false;
const UPDATE_INTERVAL = 1000;

const contentElements = {
  clock: document.querySelector('.clock-section'),
  stopwatch: document.querySelector('.stopwatch-section'),
}

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
    play: document.querySelector('.stopwatch-toggle'),
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

function switchContent(content) {
  const sections = [ 'clock', 'stopwatch' ];
  const settingsButton = document.querySelector('.clock-settings');


  sections.forEach(section => {
    const isActive = section === content; 

    contentElements[section].classList.toggle('show', isActive);   
    contentElements[section].classList.toggle('hidden', !isActive); 

    settingsButton.classList.toggle('hidden', isActive);
    settingsButton.classList.toggle('show', !isActive);
  });
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

    let content = 'clock';
    if (button.classList.contains('digital-clock')) {
      switchContent(content);
    } else if (button.classList.contains('digital-stopwatch')) {
      content = 'stopwatch';
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

  if (button && button === controlElements.stopwatch.play) {
    isPlaying = !isPlaying;

    if (isPlaying) {
      controlElements.stopwatch.play.innerHTML = svgIcons.pause;
      button.classList.toggle('active');
    } else {
      controlElements.stopwatch.play.innerHTML = svgIcons.play;
      button.classList.toggle('active');
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const clockButton = document.querySelector('.digital-clock');
  const timeFormat = document.querySelector('.format-24h');

  controlElements.stopwatch.play.innerHTML = svgIcons.play;

  switchContent('clock');

  if (clockButton && timeFormat) {
    clockButton.classList.toggle('active');
    timeFormat.classList.toggle('active');
  }
});