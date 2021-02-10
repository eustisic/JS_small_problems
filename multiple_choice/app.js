let questions = [
  {
    id: 1,
    description: "Who is the author of 'The Hitchhiker's Guide to the Galaxy'?",
    options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein']
  },
  {
    id: 2,
    description: 'Which of the following numbers is the answer to Life, the \
                  universe and everything?',
    options: ['66', '13', '111', '42']
  },
  {
    id: 3,
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above']
  },
  {
    id: 4,
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri']
  }
];
  
let answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' };

class App {
  constructor() {
      this.questions = questions;
      this.answerKey = answerKey;
      this.score = 0;
      this.form = document.querySelector('form.test');
      this.displayQs();
      this.addListeners();
  }

  displayQs() {
    let template = Handlebars.compile(document.querySelector('#test').innerHTML);
    let testQs = template({ 'questions': questions });
    this.form.insertAdjacentHTML('afterbegin', testQs);
  }

  reset() {
    document.querySelector('.reset_form').addEventListener('click', event => {
      event.preventDefault();
      this.form.reset();
      this.clearResults();
    });
  }

  clearResults() {
    document.querySelectorAll('p.result').forEach(result => {
      result.className = 'result';
      result.innerHTML = null;
    });
  }

  addListeners() {
    this.reset();
    this.submitAnswers();
  }

  submitAnswers() {
    this.form.addEventListener('submit', event => {
      console.log(event);
      event.preventDefault();
      this.compileAnswers();
    });
  }

  compileAnswers() {
    let answers = new FormData(this.form)
    for (const answer of answers) {
      if (this.answerKey[answer[0]] === answer[1]) {
        this.displayCorrect(answer[0]);
      } else {
        this.displayWrong(answer[0], this.answerKey[answer[0]]);
      }
    }
    this.displayUnanswered();
  }

  displayWrong(id, answer) {
    let para = document.querySelector(`p[data-id="${id}"]`);
    para.innerHTML = 'Incorrect, the answer is ' + answer;
    para.classList.add('wrong');
  }

  displayCorrect(id) {
    let para = document.querySelector(`p[data-id="${id}"]`);
    para.innerHTML = 'Correct!';
    para.classList.add('correct');
  }

  displayUnanswered() {
    document.querySelectorAll('p.result').forEach(result => {
      if (!result.innerHTML) {
        let id = result.getAttribute('data-id');
        let correct = answerKey[id];
        result.classList.add('wrong');
        result.innerHTML = `You forgot to answer the question! Correct answer is: ${correct}`;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App;
});