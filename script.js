// Run script only after DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage on page load
    loadTasks();

    // Add event listener to "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add task on pressing Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();

        // If input is empty, alert the user
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new <li> element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Attach click event to remove the task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            saveTasks(); // Update localStorage
        };

        // Append remove button to the list item and add to the task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';

        // Save tasks to localStorage
        saveTasks();
    }

    // Save all tasks to localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            const text = li.firstChild.textContent; // Exclude 'Remove' button text
            tasks.push(text);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';
            removeBtn.onclick = function () {
                taskList.removeChild(li);
                saveTasks();
            };

            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }
});
