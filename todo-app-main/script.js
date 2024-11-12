// sun, moon, background-dark, background-light 요소를 선택합니다.
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');
const backgroundDark = document.querySelector('.background-dark');
const backgroundLight = document.querySelector('.background-light');
const body = document.body;
const main_container = document.querySelector('.main-container');
const input_container = document.querySelector('.input-container');
const circle= document.querySelector('.circle');
// 예를 들어, sun 클릭 이벤트 내부에서 수정:
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
});

// moon 클릭 이벤트에서도 동일하게 적용
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
});













// Create a new todo-container structure in JavaScript
// Create a new todo-container structure in JavaScript
const inputText = document.querySelector('.input-text');
const mainContainer = document.querySelector('.main-container');
const inputContainer = document.querySelector('.input-container');
const bottomContainer = document.querySelector('.bottom-container');

inputText.addEventListener('click', () => {
    inputText.style.display = 'none';

    // Create an input field
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'dynamic-input';
    inputField.placeholder = 'Create a new todo...';

    // Append the input field to the input-container
    inputContainer.appendChild(inputField);
    inputField.focus();

    // Handle the Enter key press
    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const text = inputField.value.trim();

            if (text) {
                // Create a new todo-container
                const todoContainer = document.createElement('div');
                todoContainer.className = 'todo-container';

                const todoItem = document.createElement('div');
                todoItem.className = 'todo-item';

                const ovalContainer = document.createElement('div');
                ovalContainer.className = 'oval-container';

                const oval = document.createElement('div');
                oval.className = 'oval';
                oval.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <circle class="circle" cx="12" cy="12" r="12"></circle>
                    </svg>
                `;

                const ovalHover = document.createElement('div');
                ovalHover.className = 'oval-hover';
                ovalHover.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <circle cx="12" cy="12" r="11.5" fill="white" stroke="url(#paint0_linear_0_490)"/>
                        <g opacity="0.01">
                            <circle cx="12" cy="12" r="12" stroke="url(#paint1_linear_0_490)"/>
                            <path d="M8 12.3041L10.6959 15L16.6959 9" stroke="white"/>
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_0_490" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#55DDFF"/>
                                <stop offset="1" stop-color="#C058F3"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_0_490" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#55DDFF"/>
                                <stop offset="1" stop-color="#C058F3"/>
                            </linearGradient>
                        </defs>
                    </svg>
                `;

                const ovalCheck = document.createElement('div');
                ovalCheck.className = 'oval-check';
                ovalCheck.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E3E4F1"/>
                        <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_479)"/>
                        <path d="M8 12.3041L10.6959 15L16.6959 9" stroke="white" stroke-width="2"/>
                        <defs>
                            <linearGradient id="paint0_linear_0_479" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#55DDFF"/>
                                <stop offset="1" stop-color="#C058F3"/>
                            </linearGradient>
                        </defs>
                    </svg>
                `;

                // Add event listener to toggle between oval and oval-check
                ovalContainer.addEventListener('click', () => {
                    if (ovalCheck.classList.contains('active')) {
                        ovalCheck.classList.remove('active');
                        oval.style.display = 'block';
                    } else {
                        ovalCheck.classList.add('active');
                        oval.style.display = 'none';
                    }
                });

                ovalContainer.appendChild(oval);
                ovalContainer.appendChild(ovalHover);
                ovalContainer.appendChild(ovalCheck);
                todoItem.appendChild(ovalContainer);

                const todoText = document.createElement('div');
                todoText.className = 'todo-text';
                todoText.textContent = text;

                const crossLine = document.createElement('div');
                crossLine.className = 'cross-line';
                crossLine.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                        <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"></path>
                    </svg>
                `;

                // Add functionality to remove the todo item
                crossLine.addEventListener('click', () => {
                    mainContainer.removeChild(todoContainer);
                });

                todoItem.appendChild(todoText);
                todoItem.appendChild(crossLine);
                todoContainer.appendChild(todoItem);

                // Add a line element
                const line = document.createElement('div');
                line.className = 'line';
                todoContainer.appendChild(line);

                // Insert the todo-container before the bottomContainer
                mainContainer.insertBefore(todoContainer, bottomContainer);
            }

            // Remove the input field
            inputContainer.removeChild(inputField);
            inputText.style.display = 'block';
        }
    });

    // Remove the input field on focusout
    inputField.addEventListener('focusout', () => {
        inputContainer.removeChild(inputField);
        inputText.style.display = 'block';
    });
});



document.querySelectorAll('.oval-container').forEach((container) => {
    const oval = container.querySelector('.oval');
    const ovalCheck = container.querySelector('.oval-check');
    const ovalHover = container.querySelector('.oval-hover');

    container.addEventListener('click', () => {
        if (ovalCheck.classList.contains('active')) {
            ovalCheck.classList.remove('active');
            oval.style.display = 'block';
            ovalHover.style.display = 'none';
        } else {
            ovalCheck.classList.add('active');
            oval.style.display = 'none';
            ovalHover.style.display = 'none';
        }
    });
});
