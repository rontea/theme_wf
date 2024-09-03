
'use strict';

document.addEventListener('DOMContentLoaded' , () => {
    
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const pathname = url.pathname;
    const todoId = pathname.split('/').pop();
    console.log(todoId);

    const formId = document.getElementById('editTodoForm');
    


    const errorDiv = document.getElementById('error');

    async function loadTodoData() {
        try{
            const response = await fetch(`/api/todo/${todoId}`);
            if (!response.ok) {
                throw new Error('Failed to load todo');
            }
            const todo = await response.json();
            document.getElementById('title').value = todo.title;
            document.getElementById('description').value = todo.description;
        }catch(err){
            errorDiv.textContent = err.message;
        }
    }

    formId.addEventListener('submit' , async (e) => {
        e.preventDefault();
        
        errorDiv.textContent = '';

        const updateData = {
            title : document.getElementById('title').value,
            description : document.getElementById('description').value,
        }

        console.log(updateData);

        try{
            const response = await fetch(`/api/todoedit/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData) // Send the updateData object as JSON
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save todo');
            }

            // Redirect back to the main page after saving
            window.location.href = '/';
        } catch (error) {
            errorDiv.textContent = error.message;
        }

            
    });

    loadTodoData();

});


