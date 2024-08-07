const fs = require('fs');
const path = require('path');
const TodoModel = require('../models/todoModel');

const mdFilePath = path.join(__dirname, '..', 'TODO.md');

class TodoService {
  static addTodo(newTodo) {
    const todos = TodoModel.getTodos();
    todos.push(newTodo);
    TodoModel.saveTodos(todos);
    this.updateMarkdownFile(todos);
  }

  static updateMarkdownFile(todos) {
    const header = `# TODO\n\n## Test Cases\n\n| Test Case ID | Test Description | Test Type | Pre-Conditions | Test Steps | Expected Results | Actual Results | Status | Comments |\n|--------------|------------------|-----------|----------------|------------|------------------|----------------|--------|----------|`;
    const rows = todos.map(todo => {
      const steps = todo.steps.map(step => step.trim()).join('<br>');
      return `| ${todo.id} | ${todo.description} | ${todo.type} | ${todo.preConditions} | ${steps} | ${todo.expectedResults} | ${todo.actualResults} | ${todo.status} | ${todo.comments} |`;
    }).join('\n');

    const content = `${header}\n${rows}\n`;
    fs.writeFileSync(mdFilePath, content, 'utf8');
  }
}

module.exports = TodoService;
