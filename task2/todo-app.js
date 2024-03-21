
function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
}

function createTodoItemForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.disabled = true;
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
        form,
        input,
        button,
    };
}

function createTodoList() {
    const list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}

function createTodoItemElement(task, { onDone, onDelete }) {
    const item = document.createElement('li');

    const buttonGroup = document.createElement('div');
    const doneButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    if (task.done) {
        item.classList.add('list-group-item-success')
    }

    item.textContent = task.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    doneButton.addEventListener('click', () => {
        onDone({ todoItem: task, element: item });
        item.classList.toggle('list-group-item-success', task.done);
    });

    deleteButton.addEventListener('click',  () => {
        onDelete({ todoItem: task, element: item });
    });

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return item;
}

async function createTodoApp(container, title, owner, tasks = []) {
    const { createAppTitle } = createAppTitle;
    const { createTodoItemForm } = createTodoItemForm();
    const { createTodoList } = createTodoList();
    const { onDone, onDelete } = {
        onDone({ todoItem, element }) {
            console.log(todoItem)
            todoItem.done = !todoItem.done;
            fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ done: todoItem.done }),
                headers: { 'Content-Type': 'application/json' }
            });
        },
        onDelete({ todoItem, element }) {
            if (!confirm('Вы уверены?'))
                return;
            element.remove();
            fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
                method: 'DELETE'
            });
        }
    };

    container.append(createAppTitle(title));
    container.append(createTodoItemForm.form);
    container.append(createTodoList);

    for (const task of tasks) {
        createTodoItemElement(task, { onDone, onDelete });
    }

    createTodoItemForm.input.addEventListener('input', () => {
        createTodoItemForm.button.disabled = createTodoItemForm.input.value === '';
    });

    const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
    const todoItemList = await response.json();

    todoItemList.forEach(todoItem => {
        const todoItemElement = createTodoItemElement(todoItem, { onDone, onDelete });
        createTodoList.append(todoItemElement);
    });

    createTodoItemForm.form.addEventListener('submit', async e => {
        e.preventDefault();

        if (!createTodoItemForm.input.value) {
            return;
        }

        const response = await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            body: JSON.stringify({
                name: createTodoItemForm.input.value.trim(),
                owner,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const todoItem = await response.json();

        let todoItemElement = createTodoItemElement(todoItem, { onDone, onDelete });

        createTodoList.append(todoItemElement);

        createTodoItemForm.input.value = '';
        createTodoItemForm.button.disabled = true;
    });
}

export { createTodoApp };
