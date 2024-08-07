const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, '..', 'todos.json');

class TodoModel {
  static getTodos() {
    if (fs.existsSync(jsonFilePath)) {
      const data = fs.readFileSync(jsonFilePath);
      return JSON.parse(data);
    }
    return [];
  }

  static saveTodos(todos) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(todos, null, 2), 'utf8');
  }
}

module.exports = TodoModel;