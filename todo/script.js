const newTodoInput = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');
const remainingCount = document.getElementById('remaining-count');
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;
let todos = JSON.parse(localStorage.getItem('todos')) || [];

const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(`${currentTheme}-mode`);
modeToggle.src = currentTheme === 'dark' ? 'assets/icon-sun.svg' : 'assets/icon-moon.svg';

function renderTodos() {
  // Clear the current todo list
  todoList.innerHTML = '';

  // Get the currently active filter
  const activeFilter = document.querySelector('.filter-group .active');
  const filter = activeFilter ? activeFilter.id.replace('filter-', '') : 'all';

  // Render todos based on the active filter
  todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
  }).forEach(todo => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (todo.completed) taskElement.classList.add('completed');

    // Task content
    taskElement.innerHTML = `
      <img src="assets/${todo.completed ? 'check.svg' : 'Oval Copy.svg'}" class="task-check">
      <span class="task-text">${todo.text}</span>
      <div class="task-delete-wrapper">
        ${document.body.classList.contains('dark-mode') 
          ? `<svg class="task-delete" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6777 0.707107L16.9706 0L8.83883 8.13173L0.707107 0L0 0.707107L8.13173 8.83883L0 16.9706L0.707106 17.6777L8.83883 9.54594L16.9706 17.6777L17.6777 16.9706L9.54594 8.83883L17.6777 0.707107Z" fill="#FFF"/>
            </svg>`
          : `<img src="assets/icon-cross.svg" class="task-delete">`}
      </div>
    `;

    // Add event listeners
    taskElement.querySelector('.task-check').addEventListener('click', () => toggleTodoComplete(todo.id));
    taskElement.querySelector('.task-delete').addEventListener('click', () => deleteTodoItem(todo.id));

    // Append the task element to the list
    todoList.appendChild(taskElement);

    // Create and append the divider element
    const divider = document.createElement('div');
    divider.classList.add('task-divider');
    todoList.appendChild(divider);
  });

  // Ensure "All" filter is active by default on page load
  if (!document.querySelector('.filter.active')) {
    document.getElementById('filter-all').classList.add('active');
  }

  updateRemainingCount();
}


function addTodo() {
  const text = newTodoInput.value.trim();
  if (text === '') return;
  todos.push({ id: Date.now(), text, completed: false });
  newTodoInput.value = '';
  saveAndRender();
}

function toggleTodoComplete(id) {
  todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
  saveAndRender();
}

function deleteTodoItem(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveAndRender();
}

function clearCompletedTodos() {
  todos = todos.filter(todo => !todo.completed);
  saveAndRender();
}

function setFilter(button) {
  document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  renderTodos();
}


function toggleTheme() {
  body.classList.toggle('dark-mode');
  const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
  modeToggle.src = currentTheme === 'dark' ? 'assets/icon-sun.svg' : 'assets/icon-moon.svg';
}

function updateRemainingCount() {
  const uncompletedCount = todos.filter(todo => !todo.completed).length;
  remainingCount.textContent = `${uncompletedCount} items left`;
}

function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

newTodoInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTodo();
});
modeToggle.addEventListener('click', toggleTheme);
document.getElementById('clear-completed').addEventListener('click', clearCompletedTodos);
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => setFilter(button)));

renderTodos();
