const buttons = [
  'B', 'I', 'U', 'S', 'L', 'uL', 'oL', 'aR', 'aL', 'C', 'J'
]

class App {
  constructor() {
    this.renderButtons();
    this.listen();
  }

  renderButtons() {
    let handle = document.querySelector('[type=handlebars]');
    let butts = Handlebars.compile(handle.innerHTML)({buttons: buttons});
    document.querySelector('.buttons').innerHTML = butts;
  }

  listen() {
    document.querySelector('.buttons').addEventListener('click', event => {
      console.log(event.target);
      this.lookup(event.target.id);
    });
  }

  lookup(id) {
    let valueArg = null;
    let look = {
      'B': 'bold',
      'I': 'italic',
      'U': 'underline',
      'S': 'strikeThrough',
      'L': 'createLink',
      'uL': 'insertUnorderedList',
      'oL': 'insertOrderedList',
      'aR': 'justifyRight',
      'aL': 'justifyLeft',
      'C' : 'justifyCenter',
      'J' : 'justifyFull',
    }

    if (id === 'L') {
      valueArg = prompt("Enter URL");
    }

    document.execCommand(look[id], false, valueArg);
  }


}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.text_box').designMode = 'on';
  new App;
});