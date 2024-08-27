'use strict';

const config = require('../../config/configLoader');
const QueryTodos = require('../models/QueryTodos');
const QueryTodosFile = require('../models/QueryTodosFile');

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
 * Function to get Todos from Json file
 * @returns respond
 */

const getTodos = () => {

    let responds = "{}";

    try {
        const queryFileTodos = new QueryTodosFile(config.paths.todoJsonFile);
        const todosData = queryFileTodos.getTodos();
        responds = {message : "Load Get Todo Sucess " , todos : todosData.todos};
        return  responds;

    }catch(err){
        responds = { message : `Failed to load get todos: ${err}` , todos : "No Data" };
        return responds;
    }

}

const getStatuses = () => {

    let responds = "{}";

    try {
        const queryFileTodos = new QueryTodosFile(config.paths.todoJsonFile);
        const todosData = queryFileTodos.getTodos();
        responds = {message : "Load Get Todo Sucess " , statuses : todosData.statuses};
        return  responds;

    }catch(err){
        responds = { message : `Failed to load get todos: ${err}` , statuses : "No Data" };
        return responds;
    }

}

const getTypes = () => {

    let responds = "{}";

    try {
        const queryFileTodos = new QueryTodosFile(config.paths.todoJsonFile);
        const todosData = queryFileTodos.getTodos();
        responds = {message : "Load Get Todo Sucess " , types : todosData.types};
        return  responds;

    }catch(err){
        responds = { message : `Failed to load get todos: ${err}` , types : "No Data" };
        return responds;
    }

}

module.exports = {addTodo , getTodos , getStatuses, getTypes};