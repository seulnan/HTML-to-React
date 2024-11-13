const savedTheme = localStorage.getItem('theme');
const themeIcon = document.getElementById('themeIcon');

if (savedTheme) {
    document.body.classList.add(savedTheme);
    themeIcon.src = savedTheme === 'dark-mode' ? './asset/sunIcon.png' : './asset/moonIcon.png'; // 초기 아이콘 설정
} else {
    document.body.classList.add('light-mode');
    themeIcon.src = './asset/moonIcon.png';
}


const themeToggleButton = document.getElementById('themeToggle');

themeToggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        themeIcon.src = './asset/moonIcon.png';
        localStorage.setItem('theme', 'light-mode');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        themeIcon.src = './asset/sunIcon.png';
        localStorage.setItem('theme', 'dark-mode');
    }
});


window.addEventListener('load', () => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach((todo) => addTodoItem(todo.text, todo.completed));
    reorderTodoList(); // 로드 후 정렬 호출
    updateRemainingCount();
});


const todoInputField = document.getElementById('todoInput');


todoInputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const todoText = todoInputField.value.trim();
        if (todoText) {
            addTodoItem(todoText, false);
            todoInputField.value = '';
            saveTodos();
        }
    }
});


function addTodoItem(text, completed = false) {
    const todoList = document.getElementById('todoList');
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';
    todoItem.setAttribute('draggable', true);
    if (completed) {
        todoItem.classList.add('completed');
    }

    const checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    todoItem.innerHTML = `
        <div class="checkbox-container">
            <input type="checkbox" id="${checkboxId}" ${completed ? 'checked' : ''}>
            <label for="${checkboxId}"></label>
            <span class="todo-text">${text}</span>
        </div>
        <span class="delete-icon"></span>
    `;

    todoList.appendChild(todoItem);
    reorderTodoList();
    updateRemainingCount();


    const checkbox = todoItem.querySelector(`#${checkboxId}`);
    checkbox.addEventListener('change', (e) => {
        todoItem.classList.toggle('completed', e.target.checked);
        updateRemainingCount();
        saveTodos();
        reorderTodoList();
    });


    todoItem.querySelector('.delete-icon').addEventListener('click', () => {
        todoItem.remove();
        updateRemainingCount();
        saveTodos();
    });


    addDragAndDropEvents(todoItem);
}


function updateRemainingCount() {
    const remainingTasks = document.querySelectorAll('.todo-item:not(.completed)').length;
    document.getElementById('remainingCount').textContent = `${remainingTasks} items left`;
}


document.querySelectorAll('.filter-button').forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-button').forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.textContent.toLowerCase();
        filterTodos(filter);
    });
});

function filterTodos(filter) {
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach((item) => {
        const isCompleted = item.classList.contains('completed');
        if (
            filter === 'all' ||
            (filter === 'active' && !isCompleted) ||
            (filter === 'completed' && isCompleted)
        ) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}


document.getElementById('clearCompleted').addEventListener('click', () => {
    document.querySelectorAll('.todo-item.completed').forEach((item) => item.remove());
    updateRemainingCount();
    saveTodos();
});


function saveTodos() {
    const todos = Array.from(document.querySelectorAll('.todo-item')).map((item) => ({
        text: item.querySelector('.todo-text').innerText,
        completed: item.classList.contains('completed'),
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
}


const todoList = document.getElementById('todoList');

todoList.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('todo-item')) {
        e.target.classList.add('dragging');
    }
});

todoList.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('todo-item')) {
        e.target.classList.remove('dragging');
        saveTodos();
    }
});

todoList.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    if (!draggingItem) return;

    const items = [...todoList.querySelectorAll('.todo-item:not(.dragging)')];
    const afterElement = items.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;

    if (afterElement) {
        todoList.insertBefore(draggingItem, afterElement);
    } else {
        todoList.appendChild(draggingItem);
    }
});


function reorderTodoList() {
    const todoList = document.getElementById('todoList');
    const todoItems = Array.from(todoList.children);


    todoItems.sort((a, b) => {
        const aCompleted = a.classList.contains('completed') ? 1 : 0;
        const bCompleted = b.classList.contains('completed') ? 1 : 0;
        return bCompleted - aCompleted;
    });


    todoItems.forEach(item => todoList.appendChild(item));
}


function addDragAndDropEvents(todoItem) {
    
}
