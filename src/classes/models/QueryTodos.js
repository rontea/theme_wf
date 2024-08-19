'use strict';

const fs = require('fs');
const QueryTodosFile = require('./QueryTodosFile');

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
        const todo = { todos : [] };
        todo.todos.push(this.#todo);
        return todo;
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


    /**
     * Save new Todos
     */
    saveTodos(){
        let todos;

        if(this.isTodosEmpty()){
            todos = this.mapTodo();
        }else {
            todos = super.getTodos();
            todos.todos.push(this.#todo);
        }
       
        try{
            fs.writeFileSync(this.#jsonFilepath, 
                JSON.stringify(todos, null, 2), 'utf8');
            console.log("File Created", this.#jsonFilepath);
        }catch(err){
            console.log(err);
        }
        
    }

    /**
     * update existing todo
     * @param {todo} updateData 
     */
    updateTodos(updateData = this.#todo){

        try{

            const id =  this.#todo.id || updateData.id;
            const data = super.getTodos();
          
            const todoIndex = data.todos.findIndex( data => data.id === id);

    
            if (todoIndex === -1) {
                return res.status(404).json({ error: 'Todo not found' });
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