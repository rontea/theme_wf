const fs = require('fs');
const path = require('path');
const {addTodo,getTodos,getStatuses,getTypes} = require('../classes/func/TodoModelsFunc');

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

  static getStatuses(){

    const responds = getStatuses();
    return responds;
  }

  static getTypes(){
    const responds = getTypes();
   
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


}

module.exports = TodoModel;