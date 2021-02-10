class App {
  constructor() {
    this.start = document.querySelector('.start');
    this.time = document.querySelector('#time');
    this.go = null;
    this.startTime;
    this.freeze;
    this.addListeners();
  }

  addListeners() {
    document.querySelector('.reset').addEventListener('click', this.reset.bind(this));
    this.start.addEventListener('click', this.startStop.bind(this));
  }

  reset() {
    this.time.innerText = '00:00:00:00';
    this.start.style.background = '#4dc46b';
    this.start.innerText = 'Start';
    this.stopCount();
    this.startTime = null;
    this.freeze = null;
    this.go = null;
  }

  stopCount() {
    clearInterval(this.go);

  }

  startCount() {
    this.startTime = (Date.now() - this.freeze) || Date.now();
    this.go = setInterval(() => {
      let elapsed = Date.now() - this.startTime;
      this.time.innerText = this.formatNumber(elapsed);
    }, 10);
  }

  formatNumber(num) {
    let centis = Math.floor(num % 1000 / 10);
    let seconds = Math.floor(num / 1000 % 60 );
    let minutes = Math.floor(num / 1000 / 60 % 60);
    let hours = Math.floor(num / 1000 / 60 / 60);
    return [hours, minutes, seconds, centis].map(num => {
      return String(num).padStart(2, '0');
    }).join(':');
  }

  startStop() {
    if (!this.go) {
      this.startCount();
      this.start.style.background = '#f15656';
      this.start.innerText = 'Stop';
    } else {
      this.stopCount();
      this.start.style.background = '#4dc46b';
      this.start.innerText = 'Start';
      this.go = null;
      this.freeze = Date.now() - this.startTime;
    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new App;
});