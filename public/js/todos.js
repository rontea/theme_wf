
'use strict';


document.addEventListener('DOMContentLoaded', () => {

    const todoList = document.getElementById('todoList');
    const errorDiv = document.getElementById('error');
    const todoTable = document.getElementById('todoTable').getElementsByTagName('tbody')[0];
    const link = document.createElement('a');
  

    async function loadTodoListAsync() {

        try{

            const response = await fetch('/api/todos');

            if(!response.ok){
                throw new Error('failed to load todos');
            }

            const todos = await response.json();

            todos.forEach(todo => {

                link.href = `/edit/todo/${todo.id}`;
                link.textContent = 'Edit';
                link.target = '_blank';

                const row = todoTable.insertRow();

                const cellId = row.insertCell(0);
                const cellTitle = row.insertCell(1);
                const cellDescription = row.insertCell(2);
                const cellType = row.insertCell(3);
                const cellStatus = row.insertCell(4);
                const cellSubtask = row.insertCell(5);
                const cellComments = row.insertCell(6);
                const cellActionEdit = row.insertCell(7);
                const cellActionDelete = row.insertCell(8);

                cellId.textContent = todo.id;
                cellActionEdit.appendChild(link);
                cellActionDelete.appendChild(link);
                
            });

        }catch(err){
            errorDiv.textContent = err.message;
        }
        
    }

    loadTodoListAsync();

});
