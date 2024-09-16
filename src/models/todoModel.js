const fs = require('fs');
const path = require('path');
const {addTodo,getTodos,getStatuses,getTypes,getContributors,addStatuses,addTypes, addContributor } = require('../classes/func/TodoModelsFunc');

const jsonFilePath = path.join(__dirname, '..' , 'data', 'todos.json');

class TodoModel {
  
/**
 * Get ALL Todos
 * @returns responds
 */
  static getTodos() {

    const responds = getTodos();
    console.log(responds.message);
    return responds;
  }

/**
 * Get All Statuses
 * @returns responds
 */

  static getStatuses(){

    const responds = getStatuses();
    console.log(responds.message);
    return responds;
  }

  /**
   * Get All Types
   * @returns responds
   */

  static getTypes(){
    const responds = getTypes();
    console.log(responds.message);
    return responds;
  }

  /**
   * Get All Contributors
   * @returns response
   */

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

  /**
   * Save Statuses
   * @param {*} statuses 
   */

  static saveStatuses(statuses){
    let responds = addStatuses(statuses);
    console.log(responds.message);
  }

  /**
   * Save Types
   * @param {*} types 
   */
  static saveTypes(types){
    let responds = addTypes(types);
    console.log(responds.message);
  }

  static saveContributor(contributor){
    let responds = addContributor(contributor);
    console.log(responds.message);

  }

}

module.exports = TodoModel;