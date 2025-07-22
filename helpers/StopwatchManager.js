export class StopwatchManager {
  constructor() {
    this.isRunning = false;
    this.totalMilliseconds = 0;
    this.interval = 0;
  }

  start = () => {
    if (!this.Running) {
      this.Running = true;
      this.interval = setInterval(() => {
        this.totalMilliseconds += 10;
      }, 10);
    }
  }

  pause = () => {
    this.Running = false;
    clearInterval(this.interval);
  }

  reset = () => {
    this.pause();
    this.totalMilliseconds = 0;
  }

  formatStopwatchTime = () => {
    const totalSeconds = Math.floor(this.totalMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor((this.totalMilliseconds % 1000) / 10);

    return [
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
      milliseconds.toString().padStart(2, '0'),
    ];
  }
}