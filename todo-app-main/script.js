// sun, moon, background-dark, background-light 요소를 선택합니다.
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');
const backgroundDark = document.querySelector('.background-dark');
const backgroundLight = document.querySelector('.background-light');
const body = document.body;
const main_container = document.querySelector('.main-container');
const input_container = document.querySelector('.input-container');
const circle= document.querySelector('.circle');
const lines = document.querySelectorAll('.line');

// sun을 클릭했을 때 이벤트
sun.addEventListener('click', () => {
    sun.style.display = 'none'; // sun 숨김
    moon.style.display = 'block'; // moon 표시

    backgroundDark.style.display = 'none'; // dark 배경 숨김
    backgroundLight.style.display = 'block'; // light 배경 표시
    body.style.backgroundColor = '#fafafa'; // 배경색을 밝은 색으로 변경
    main_container.style.backgroundColor = '#ffffff';
    input_container.style.backgroundColor = '#ffffff';
    circle.setAttribute('stroke', '#E3E4F1'); // stroke 속성 변경
    circle.setAttribute('fill', '#ffffff'); // 배경색 변경
    line.style.backgroundColor = '#E3E4F1';
});

// moon을 클릭했을 때 이벤트
moon.addEventListener('click', () => {
    moon.style.display = 'none'; // moon 숨김
    sun.style.display = 'block'; // sun 표시
    backgroundLight.style.display = 'none'; // light 배경 숨김
    backgroundDark.style.display = 'block'; // dark 배경 표시
    body.style.backgroundColor = '#171823'; // 배경색을 어두운 색으로 변경
    main_container.style.backgroundColor = '#25273D';
    input_container.style.backgroundColor = '#25273D';
    circle.setAttribute('stroke', '#393A4B'); // stroke 속성 변경
    circle.setAttribute('fill', 'none'); // 배경색 투명
    line.style.backgroundColor = '#393A4B;';
});

















const inputText = document.querySelector('.input-text');
const mainContainer = document.querySelector('.main-container');
const inputContainer = document.querySelector('.input-container');
const bottomContainer = document.querySelector('.bottom-container');

inputText.addEventListener('click', () => {
    inputText.style.display = 'none';

    // <input> 필드 생성
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'dynamic-input';
    inputField.placeholder = 'Create a new todo...';

    // input-container에 <input> 필드 추가
    inputContainer.appendChild(inputField);
    inputField.focus();

    // 엔터키 입력 처리
    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const text = inputField.value.trim();

            if (text && mainContainer.querySelectorAll('.todo-container').length < 6) {
                // 새로운 todo-container 생성
                const todoContainer = document.createElement('div');
                todoContainer.className = 'todo-container';

                const todoItem = document.createElement('div');
                todoItem.className = 'todo-item';

                const oval = document.createElement('div');
                oval.className = 'oval';

                // SVG와 circle 요소 생성
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('width', '25');
                svg.setAttribute('height', '24');
                svg.setAttribute('viewBox', '0 0 25 24');
                svg.setAttribute('fill', 'none');

                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', '12');
                circle.setAttribute('cy', '12');
                circle.setAttribute('r', '12');
                circle.classList.add('circle'); // 클래스 추가

                svg.appendChild(circle);
                oval.appendChild(svg);

                const todoText = document.createElement('div');
                todoText.className = 'todo-text';
                todoText.textContent = text;

                todoItem.appendChild(oval);
                todoItem.appendChild(todoText);
                todoContainer.appendChild(todoItem);

                // 하단에 라인 추가
                const line = document.createElement('div');
                line.className = 'line';
                todoContainer.appendChild(line);

                // main-container에 bottom-container 바로 앞에 todo-container 추가
                mainContainer.insertBefore(todoContainer, bottomContainer);
            }

            // 입력 필드 제거
            inputContainer.removeChild(inputField);
            inputText.style.display = 'block';
        }
    });

    // focusout 이벤트를 추가하여 외부 클릭 시 <input> 제거
    inputField.addEventListener('focusout', () => {
        inputContainer.removeChild(inputField);
        inputText.style.display = 'block';
    });
});