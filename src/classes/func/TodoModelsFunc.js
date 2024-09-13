'use strict';

const config = require('../../config/configLoader');
const QueryTodos = require('../models/QueryTodos');
const QueryTodosFile = require('../models/QueryTodosFile');
const utils = require('../../utils/utils');

/**
 * Function to add Todo on Json file
 * @param {*} todo 
 * @returns respond
 */
const addTodo = (todo) => {

    let responds = "{}";

    try{
        const queryTodos = new QueryTodos(todo, { path : config.paths.todoJsonFile});
        queryTodos.saveTodos();
        responds = { message : "Todo has been saved"};

    }catch(err){
       return { message : `Failed to add todo: ${err}` };
    }
    
    return responds;
    
};

/**
 * Function to add Statuses on JSON file
 * @param {*} statuses 
 * @returns respond
 */

const addStatuses = (statuses) => {

    let responds = "{}";

    try{
        const queryTodos = new QueryTodos(statuses, { path : config.paths.todoJsonFile});
        queryTodos.saveTodoStatuses();
        responds = { message : "Statuses has been saved"};

    }catch(err){
       return { message : `Failed to add statuses: ${err}` };
    }
    
    return responds;
}

/**
 * Function to add Statuses on JSON file
 * @param {*} statuses 
 * @returns respond
 */

const addTypes = (types) => {

    let responds = "{}";

    try{
        const queryTodos = new QueryTodos(types, { path : config.paths.todoJsonFile});
        queryTodos.saveTodoTypes();
        responds = { message : "Types has been saved"};

    }catch(err){
       return { message : `Failed to add types: ${err}` };
    }
    
    return responds;
}

/**
 * 
 * @param {*} contributor 
 * @returns respond
 */

const addContributor = (contributor) => {

    let responds = "{}";

    try{
        const queryTodos = new QueryTodos(contributor, { path : config.paths.todoJsonFile});
        queryTodos.saveContributor(contributor);
        responds = { message : "Contributor has been saved"};

    }catch(err){
       return { message : `Failed to add types: ${err}` };
    }
    
    return responds;
}

/**
 * Function to get Todos from Json file
 * @returns respond
 */

const getTodos = () => {

    let responds = "{}";

    try {
        const queryFileTodos = new QueryTodosFile(config.paths.todoJsonFile);
        let todosData = queryFileTodos.getTodos();
        if(!utils.isObjectAvailable('todos', todosData)){
            todosData = { todos : []};
        }

        responds = {message : "Load Get Todo Success " , todos : todosData.todos};
        return  responds;

    }catch(err){
        responds = { message : `Failed to load get todos: ${err}` , todos : ['No data'] };
        return responds;
    }

}

/**
 * Function to get Statuses from Json file
 * @returns respond
 */

const getStatuses = () => {

    let responds = "{}";

    try {
        const queryFileTodos = new QueryTodosFile(config.paths.todoJsonFile);
        let todosData = queryFileTodos.getTodos();

        if(!utils.isObjectAvailable('statuses', todosData)){
            todosData = { statuses : []};
        }

        responds = {message : "Load Get Statuses successful" , statuses : todosData.statuses};
        return  responds;

    }catch(err){
        
        responds = { message : `Failed to load get statuses: ${err}` , statuses : ['No Data'] };
        return responds;
    }

}

/**
 * Function to get Types from Json file
 * @returns respond
 */
const getTypes = () => {

    let responds = "{}";

    try {
        const queryFileTodos = new QueryTodosFile(config.paths.todoJsonFile);
        let todosData = queryFileTodos.getTodos();

        if(!utils.isObjectAvailable('types', todosData)){
            todosData = { types : []};
        }

        responds = {message : "Load Get Types Success " , types : todosData.types};
        return  responds;

    }catch(err){
        responds = { message : `Failed to load get types: ${err}` , types : ['No Data']};
        return responds;
    }

}

/**
 * Function to get Contributors from Json file
 * @returns respond
 */

const getContributors = () => {

    let responds = "{}";

    try {
        const queryFileTodos = new QueryTodosFile(config.paths.todoJsonFile);
        let todosData = queryFileTodos.getTodos();
        if(!utils.isObjectAvailable('assigned', todosData)){
            todosData = { assigned : []};
        }

        responds = {message : "Load Get Contributors Success " , assigned : todosData.assigned};
        return  responds;

    }catch(err){
        responds = { message : `Failed to load get contributors: ${err}` , assigned : [ { name : 'No data' , link : 'no data'}] };
        return responds;
    }

}


module.exports = {addTodo , addStatuses , addTypes, getTodos , getStatuses, getTypes, getContributors};