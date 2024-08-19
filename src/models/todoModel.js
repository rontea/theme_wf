const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, '..' , 'data', 'todos.json');

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

  static getTodoById(index){

      const data = this.getTodos();

      const todoIndex = data.findIndex( data => data.id === index);

      if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
      }

    return data[todoIndex];

  }

  static saveTodoById(todoIndex,updateData){
    const data = this.getTodos();

    data[todoIndex] = { ...data[todoIndex], ...updateData};

    this.saveTodos(data);

  }

}





module.exports = TodoModel;