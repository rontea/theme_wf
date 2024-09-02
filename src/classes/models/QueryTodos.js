'use strict';

const fs = require('fs');
const QueryTodosFile = require('./QueryTodosFile');
const utils = require('../../utils/utils');

class QueryTodos extends QueryTodosFile {
    
    #todo;
    #jsonFilepath;

    constructor(todo = {}, options = {}){

        super(options.path);
        this.#todo = todo;
        this.#jsonFilepath = options.path;
    }

    /**
     * Map the todo data
     * @returns mapped todo
     */

    mapTodo(){

        /** Create and add new item */
        let todos = [];
        let data = super.getTodos();
        data.todos = todos;
        data.todos.push(this.#todo);
       
        return data;
        
    }

    mapContributor(){
        /** Create and add new item */
        let todos = [];
        let data = super.getTodos();
        data.assigned = assigned;
        data.assigned.push(this.#todo);
        
        return data;
    }

    mapStatuses(){
        /** Create and add new item */
        let statuses = this.#todo;
        let data = super.getTodos();
        data.statuses = statuses;
       
        
        return data;
              
    }

    mapTypes(){
        /** Create and add new item */
        let types = this.#todo;
        let data = super.getTodos();
        data.types = types;
        
        
        return data;
    }

    /**
     * get all todo
     * @returns parsed todos
     */

    getTodos(){
        return super.getTodos();
    }

    /**
     * Query by id
     * @param {id} id 
     * @returns todo
     */

    getTodosById(id){
        const data = super.getTodos();
        const todoIndex = data.todos.findIndex( data => data.id === id);
        if (todoIndex === -1) {
            return "Not found";
        }
        return data.todos[todoIndex];
    }

    writeTodosJSON(todos){
        try{
            fs.writeFileSync(this.#jsonFilepath, 
                JSON.stringify(todos, null, 2), 'utf8');
            console.log("File Created", this.#jsonFilepath);
        }catch(err){
            console.log(err);
        }
    }


    /**
     * Save new Todos
     */
    saveTodos(){
        let todos  = super.getTodos();

        if('todos' in todos){

           
            todos.todos.push(this.#todo);
           
        }else {

        // 'todos is not on the list we need to create it'
            todos = this.mapTodo();
        }
       
        this.writeTodosJSON(todos);
    }
    /**
     * Save new Statuses
     */
    saveTodoStatuses(){

        let todo  = super.getTodos();

        if(!('statuses' in todo)){
            todo = this.mapStatuses();
           
        }else{
         //update content 

         todo.statuses = this.#todo;
        }
        this.writeTodosJSON(todo);
        
    }

    /**
     * Save new todo types
     */

    saveTodoTypes(){

        let todo  = super.getTodos();

        if(!('types' in todo)){
            todo = this.mapTypes();
           
        }else{
         //update content 

         todo.types = this.#todo;
        }
        this.writeTodosJSON(todo);
        
    }
    
    
    saveContributor(){

        let todo  = super.getTodos();

        if(!('assigned' in todo)){
            todo = this.mapContributor();
           
        }else{
         //update content 

         todo.assigned = this.#todo;
        }
        this.writeTodosJSON(todo);
        
    }

    /**
     * update existing todo
     * @param {todo} updateData 
     */
    updateTodos(updateData = this.#todo){

        try{

            const id =  this.#todo.id || updateData.id;
            const data = super.getTodos();

            if(!('todos' in data)){
                return { error: 'Todo not found' };
            }
          
            const todoIndex = data.todos.findIndex( data => data.id === id);

    
            if (todoIndex === -1) {
                return { error: 'Todo not found' };
            }
           
           data.todos[todoIndex] = {...data.todos[todoIndex] , ...updateData}

           this.#saveUpdate(data);

        }catch(err){
            console.log(err);
        }

    }

    /**
     * Update the existing todo
     * @param {updated todo} updatedTodo 
     */
    #saveUpdate(updatedTodo){

        try{
            fs.writeFileSync(this.#jsonFilepath, 
                JSON.stringify(updatedTodo, null, 2), 'utf8');
            console.log("File Created", this.#jsonFilepath);
        }catch(err){
            console.log(err);
        }

    }
}

module.exports = QueryTodos;