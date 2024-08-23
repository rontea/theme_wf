'use strict';
const config = require('../../config/configLoader');
const defaultTodosView = require('../views/TodoViewFunc');
const UpdateMarkDown = require('../services/UpdateMarkDown');

const fileUpdateMarkdownTodos = (todos) => {

    let responds = {};

    try{

        const data = defaultTodosView(todos);
        console.log(data.message);
        const writeTodo = new UpdateMarkDown({filePath: config.paths.todoMdFile});
        writeTodo.todoFileWrite(data.content);

        responds = { message : "TODO.md updated"};
        return responds;
        
    }catch(err){
        
        responds = { message : `Error writing on TODO.md ${err}`};
        return responds;
    }
};

module.exports = fileUpdateMarkdownTodos;