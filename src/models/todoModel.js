const fs = require('fs');
const path = require('path');
const {addTodo,getTodos} = require('../classes/func/TodoModelsFunc');

const jsonFilePath = path.join(__dirname, '..' , 'data', 'todos.json');

class TodoModel {
  
  /**
   * 
   * @returns 
   */
  static getTodos() {

    const responds = getTodos();
    console.log(responds.message);

    return responds;
  }

  /**
   * Save Todos
   * @param {*} todos 
   */
  static saveTodo(todo) {
    let responds = addTodo(todo);
    console.log(responds.message);
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