const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const saveButton = document.getElementById('save-button');
const loadButton = document.getElementById('load-button');
const list = document.getElementById('todo-list');

addButton.addEventListener('click', () => {
    const text = input.value.trim();

    if (text) {
        const item = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            item.classList.toggle('done', checkbox.checked);
        });
        item.appendChild(checkbox);
        const label = document.createElement('label');
        label.textContent = text;
        item.appendChild(label);
        list.appendChild(item);
        input.value = '';
        saveButton.classList.add('red');
    }
});

saveButton.addEventListener('click', () => {
    const todo = [];
    const done = [];

    list.querySelectorAll('li').forEach((item) => {
        const text = item.querySelector('label').textContent;
        const checked = item.querySelector('input').checked;

        if (checked) {
            done.push(text);
        } else {
            todo.push(text);
        }
    });

    const data = {todo, done};
    localStorage.setItem('todoList', JSON.stringify(data));
    document.getElementById('output').innerHTML += '<p>Press Crtl+S to save commit your todo list</p>';
    saveButton.classList.remove('red');
});


const socket = new WebSocket('ws://localhost:90');

loadButton.addEventListener('click', () => {
    socket.addEventListener('message', (event) => {
        const savedData = event.data;

        if (savedData) {
            const data = JSON.parse(savedData);

            data.todo.forEach((text) => {
                const item = document.createElement('li');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.addEventListener('change', () => {
                    item.classList.toggle('done', checkbox.checked);
                });
                item.appendChild(checkbox);
                const label = document.createElement('label');
                label.textContent = text;
                item.appendChild(label);
                list.appendChild(item);
            });

            data.done.forEach((text) => {
                const item = document.createElement('li');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = true;
                checkbox.addEventListener('change', () => {
                    item.classList.toggle('done', checkbox.checked);
                });
                item.appendChild(checkbox);
                const label = document.createElement('label');
                label.textContent = text;
                item.appendChild(label);
                item.classList.add('done');
                list.appendChild(item);
            });
        }
    });

    const packet = { type: 'request', user: document.getElementById('user-input').value };
    socket.send(JSON.stringify(packet));
});

document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        const savedData = localStorage.getItem('todoList');
        const packet = { type: 'post', user: document.getElementById('user-input').value, data: JSON.parse(savedData) };
        socket.send(JSON.stringify(packet));
    }
});