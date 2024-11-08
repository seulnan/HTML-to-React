document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const input = document.getElementById('todo-input');
    const todoBox = document.getElementById('todo-box');
    const itemsLeft = document.getElementById('items-left');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearCompleted = document.getElementById('clear-completed');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let isDarkMode = false;

    const renderTodos = () => {
        todoBox.innerHTML = '<hr class="separator">';
        let activeCount = 0;
        todos.forEach((todo, index) => {
            if (todo.status === 'active') activeCount++;
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            if (todo.status === 'completed') todoItem.classList.add('completed');

            todoItem.innerHTML = `
                <img src="assets/hover_dark.png" class="hover-icon" alt="Hover Icon" onclick="toggleTodoStatus(${index})">
                <span class="todo-text">${todo.text}</span>
                <img src="assets/cross.svg" class="remove-icon" alt="Remove Icon" onclick="removeTodo(${index})">
            `;

            if (filter === 'all' || (filter === 'active' && todo.status === 'active') || (filter === 'completed' && todo.status === 'completed')) {
                todoBox.appendChild(todoItem);
            }
        });
        itemsLeft.textContent = `${activeCount} items left`;
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const addTodo = (text) => {
        todos.push({ text, status: 'active' });
        renderTodos();
    };

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            addTodo(input.value.trim());
            input.value = '';
        }
    });

    const toggleTodoStatus = (index) => {
        todos[index].status = todos[index].status === 'active' ? 'completed' : 'active';
        renderTodos();
    };

    const removeTodo = (index) => {
        todos.splice(index, 1);
        renderTodos();
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filter = button.textContent.toLowerCase();
            renderTodos();
        });
    });

    clearCompleted.addEventListener('click', () => {
        todos = todos.filter(todo => todo.status !== 'completed');
        renderTodos();
