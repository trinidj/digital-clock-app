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

  getDate = () => {
    return this.date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}