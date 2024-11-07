const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const background = document.getElementById('background');
const newTodoInput = document.getElementById('new-todo');
const todoBox = document.querySelector('.todo-box');
const itemsLeft = document.getElementById('items-left');
const clearCompletedButton = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filter-btn');
const addTodoOval = document.querySelector('.add-todo .oval');
let todos = [];

// Oval 상태를 로컬 스토리지에서 가져오기
let ovalState = localStorage.getItem('ovalState') || 'light';

// SVG strings for both themes
const lightOvalSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E3E4F1"/>
        <g opacity="0.01">
            <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_626)"/>
            <path d="M8 12.3041L10.6959 15L16.6959 9" stroke="white"/>
        </g>
        <defs>
            <linearGradient id="paint0_linear_0_626" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                <stop stop-color="#55DDFF"/>
                <stop offset="1" stop-color="#C058F3"/>
            </linearGradient>
        </defs>
    </svg>`;

const darkOvalSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11.5" stroke="#393A4B"/>
        <g opacity="0.01">
            <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_323)"/>
            <path d="M8 12.3041L10.6959 15L16.6959 9" stroke="white"/>
        </g>
        <defs>
            <linearGradient id="paint0_linear_0_323" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                <stop stop-color="#55DDFF"/>
                <stop offset="1" stop-color="#C058F3"/>
            </linearGradient>
        </defs>
    </svg>`;

// Oval 업데이트 함수
function updateAddTodoOval() {
    const isDark = document.body.classList.contains('dark');
    addTodoOval.innerHTML = isDark ? darkOvalSVG : lightOvalSVG;
}

// 테마 전환
const toggleTheme = () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeIcon.src = isDark ? 'images/icon-sun.svg' : 'images/icon-moon.svg';
    background.style.backgroundImage = isDark
        ? 'url(images/bg-desktop-dark.jpg)'
        : 'url(images/bg-desktop-light.jpg)';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // oval 상태 업데이트
    ovalState = isDark ? 'dark' : 'light';
    localStorage.setItem('ovalState', ovalState);
    updateAddTodoOval();
    updateTodoList();
};

// 초기 로딩 시 테마 설정
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeIcon.src = 'images/icon-sun.svg';
        background.style.backgroundImage = 'url(images/bg-desktop-dark.jpg)';
    } else {
        document.body.classList.remove('dark');
        themeIcon.src = 'images/icon-moon.svg';
        background.style.backgroundImage = 'url(images/bg-desktop-light.jpg)';
    }

    // "All" 버튼 기본 활성화
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    allButton.classList.add('active');  // "All" 버튼에 active 클래스 추가
    filterTodos('all');  // "All" 필터로 필터링

    // 로컬스토리지에서 할 일 리스트 가져오기
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
        todos = savedTodos;
        updateAddTodoOval();
        updateTodoList();
    }
});

// 테마 토글 버튼 클릭 이벤트
themeToggle.addEventListener('click', toggleTheme);

// TODO 추가
newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && newTodoInput.value.trim()) {
        addTodo(newTodoInput.value);
        newTodoInput.value = '';
    }
});

// TODO 추가 함수
function addTodo(text) {
    const todo = {
        text,
        completed: false,
    };
    todos.push(todo);
    updateTodoList();
    saveTodosToLocalStorage(); // 할 일을 로컬 스토리지에 저장
}

// TODO 리스트 업데이트 함수
function updateTodoList() {
    todoBox.innerHTML = ''; // 기존 리스트 초기화
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo';
        todoItem.innerHTML = `
            <div class="oval" data-index="${index}">
                <!-- SVG는 기본적으로 light 모드로 설정 -->
                <svg class="light-oval" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E3E4F1"/>
                    <g opacity="0.01">
                        <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_626)"/>
                        <path d="M8 12.3041L10.6959 15L16.6959 9" stroke="white"/>
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_0_626" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#55DDFF"/>
                            <stop offset="1" stop-color="#C058F3"/>
                        </linearGradient>
                    </defs>
                </svg>
                
                <!-- dark 모드에서는 이 SVG로 대체됨 -->
                <svg class="dark-oval" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11.5" stroke="#393A4B"/>
                    <g opacity="0.01">
                        <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_323)"/>
                        <path d="M8 12.3041L10.6959 15L16.6959 9" stroke="white"/>
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_0_323" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#55DDFF"/>
                            <stop offset="1" stop-color="#C058F3"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <span class="todo-text" data-index="${index}">${todo.text}</span>
        `;
        
        const oval = todoItem.querySelector('.oval');
        const todoText = todoItem.querySelector('.todo-text');
        const lightOval = oval.querySelector('.light-oval');
        const darkOval = oval.querySelector('.dark-oval');

        // dark 모드에 따라 oval SVG 변경
        if (document.body.classList.contains('dark')) {
            lightOval.style.display = 'none';  // light 모드 SVG 숨김
            darkOval.style.display = 'block';  // dark 모드 SVG 보임
        } else {
            lightOval.style.display = 'block';  // light 모드 SVG 보임
            darkOval.style.display = 'none';  // dark 모드 SVG 숨김
        }

        // 완료된 todo 스타일링
        if (todo.completed) {
            oval.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E3E4F1"/>
                    <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_595)"/>
                    <path d="M8 12.3041L10.6959 15L16.6959 9" stroke="white" stroke-width="2"/>
                    <defs>
                        <linearGradient id="paint0_linear_0_595" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#55DDFF"/>
                            <stop offset="1" stop-color="#C058F3"/>
                        </linearGradient>
                    </defs>
                </svg>
            `;
            todoText.style.textDecoration = 'line-through';
            todoText.style.color = '#9495A5'; // Light모드에서 체크 완료 시 텍스트 색
        }

        // Oval 클릭 시 완료/미완료 상태 변경
        oval.addEventListener('click', () => toggleComplete(index));
        
        // 텍스트 클릭 시에도 완료/미완료 상태 변경
        todoText.addEventListener('click', () => toggleComplete(index));
        
        // TODO 리스트에 추가
        todoBox.appendChild(todoItem);

        // Line 추가
        const line = document.createElement('div');
        line.className = 'line';
        todoBox.appendChild(line);
    });
    updateItemsLeft();
}


// 완료/미완료 상태 토글
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    updateTodoList();
    saveTodosToLocalStorage(); // 상태 변경 시 할 일 리스트를 로컬 스토리지에 저장
}

// 남은 todo 수 업데이트
function updateItemsLeft() {
    const remainingItems = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `${remainingItems} items left`;
}

// 필터링
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active')); // 모든 필터 버튼 비활성화
        button.classList.add('active'); // 클릭된 버튼 활성화
        const filter = button.dataset.filter;
        filterTodos(filter);
    });
});

// 필터링 함수
function filterTodos(filter) {
    todoBox.innerHTML = ''; // 기존 리스트 초기화
    let filteredTodos = [];
    if (filter === 'all') {
        filteredTodos = todos;
    } else if (filter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }
    
    filteredTodos.forEach((todo, index) => {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo';
        todoItem.innerHTML = `
            <svg class="oval" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" data-index="${index}">
                <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E3E4F1"/>
            </svg>
            <span class="todo-text" data-index="${index}">${todo.text}</span>
        `;
        
        const oval = todoItem.querySelector('.oval');
        const todoText = todoItem.querySelector('.todo-text');

        // 완료된 todo 스타일링
        if (todo.completed) {
            oval.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E3E4F1"/>
                    <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_595)"/>
                    <path d="M8 12.3041L10.6959 15L16.6959 9" stroke="white" stroke-width="2"/>
                    <defs>
                        <linearGradient id="paint0_linear_0_595" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#55DDFF"/>
                            <stop offset="1" stop-color="#C058F3"/>
                        </linearGradient>
                    </defs>
                </svg>
            `;
            todoText.style.textDecoration = 'line-through';
            todoText.style.color = '#9495A5'; // Light모드에서 체크 완료 시 텍스트 색
        }

        // Oval 클릭 시 완료/미완료 상태 변경
        oval.addEventListener('click', () => toggleComplete(index));
        
        // 텍스트 클릭 시에도 완료/미완료 상태 변경
        todoText.addEventListener('click', () => toggleComplete(index));
        
        // TODO 리스트에 추가
        todoBox.appendChild(todoItem);

        // Line 추가
        const line = document.createElement('div');
        line.className = 'line';
        todoBox.appendChild(line);
    });
    updateItemsLeft();
}

// Clear Completed 버튼 클릭 이벤트
clearCompletedButton.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    updateTodoList();
    saveTodosToLocalStorage(); // 할 일 리스트를 로컬 스토리지에 저장
});

// 로컬 스토리지에 할 일 리스트 저장
function saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 초기 로딩 시 필터 버튼 활성화
document.addEventListener('DOMContentLoaded', () => {
    const savedFilter = localStorage.getItem('filter');
    if (savedFilter) {
        filterTodos(savedFilter);
    } else {
        filterTodos('all'); // 기본적으로 모든 항목을 표시
    }
});