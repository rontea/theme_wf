const fs = require('fs');
const path = require('path');
const {addTodo,getTodos,getStatuses,getTypes,getContributors,addStatuses,addTypes } = require('../classes/func/TodoModelsFunc');

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
    console.log(responds.message);
    return responds;
  }

  static getTypes(){
    const responds = getTypes();
    console.log(responds.message);
    return responds;
  }

  static getContributors(){
    const responds = getContributors();
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

  static saveStatuses(statuses){
    let responds = addStatuses(statuses);
    console.log(responds.message);
  }

  static saveTypes(types){
    let responds = addTypes(types);
    console.log(responds.message);
  }


}

module.exports = TodoModel;