// 초기 모드를 설정하기
const savedTheme = localStorage.getItem('theme');
const themeIcon = document.getElementById('themeIcon');

if (savedTheme) {
    document.body.classList.add(savedTheme);
    themeIcon.src = savedTheme === 'dark-mode' ? './asset/sunIcon.png' : './asset/moonIcon.png'; // 초기 아이콘 설정
} else {
    document.body.classList.add('light-mode');
    themeIcon.src = './asset/moonIcon.png'; // 기본 아이콘 설정
}

// 다크/라이트 모드 전환
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

// 저장된 할 일 목록 불러오기
window.addEventListener('load', () => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach((todo) => addTodoItem(todo.text, todo.completed));
    reorderTodoList(); // 로드 후 정렬 호출
    updateRemainingCount();
});

// 새로운 할 일 추가
const todoInputField = document.getElementById('todoInput');

// 엔터 키 감지
todoInputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { // 엔터 키가 눌렸을 때
        const todoText = todoInputField.value.trim();
        if (todoText) {
            addTodoItem(todoText, false);
            todoInputField.value = ''; // 입력 필드 초기화
            saveTodos(); // 로컬스토리지에 저장
        }
    }
});

// 할 일 추가 함수 (completed 인자 추가: 완료 상태를 지정)
function addTodoItem(text, completed = false) {
    const todoList = document.getElementById('todoList');
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';
    todoItem.setAttribute('draggable', true); // 드래그 가능하게 설정
    if (completed) {
        todoItem.classList.add('completed');
    }

    const checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`; // 고유한 ID 생성
    todoItem.innerHTML = `
        <div class="checkbox-container">
            <input type="checkbox" id="${checkboxId}" ${completed ? 'checked' : ''}>
            <label for="${checkboxId}"></label>
            <span class="todo-text">${text}</span>
        </div>
        <span class="delete-icon"></span>
    `;

    todoList.appendChild(todoItem);
    reorderTodoList(); // 추가 후 정렬 호출
    updateRemainingCount();

    // 체크박스 이벤트: 체크박스 상태가 변경될 때마다 완료 상태와 남은 할일 개수를 업데이트한다
    const checkbox = todoItem.querySelector(`#${checkboxId}`);
    checkbox.addEventListener('change', (e) => {
        todoItem.classList.toggle('completed', e.target.checked);
        updateRemainingCount();
        saveTodos(); // 로컬스토리지에 저장
        reorderTodoList(); // 상태 변경 후 정렬 호출
    });

    // 삭제 버튼 이벤트
    todoItem.querySelector('.delete-icon').addEventListener('click', () => {
        todoItem.remove();
        updateRemainingCount();
        saveTodos(); // 로컬스토리지에 저장
    });

    // 드래그 앤 드롭 이벤트 추가
    addDragAndDropEvents(todoItem);
}

// 남은 할일 개수 업데이트 함수
function updateRemainingCount() {
    const remainingTasks = document.querySelectorAll('.todo-item:not(.completed)').length;
    document.getElementById('remainingCount').textContent = `${remainingTasks} items left`;
}

// 필터링 기능
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

// 완료된 항목 삭제
document.getElementById('clearCompleted').addEventListener('click', () => {
    document.querySelectorAll('.todo-item.completed').forEach((item) => item.remove());
    updateRemainingCount();
    saveTodos(); // 로컬스토리지에 저장
});

// 현재 할 일 목록을 로컬스토리지에 저장
function saveTodos() {
    const todos = Array.from(document.querySelectorAll('.todo-item')).map((item) => ({
        text: item.querySelector('.todo-text').innerText,
        completed: item.classList.contains('completed'),
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 드래그 앤 드롭 기능 추가
const todoList = document.getElementById('todoList');

todoList.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('todo-item')) {
        e.target.classList.add('dragging');
    }
});

todoList.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('todo-item')) {
        e.target.classList.remove('dragging');
        saveTodos(); // 드래그 후 상태 저장
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

// 추가된 함수: 할 일 목록 정렬
function reorderTodoList() {
    const todoList = document.getElementById('todoList');
    const todoItems = Array.from(todoList.children);

    // 'completed' 클래스가 있는 항목을 먼저, 없는 항목을 나중에 정렬
    todoItems.sort((a, b) => {
        const aCompleted = a.classList.contains('completed') ? 1 : 0;
        const bCompleted = b.classList.contains('completed') ? 1 : 0;
        return bCompleted - aCompleted; // 내림차순: completed가 먼저
    });

    // 정렬된 순서대로 DOM에 다시 추가
    todoItems.forEach(item => todoList.appendChild(item));
}

// 드래그 앤 드롭 이벤트를 항목 추가 시에만 추가
function addDragAndDropEvents(todoItem) {
    // 이미 이벤트가 추가되어 있으므로 별도의 처리가 필요하지 않습니다.
    // 현재 구현에서는 리스트 전체에 이벤트를 위임하고 있습니다.
}
