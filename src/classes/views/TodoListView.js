'use strict';

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

        const title = "TODO";
        const subTitle = "List";
        return `# ${title}\n### ${subTitle}`;

    }

    /**
     * get the symbol of the current status
     * @param {string} status 
     * @returns string symbol
     */

    #getSymbol(status){

        const checkSymbol = "✓";
        const xSymbol = "x";
        const blankSymbol = " ";

        let symbol = blankSymbol;
        status = status.toLowerCase(); 

        if(status === "completed" || status === "deployed"){
            symbol = checkSymbol;
        } else {
            if(status === "in progress"){
                symbol = xSymbol;
            }
        }


        return symbol;

    }

    /**
     * Get the list of task
     * @returns array formatted
     */

    getList(){

        const listView = [];
        let symbol = " ";

        this.#data.todos.forEach(todo => {
           
         symbol = this.#getSymbol(todo.status);

            const mainTask = this.#generateViewTask(todo,symbol);
            
            if(todo.subtask !== 'NA') {

               let subTask;
               let sub = [];
                // sub
                todo.subtask.forEach((id,index)=> {
                  
                    // load this information of sub task
                    const subTaskTodo = this.#getTodoById(id);

                    symbol = this.#getSymbol(subTaskTodo.status);
                    const subTodoView = this.#generateViewTask(subTaskTodo,symbol);
                    subTask = `  ${subTodoView}`;

                    sub[index] = subTask;
                    
                });
               
                listView.push( { 'main' : mainTask , 'sub' : sub});

            }else{
                listView.push({ 'main' : mainTask});
            }

            symbol = " ";

        });

        return listView;
    }

    /**
     * Generate the view for the detailed Todo
     * @returns detailed todo
     */

    getDetails(){


        let listView = [];
    

        let symbol = " ";

        this.#data.todos.forEach((todo, index) => {

            let listSubTask = [];

            symbol = this.#getSymbol(todo.status);

            if(Array.isArray(todo.subtask)) {
                // sub
                todo.subtask.forEach((todo , index) => {

                    const subTodoData = this.#getTodoById(todo);

                    symbol = this.#getSymbol(subTodoData.status);

                    if(index == 0) {
                        listSubTask[index] = `\n[${symbol}] [${todo}](#${todo.toLowerCase()})\n`;
                    }else{
                        listSubTask[index] = `[${symbol}] [${todo}](#${todo.toLowerCase()})\n`;
                    }
                });

            }else {
                listSubTask = todo.subtask;
            }

            listView[index] = this.#generateViewTaskDetails(todo,symbol,listSubTask);
            
            symbol = " ";

        });

        return listView;

    }

    #generateViewTaskDetails(todo,symbol,listSubTask){
        let head = "```plaintext";
        let footer = "```";
        const detailedView = `#### [${symbol}] ${todo.id} [](${todo.id.toLowerCase()}) \n${head}\nTitle: ${todo.title}\nDate: ${todo.date}\nAssign: ${todo.assign}\n\nDescription: ${todo.description}\n\nType: #${todo.type} | Status: ${todo.status} \n\nSubtask: ${listSubTask}\nComment: \n${todo.comments}\n${footer} `;
        return detailedView;
    }

    #generateViewTask(todo,symbol){
        const mainTask = `[${symbol}] [${todo.id}](#${todo.id.toLowerCase()}) - ${todo.description} ~${todo.days} #${todo.type} @${todo.assign} ${todo.date}`                  ;
        return mainTask;
    }

    #getTodoById(id){
        
        const todoIndex = this.#data.todos.findIndex( data => data.id === id);

        if(todoIndex === -1){
            console.log("cannot find id");
        }

        return this.#data.todos[todoIndex];
    }

}

module.exports = TodoListView;