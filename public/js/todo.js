document.addEventListener('DOMContentLoaded', () => {
    fetch('../../todos.json')
        .then(response => response.json())
        .then(data => {
            const todoTable = document.getElementById('todoTable').getElementsByTagName('tbody')[0];
            data.forEach(todo => {
                const row = todoTable.insertRow();

                const cellId = row.insertCell(0);
                const cellTitle = row.insertCell(1);
                const cellDescription = row.insertCell(2);
                const cellType = row.insertCell(3);
                const cellStatus = row.insertCell(4);
                const cellSubtasks = row.insertCell(5);
                const cellComments = row.insertCell(6);

                cellId.textContent = todo.id;
                cellTitle.textContent = todo.title;
                cellDescription.textContent = todo.description;
                cellType.textContent = todo.type;
                cellStatus.textContent = todo.status;
                cellSubtasks.textContent = todo.subtask.join(', ');
                cellComments.textContent = todo.comments;
            });
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
});