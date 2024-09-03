const fs = require('fs');
const path = require('path');
const TodoModel = require('../models/todoModel');
const fileUpdateMarkdownTodos = require('../classes/func/TodoServicesFunc');

const mdFilePath = path.join(__dirname, '..', '..' , 'TODO.md');

class TodoService {
  static addTodo(newTodo) {
    
    TodoModel.saveTodo(newTodo);

    const responds = TodoModel.getTodos();
    const todosData = responds;

    this.updateMarkdownFileTodos(todosData);
    
  }

  static updateMarkdownFileTodos(todos) {
    const responds = fileUpdateMarkdownTodos(todos);
    console.log(responds.message);
  }
  /**
   * 
   * @param {todos} todos 
  */

  static updateTodo(updatedTodo) {
    const todo = TodoModel.getUpdateTodo();
  }
  


}

module.exports = TodoService;
