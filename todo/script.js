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
  todoList.innerHTML = '';
  const activeFilter = document.querySelector('.filter-group .active');
  const filter = activeFilter ? activeFilter.id.replace('filter-', '') : 'all';

  todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
  }).forEach(todo => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (todo.completed) taskElement.classList.add('completed');

    taskElement.innerHTML = `
      <img src="assets/${todo.completed ? 'check.svg' : 'Oval Copy.svg'}" class="task-check">
      <span class="task-text">${todo.text}</span>
      <img src="assets/icon-cross.svg" class="task-delete">
    `;

    taskElement.querySelector('.task-check').addEventListener('click', () => toggleTodoComplete(todo.id));
    taskElement.querySelector('.task-delete').addEventListener('click', () => deleteTodoItem(todo.id));

    todoList.appendChild(taskElement);
  });

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
