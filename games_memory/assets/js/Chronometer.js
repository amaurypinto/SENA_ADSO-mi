class Choronometer {
  constructor(choronometerId, speed) {
    this.objChoronometer = document.getElementById(choronometerId);
    this.getElementsLabel = this.objChoronometer.querySelectorAll('label');
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.speed = speed;
    this.intervalID = null;
    this.gameCompletionCallback = null;
  }

  startChoronometer() {
    this.intervalID = setInterval(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
        if (this.minutes === 60) {
          this.minutes = 0;
          this.hours++;
        }
      }
      this.updateChoronometer();

      // Detener el cronómetro cuando el progreso del juego alcance el 100%
      if (this.gameProgress >= 100) {
        this.stopChoronometer();
        if (this.gameCompletionCallback) {
          this.gameCompletionCallback();
        }
      }
    }, this.speed);
  }

  stopChoronometer() {
    clearInterval(this.intervalID);
  }

  updateChoronometer() {
    this.getElementsLabel[0].innerHTML = this.hours < 10 ? "0" + this.hours : this.hours;
    this.getElementsLabel[1].innerHTML = this.minutes < 10 ? "0" + this.minutes : this.minutes;
    this.getElementsLabel[2].innerHTML = this.seconds < 10 ? "0" + this.seconds : this.seconds;
  }

  setGameCompletionCallback(callback) {
    this.gameCompletionCallback = callback;
  }

  setGameProgress(progress) {
    this.gameProgress = progress;
  }
}
