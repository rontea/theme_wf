'use strict';
const  TodoListView = require('./TodoListView');
const utils = require('../../utils/utils');

const defaultTodosView = (data) => {

    let responds = {};

    try{

        const todoListView = new TodoListView(data);

        /** Content List */
        const header = todoListView.getHeader();
        const todoList = todoListView.getList();
        const todoDetails = todoListView.getDetails();

        const contentList = [];

        todoList.forEach( list => {

            contentList.push( `${list.main}`);

            if(utils.isArray(list.sub)) {
                
                list.sub.forEach(sub => {
                    contentList.push(`${sub}`);
                });
            }
        
        });

        const contentDetails = [];

        todoDetails.forEach(details => {
            contentDetails.push(details);
        });

        
        const content = `${header}\n ${contentList.join('')}\n${contentDetails.join('')}`;

        responds = { message : "Default view created " , content : content};
        return responds;

    }catch(err){
        responds = { message : `Default view error, ${err}`  , content : "Default view failed"};
        return responds;
    }

};

module.exports = defaultTodosView;