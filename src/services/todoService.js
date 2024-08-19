const fs = require('fs');
const path = require('path');
const TodoModel = require('../models/todoModel');

const mdFilePath = path.join(__dirname, '..', '..' , 'TODO.md');

class TodoService {
  static addTodo(newTodo) {
    const todos = TodoModel.getTodos();
    todos.push(newTodo);
    TodoModel.saveTodos(todos);
    this.updateMarkdownFile(todos);
  }
  /**
   * 
   * @param {todos} todos 
  */

  static updateTodo(updatedTodo) {
    const todo = TodoModel.getUpdateTodo();
  }
  
  static updateMarkdownFile(todos) {
    
    const header = `# TODO\n\n`;
    const prefixStart = "```plaintext";
    const prefixEnd = "```"; 
    
    const rows = todos.map(todo => {
      const subtasks = todo.subtask.map(subtask => subtask.trim()).join('\n');
      return `${prefixStart}\n${todo.id}\nTitle: ${todo.title}\n\nDescription: ${todo.description} \n\nType: ${todo.type} | Status: ${todo.status} \n\n${subtasks}  \n\n${todo.comments}  \n\n ${prefixEnd}`;
    }).join('\n');

    const content = `${header}\n${rows}\n`;
    
    fs.writeFileSync(mdFilePath, content, 'utf8');
  
  }

}

module.exports = TodoService;
