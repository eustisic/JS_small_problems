const controlsArray = [
  { class: 'control', value: 'CE'},
  { class: 'control', value: 'C'},
  { class: 'control', value: 'NEG'},
  { class: 'op', value: '/'},
  { class: 'num', value: '7'},
  { class: 'num', value: '8'},
  { class: 'num', value: '9'},
  { class: 'op', value: 'x'},
  { class: 'num', value: '4'},
  { class: 'num' , value: '5'},
  { class: 'num' , value: '6'},
  { class: 'op', value: '-'},
  { class: 'num' , value: '1'},
  { class: 'num' , value: '2'},
  { class: 'num' , value: '3'},
  { class: 'op', value: '+'},
  { class: 'num', value: '0'},
  { class: 'num', value: '.'},
  { class: 'control', value: '%'},
  { class: 'control', value: '='},
];

class App {
  constructor() {
    this.controls = document.querySelector('#controls');
    this.current = document.querySelector('.current_num');
    this.calculation = document.querySelector('.calculation');
    this.operator;
    this.store;
    this.render();
    this.listeners();
  }

  render() {
    let temp = document.querySelector('script[type=handlebars]').innerHTML;
    let func = Handlebars.compile(temp);
    this.controls.innerHTML = func( {buttons: controlsArray } );
  }

  listeners() {
    this.controls.addEventListener('click', event => {
      switch (event.target.className) {
        case 'control':
          this.handleControl(event.target);
          break;
        case 'op':
          this.handleOp(event.target);
          break;
        default:
          this.handleNum(event.target);
      }
    });
  }

  handleControl(target) {
    let lookup = {
      'CE': this.clearEverthing.bind(this),
      'C': this.clearCurrentNum.bind(this),
      'NEG': this.makeNegative.bind(this),
      '=': this.equals.bind(this),
      '%': this.percent.bind(this),
    }

    lookup[target.value]();
  }

  calculate() {
    try {
      this.store = this.operator();
      this.current.innerText = this.store;
    } catch (e) {
      console.log('Error');
    }
  }

  equals() {
    this.calculate();
    this.operator = null;
    this.store = null;
    this.calculation.innerText = '';
  }

  makeNegative() {
    let currentValue = Number(this.current.innerText);
    this.current.innerText = currentValue * -1;
  }

  percent() {
    this.current.innerText = (Number(this.current.innerText) / 100).toFixed(2);
  }

  clearEverthing() {
    this.calculation.innerText = '';
    this.operator = null;
    this.store = null;
    this.clearCurrentNum();
  }

  clearCurrentNum() {
    this.current.innerText = '0';
  }

  handleNum(target) {
    let currentValue = this.current.innerText;
    let stored = String(this.store);
    
    if (target.value.match(/[0-9]/)) {
      if (currentValue === '0' || currentValue === stored ) {
        this.current.innerText = target.value;
      } else {
        this.current.innerText = currentValue + target.value;
      }
    } else {
      if (!currentValue.includes('.')) {
        this.current.innerText = currentValue + target.value;
      }
    }
  }

  handleOp(target) {
    let lookup = {
      '/': this.divide.bind(this),
      'x': this.multiply.bind(this),
      '-': this.subtract.bind(this),
      '+': this.add.bind(this),
    }

    let calc = this.calculation.innerText;
    let value = this.current.innerText;
    this.calculation.innerText = calc + '  ' + value + `  ${target.value}`;

    this.operator = lookup[target.value];

    if (this.store) {
      this.calculate();
    } else {
      this.store = Number(value);
    }
  }

  add() {
    return this.store + Number(this.current.innerText);
  }

  subtract() {
    return this.store - Number(this.current.innerText);
  }

  multiply() {
    return this.store * Number(this.current.innerText);
  }

  divide() {
    return (this.store / Number(this.current.innerText)).toFixed(1);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App;
});