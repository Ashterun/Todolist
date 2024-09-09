let tasks = [];

document.getElementById('addTaskButton').addEventListener('click', () =>
{
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;
    
    if (taskText)
    {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
    }
});

function renderTasks()
{
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) =>
    {
        const li = document.createElement('li');
        li.textContent = task.text;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        
        checkbox.addEventListener('change', () =>
        {
            task.completed = checkbox.checked;
            renderTasks();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        
        editButton.addEventListener('click', () =>
        {
            editTask(index);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        
        deleteButton.addEventListener('click', () =>
        {
            deleteTask(index);
        });

        li.appendChild(checkbox);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

function editTask(index)
{
    const newText = prompt("Измени дело", tasks[index].text);
    
    if (newText !== null)
    {
        tasks[index].text = newText;
        renderTasks();
    }
}

function deleteTask(index)
{
    tasks.splice(index, 1);
    renderTasks();
}

document.getElementById('downloadButton').addEventListener('click', () =>
{
    const jsonData = JSON.stringify(tasks, null, 2); 
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = 'tasks.json';
    link.click();
});