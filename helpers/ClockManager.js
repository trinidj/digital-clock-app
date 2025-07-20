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

  formatTime = (is24Hour) => {
    if (is24Hour) {
      return [
        this.hours.toString().padStart(2, '0'),
        this.minutes.toString().padStart(2, '0'),
        this.seconds.toString().padStart(2, '0'),
      ]
    } else {
      const period = this.hours >= 12 ? 'PM' : 'AM';
      const displayHours = this.hours === 0 ? 12 : this.hours > 12 ? this.hours - 12 : this.hours;

      return [
        displayHours.toString().padStart(2, '0'),
        this.minutes.toString().padStart(2, '0'),
        this.seconds.toString().padStart(2, '0'),
        period
      ]
    }
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