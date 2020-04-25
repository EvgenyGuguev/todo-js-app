//Selectors
const   todoInput = document.querySelector('.todo-input'),
        todoButton = document.querySelector('.todo-button'),
        todoList = document.querySelector('.todo-list'),
        filerOption = document.querySelector('.filter-todo');



//Event Listeners
document.addEventListener('DOMContentLoaded', getTodo);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filerOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event) {
    //Prevent from refreshing page
    event.preventDefault();

    //Create Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add Todo to LocalStorage
    saveLocalTodo(todoInput.value);

    //Clear Todo Input Value
    todoInput.value = '';

    //CHECK BUTTON
    const  completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //DELETE BUTTON
    const  deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    //Append to List
    todoList.appendChild(todoDiv);
}

function deleteCheck(event) {
    const target = event.target;

    //Delete Todo
    if (target.classList[0] === 'delete-btn') {
        const todo = target.parentElement;

        //Delete animation
        todo.classList.add('fall');
        removeLocalTodo(todo);
        todo.addEventListener('transitionend', (e) => {
            todo.remove();
        });
    }

    //Check Todo
    if (target.classList[0] === 'complete-btn') {
        const todo = target.parentElement;
        todo.classList.toggle('completed');
    }

}



function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}


//Save to LocalStorage
//-----------------------------------------------------------------

function saveLocalTodo(todo) {
    //CHECK
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodo() {
    //CHECK
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
        //Create Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //CHECK BUTTON
        const  completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //DELETE BUTTON
        const  deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        //Append to List
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodo(todo) {
    //CHECK
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}