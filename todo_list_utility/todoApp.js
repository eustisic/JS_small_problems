"use strict";

const createUniqueID = function() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let newId = '';
  for (let idx = 0; idx < 16; idx += 1) {
    newId += chars[Math.floor(Math.random() * chars.length)];
  }
  return newId;
};

class Todo {
  constructor(todoData) {
    this.title = todoData.title;
    this.month = todoData.month;
    this.year = todoData.year;
    this.description = todoData.description;
    this.id = createUniqueID();
    this.completed = false;
  }

  isWithinMonthYear(month, year) {
    return this.month === month && this.year === year;
  }
}

let todoList = {
  init(todoObjects) {
    return (() => {
      // privately maintains the list of todo objects 
      let todos = [];

      let hasUniqId = function(obj) {
        let ids = todos.map(todo => todo.id);
        return !ids.includes(obj.id);
      };

      if (Array.isArray(todoObjects)) {
        todoObjects.forEach(obj => {
          let newTodo = new Todo(obj);
          if (hasUniqId(newTodo)) { todos.push(newTodo) }
        });
      }

      // creates a copy of an object with same properties and prototype
      let deepCopy = function(obj) {
        let newObj = Object.create(obj);
        for (let prop in obj) {
          newObj[prop] = obj[prop];
        }
        return newObj;
      };

      return {
        // produces a copy of the todo objects
        list() {
          let copyList = [];
          todos.forEach(todo => {
            copyList.push(deepCopy(todo));
          });
          return copyList;
        },

        // adds a todo object to the collection
        add(todo) {
          let newTodo = new Todo(todo);
          if (hasUniqId(newTodo)) { todos.push(newTodo) }
        },

        // deletes a todo object from the collection
        deleteTodo(id) {
          let idx = todos.findIndex(todo => todo.id === id);
          return todos.splice(idx, 1);
        },

        // returns a copied todo item based on id
        getTodo(id) {
          return this.list().find(todo => {
            return todo.id === id;
          });
        },

        // updates a todo item based on an object of properties
        update(id, obj) {
          let todo = todos.find(todo => todo.id === id);
          for (let prop in obj) {
            if (prop !== 'id' && todo[prop] !== undefined) {
              todo[prop] = obj[prop];
            }
          }
        },
      };
    })();
  }
};

class todoManager {
  constructor(todoList) {
    this.todoList = todoList;
  }

  // returns a deep copy of the todo list
  list() {
    return this.todoList.list();
  }

  // return completed todos
  completed() {
    return this.list().filter(todo => {
      return todo.completed;
    });
  }

  // returns todos with mathing month and year
  todosOnMonthYear(month, year) {
    return this.list().filter(todo => {
      return todo.isWithinMonthYear(month, year);
    });
  }

  // returns completed todos with matching month and year
  completedOnMonthYear(month, year) {
    return this.completed().filter(todo => {
      return todo.isWithinMonthYear(month, year);
    });
  }
}