import { ClockManager } from "./helpers/ClockManager.js";

const clockManager = new ClockManager();
const dateDisplay = document.querySelector('.date-display');

dateDisplay.innerHTML = clockManager.formattedDate();

document.addEventListener('DOMContentLoaded', () => {
  const clockButton = document.querySelector('.digital-clock');

  if (clockButton) {
    clockButton.classList.toggle('active');
  }
})