export class ClockManager {
  constructor() {
    // Date Variables
    this.date = new Date();
    this.currentTime = {
      hours: this.date.getHours(),
      minutes: this.date.getMinutes(),
      seconds: this.date.getSeconds(),
    };
  }

  formattedDate = () => {
    return this.date.toDateString();
  }

  updateDisplay = () => {
    //
  }
}