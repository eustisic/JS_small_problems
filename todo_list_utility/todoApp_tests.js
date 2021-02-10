"use strict";

var $ol = document.querySelector("ol");

function outputResult(message) {
  var $li = document.createElement("li");
  $li.innerText = message;
  $ol.appendChild($li);
  return $li;
}

function test(message, assertion) {
  var $msg = outputResult(message),
      passed = false;

  try {
    passed = assertion();
  }
  catch (e) {
    passed = false;
  }
  $msg.setAttribute("class", passed ? "pass" : "fail");
}

const todoData = {
  title: 'Buy Milk',
  month: '1',
  year: '2017',
  description: 'Milk for baby',
};

const todoData1 = {
  title: 'Buy Milk',
  month: '1',
  year: '2017',
  description: 'Milk for baby',
};

const todoData2 = {
  title: 'Buy Apples',
  month: '',
  year: '2017',
  description: 'An apple a day keeps the doctor away',
};

const todoData3 = {
  title: 'Buy chocolate',
  month: '1',
  year: '',
  description: 'For the cheat day',
};

const todoData4 = {
  title: 'Buy Veggies',
  month: '',
  year: '',
  description: 'For the daily fiber needs',
};

let todoSet = [todoData1, todoData2, todoData3, todoData4];

test("todo obj is defined", function() {
  return Todo !==  undefined;
});

test("todoList is defined", function() {
  return todoList !== undefined;
});

test("todoManager is defined", function() {
  return todoManager !== undefined;
});

test("Todo creates a new todo item with a unique ID", function() {
  let newTodo = new Todo(todoData);
  let newTodo2 = new Todo(todoData);
  return newTodo.title === todoData.title && newTodo2.id !== newTodo.id;
});

test("isWithinMonthYear returns true if the month and year match; otherwise false", function() {
  let newTodo = new Todo(todoData);
  return newTodo.isWithinMonthYear('1', '2017') && !newTodo.isWithinMonthYear('2', '2017');
});

test("isWithinMonthYear works with blank month", function() {
  let newTodo = new Todo(todoData2);
  return newTodo.isWithinMonthYear('', '2017') && !newTodo.isWithinMonthYear('1', '2017');
})

test("todoList returns a todoList object", function() {
  let newList = Object.create(todoList).init();
  return newList !== undefined;
});

test('list property returns an array', function() {
  let newList = Object.create(todoList).init();
  return Array.isArray(newList.list());
});

test('todoList.add adds a new item to the todo list', function() {
  let newList = Object.create(todoList).init();
  newList.add(todoData);
  return newList.list().length  === 1;
});

test('getTodo is defined', function() {
  let newList = Object.create(todoList).init();
  return newList.getTodo !== undefined;
}); 

test('getTodo returns a todo item based on id; undefined otherwise', function() {
  let newList = Object.create(todoList).init();
  newList.add(todoData);
  let id = newList.list()[0].id;
  return newList.getTodo(id).id === id && newList.getTodo('123') === undefined;
});

test('getTodo returns a copy of the returned item', function() {
  let newList = Object.create(todoList).init();
  newList.add(todoData);
  let id = newList.list()[0].id;
  newList.getTodo(id).id = 'wrong id';
  return newList.getTodo(id).id === id;
});

test('deleteTodo is defined', function() {
  let newList = Object.create(todoList).init();
  return newList.deleteTodo !== undefined;
});

test('deleteTodo permanently removes a todo item from the list', function() {
  let newList = Object.create(todoList).init();
  newList.add(todoData);
  let id = newList.list()[0].id;
  newList.deleteTodo(id);
  return newList.list().length === 0;
});

test('a todo list can be initialized with a list to todo objects', function() {
  let newList = Object.create(todoList).init(todoSet);
  return newList.list().length === 4;
});

test('update is defined on the todoList object', function() {
  let newList = Object.create(todoList).init();
  return newList.update !== undefined;
});

test('update updates the properties of a list item', function() {
  let newList = Object.create(todoList).init();
  newList.add(todoData);
  let id = newList.list()[0].id;
  newList.update(id, {title: 'Buy Apples', description: 'An apple a day keeps the doctor away'});
  return newList.getTodo(id).title === 'Buy Apples';
});

test('update does not change the id of a todo item', function() {
  let newList = Object.create(todoList).init();
  newList.add(todoData);
  let id = newList.list()[0].id;
  newList.update(id, {id: '123'});
  return newList.getTodo(id) !== undefined;
});

test('update does not insert undeclared properties', function() {
  let newList = Object.create(todoList).init();
  newList.add(todoData);
  let id = newList.list()[0].id;
  newList.update(id, {random: '123'}); 
  return newList.getTodo(id).random === undefined;
});

test('todoManager interfaces with the todoList object and can return a list of todos', function() {
  let newList = Object.create(todoList).init(todoSet);
  let manager = new todoManager(newList);
  return manager.list().length === 4;
});

test('todoManager.completed returns an array of completed todos', function() {
  let newList = Object.create(todoList).init(todoSet);
  let manager = new todoManager(newList);
  let id = newList.list()[0].id;
  newList.update(id, {completed: true});
  return manager.completed().length === 1;
});

test('todosOnMonthYear returns an array of todo objects with matching month and year', function() {
  let newList = Object.create(todoList).init(todoSet);
  let manager = new todoManager(newList);
  return manager.todosOnMonthYear('1', '2017').length === 1;
});

test('completedOnMonthYear returns an array of completed todos with mathcing month and year', function() {
  let newList = Object.create(todoList).init(todoSet);
  let manager = new todoManager(newList);
  let id = newList.list()[0].id;
  let id2 = newList.list()[1].id;
  newList.update(id, {completed: true});
  newList.update(id2, {completed: true});
  return manager.completedOnMonthYear('1', '2017').length === 1;
});




