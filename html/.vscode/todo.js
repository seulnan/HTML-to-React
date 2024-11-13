document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const remainingTasks = document.getElementById('remaining-tasks');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearCompletedButton = document.getElementById('clear-completed');
    const themeToggle = document.querySelector('.theme-toggle');
    const lightModeIcon = document.querySelector('.light-mode-icon');
    const darkModeIcon = document.querySelector('.dark-mode-icon');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

    const updateTaskList = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task');
            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index=${index} />
                <span class="${task.completed ? 'task-completed' : ''}">${task.text}</span>
                <span class="delete-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6777 0.707107L16.9706 0L8.83883 8.13173L0.707107 0L0 0.707107L8.13173 8.83883L0 16.9706L0.707106 17.6777L8.83883 9.54594L16.9706 17.6777L17.6777 16.9706L9.54594 8.83883L17.6777 0.707107Z" fill="#494C6B"/>
                </svg></span>
            `;
            taskList.appendChild(taskItem);

            const checkbox = taskItem.querySelector('input[type="checkbox"]');
            const taskText = taskItem.querySelector('span');
            checkbox.addEventListener('click', () => toggleTaskCompletion(index));
            taskText.addEventListener('click', () => toggleTaskCompletion(index));

            const deleteIcon = taskItem.querySelector('.delete-icon');
            deleteIcon.addEventListener('click', () => deleteTask(index));
        });

        const remainingCount = tasks.filter(task => !task.completed).length;
        remainingTasks.textContent = `${remainingCount} item${remainingCount !== 1 ? 's' : ''} left`;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const toggleTaskCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        updateTaskList();
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        updateTaskList();
    };

    const addTask = (e) => {
        if (e.key === 'Enter' && newTaskInput.value.trim() !== '') {
            tasks.push({
                text: newTaskInput.value,
                completed: false
            });
            newTaskInput.value = '';
            updateTaskList();
        }
    };

    const toggleTheme = () => {
        darkMode = !darkMode;
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        document.body.classList.toggle('dark-mode', darkMode);

        if (darkMode) {
            lightModeIcon.style.display = 'none';
            darkModeIcon.style.display = 'inline';
        } else {
            lightModeIcon.style.display = 'inline';
            darkModeIcon.style.display = 'none';
        }
    };

    const filterTasks = (filter) => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        const activeFilterButton = document.getElementById(`filter-${filter}`);
        activeFilterButton.classList.add('active');

        const filteredTasks = tasks.filter(task => {
            if (filter === 'all') return true;
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
        });

        taskList.innerHTML = '';
        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task');
            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index=${index} />
                <span class="${task.completed ? 'task-completed' : ''}">${task.text}</span>
                <span class="delete-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 7.5L12.5 4L14 5.5L10.5 9L14 12.5L12.5 14L9 10.5L5.5 14L4 12.5L7.5 9L4 5.5L5.5 4L9 7.5Z" fill="#e57373"/>
                </svg></span>
            `;
            taskList.appendChild(taskItem);

            const checkbox = taskItem.querySelector('input[type="checkbox"]');
            const taskText = taskItem.querySelector('span');
            checkbox.addEventListener('click', () => toggleTaskCompletion(index));
            taskText.addEventListener('click', () => toggleTaskCompletion(index));

            const deleteIcon = taskItem.querySelector('.delete-icon');
            deleteIcon.addEventListener('click', () => deleteTask(index));
        });
    };

    const clearCompleted = () => {
        tasks = tasks.filter(task => !task.completed);
        updateTaskList();
    };

    newTaskInput.addEventListener('keydown', addTask);
    clearCompletedButton.addEventListener('click', clearCompleted);
    themeToggle.addEventListener('click', toggleTheme);
    document.getElementById('filter-all').addEventListener('click', () => filterTasks('all'));
    document.getElementById('filter-active').addEventListener('click', () => filterTasks('active'));
    document.getElementById('filter-completed').addEventListener('click', () => filterTasks('completed'));

    if (darkMode) {
        document.body.classList.add('dark-mode');
        lightModeIcon.style.display = 'none';
        darkModeIcon.style.display = 'inline';
    } else {
        lightModeIcon.style.display = 'inline';
        darkModeIcon.style.display = 'none';
    }

    updateTaskList();
});
