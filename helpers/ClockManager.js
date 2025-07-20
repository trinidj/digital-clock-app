export class ClockManager {
  constructor() {
    // Date Variables
    this.date = new Date();

    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();
  }

  formatDate = () => {
    return this.date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime = () => {
    return [
      this.hours.toString().padStart(2, '0'),
      this.minutes.toString().padStart(2, '0'),
      this.seconds.toString().padStart(2, '0'),
    ]
  }

  getTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  updateTime = () => {
    this.date = new Date();
    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();
  }
}