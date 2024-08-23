'use strict';

const utils = require("../../utils/utils");
const { isArrayEmpty } = require("../../utils/utils");

class TodoListView {

    #data;

    constructor(data){
        this.#data = data;
    }

    /**
     * get the header of TODO
     * @returns header view
     */
    getHeader(){

        try{
            const title = "TODO";
            const subTitle = "List";
            return `# ${title}\n### ${subTitle}`;
    
        }catch(err){
            console.log("Error on getHeader" , err);
        }

    }

    /**
     * get the symbol of the current status
     * @param {string} status 
     * @returns string symbol
     */

    #getSymbol(status){

        try{

            const xSymbol = "x";
            const blankSymbol = " ";

            let symbol = blankSymbol;
            status = status.toLowerCase(); 

            if(status === "completed" || status === "deployed"){
                symbol = xSymbol;
            }

            return symbol;

        }catch(err) {
            console.log("Error on getSymbol " , err);
        }
        
    }

    /**
     * Get the list of task
     * @returns array formatted
     */

    getList(){

        try{
            const listView = [];
            let symbol = " ";

            this.#data.todos.forEach(todo => {
            
                symbol = this.#getSymbol(todo.status);

                const mainTask = this.#generateViewTask(todo,symbol);

                if(Array.isArray(todo.subtask)) {

                let subTask;
                let sub = [];
                    // sub
                    todo.subtask.forEach((id,index)=> {
                    
                        // load this information of sub task
                        const subTaskTodo = this.#getTodoById(id);

                        if(subTaskTodo === 'na'){

                            if(utils.isGitDocLink(id)){
                                sub[index] = `  - [${symbol}] ${id}\n`;
                            }else{
                                sub[index] = `  - [${symbol}] [${id}](${id.toLowerCase()})\n`;
                            }
                          
                        }else{
                            symbol = this.#getSymbol(subTaskTodo.status);
                            const subTodoView = this.#generateViewTask(subTaskTodo,symbol);
                            subTask = `  ${subTodoView}`;
                            sub[index] = subTask;
                        }
                       
                    });
                
                    listView.push( { 'main' : mainTask ,  sub});

                }else{
                    listView.push({ 'main' : mainTask});
                }

                symbol = " ";

            });

            return listView;

        }catch(err){
            console.log("Error on getList ", err)
        }
        
    }

    /**
     * Generate the view for the detailed Todo
     * @returns detailed todo
     */

    getDetails(){

        try{
            let listView = [];

            let symbol = " ";

            this.#data.todos.forEach((todo, index) => {

                let listSubTask = [];

                symbol = this.#getSymbol(todo.status);

                if(Array.isArray(todo.subtask)) {
                    // sub
                    todo.subtask.forEach((todo , index) => {

                        const subTodoData = this.#getTodoById(todo);
                        
                        if(subTodoData === 'na' ){
                            
                            if(utils.isGitDocLink(todo)){
                                if(index === 0) {
                                    listSubTask[index] = this.#generateViewSubIsLinkDetails(symbol,todo,true);
                                }else{
                                    listSubTask[index] = this.#generateViewSubIsLinkDetails(symbol,todo,false);
                                }   
                                
                            }else{
                                if(index === 0) {
                                    listSubTask[index] = this.#generateViewSubTaskDetails(symbol,todo,true);
                                }else{
                                    listSubTask[index] = this.#generateViewSubTaskDetails(symbol,todo,false);
                                }
                            }

                        }else{
                            symbol = this.#getSymbol(subTodoData.status);

                            if(index === 0) {
                                listSubTask[index] = this.#generateViewSubTaskDetails(symbol,todo,true);
                            }else{
                                listSubTask[index] = this.#generateViewSubTaskDetails(symbol,todo,false);
                            }
                       
                        }

                        symbol = " ";
                    });

                }else {
                    listSubTask = todo.subtask;
                }

                listView[index] = this.#generateViewTaskDetails(todo,symbol,listSubTask);
                
                symbol = " ";

            });

            return listView;

        }catch(err){
            console.log("Error on getDetails ", err);
        }

    }
    /**
     * Generate the view
     * @param {object} todo 
     * @param {string} symbol 
     * @param {Array} listSubTask 
     * @returns 
     */
    #generateViewTaskDetails(todo,symbol,listSubTask){
        
        try{
            let head = "\n```plaintext";
            let footer = "```\n";
            let list = [];

            if(Array.isArray(todo.subtask)){
                list = listSubTask.join('');
            }else{
                list = listSubTask;
            }
            
            const detailedView = `#### ${todo.id} [#](#${todo.id.toLowerCase()})\n${head}\n[${symbol}]\nTitle: ${todo.title}\nDate: ${todo.date}\nAssign: ${todo.assign}\n\nDescription: ${todo.description}\n\nType: #${todo.type} | Status: ${todo.status} \n\nSubtask: ${list}\nComment: \n${todo.comments}\n${footer} `;
            
            return detailedView;
        }catch(err){
            console.log("Error on generateViewTaskDetails");
        }
        
    }

    /**
     * 
     * @param {object} todo 
     * @param {string} symbol 
     * @returns 
     */

    #generateViewTask(todo,symbol){

        try{
            const mainTask = `- [${symbol}] [${todo.id}](#${todo.id.toLowerCase()}) - ${todo.description} ~${todo.days} #${todo.type} @${todo.assign} ${todo.date}\n`;
        
            return mainTask;
        }catch(err){
            console.log("Error on generateViewTask ", err);
        }
       
    }

    #generateViewSubIsLinkDetails(symbol,todo,first){

        if(first){
            return `\n[${symbol}] ${todo}\n`;
        }else{
            return `[${symbol}] ${todo}\n`;
        }
    }

    #generateViewSubTaskDetails(symbol,todo,first){
        if(first){
            return `\n[${symbol}] [${todo}](#${todo.toLowerCase()})\n`;
        }else{
            return `[${symbol}] [${todo}](#${todo.toLowerCase()})\n`;
        }
    }

    /**
     * Find Todo based on id
     * @param {*} id 
     * @returns todo or na
     */

    #getTodoById(id){
        
        try{
            const todoIndex = this.#data.todos.findIndex( data => data.id === id);

            if(todoIndex === -1){
                console.log('id not available');
                return 'na';
            }
    
            return this.#data.todos[todoIndex];

        }catch(err){
           console.log("Error on getTodoById ", err);
        }
       
    }

}

module.exports = TodoListView;