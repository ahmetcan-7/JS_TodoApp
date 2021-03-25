const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

function addTodo(event) {

    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoList.appendChild(todoDiv);

    const todoLi = document.createElement("li");
    todoLi.classList.add("todo-item");
    todoLi.innerText = todoInput.value;
    todoDiv.appendChild(todoLi);

    saveLocalTodos(todoInput.value);

    const checkedBtn = document.createElement("button");
    checkedBtn.classList.add("checked-btn");
    checkedBtn.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(checkedBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deleteBtn);


    todoInput.value = "";

}

function deleteCheck(e) {
    const item = e.target;


    if (item.classList[0] === "delete-btn") {

        const todo = item.parentElement;


        todo.classList.add("fall");
        //delete local.stroge
        deleteLocalTodo(todo);
        deleteLocalChecked(todo.innerText);

        todo.addEventListener("transitionend", () => {
            todo.remove();
        });

    }



    if (item.classList[0] === "checked-btn") {

        const todo = item.parentElement;
        todo.classList.toggle("completed");
        const completedText = item.parentElement.firstChild.innerText;

        if (todo.classList.contains("completed")) {

            saveLocalChecked(completedText);
        } else {
            changeLocalChecked(completedText);
        }
    }
}

function filterTodo(e) {
    const todos = todoList.children;


    for (var i = 0; i < todos.length; i++) {
        switch (e.target.value) {
            case "all":
                todos[i].style.display = "flex";
                break;
            case "completed":
                if (todos[i].classList.contains("completed")) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todos[i].classList.contains("completed")) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }
                break;

        }
    }

}


function saveLocalTodos(todo) {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function saveLocalChecked(text) {
    let input;

    if (localStorage.getItem("input") === null) {
        input = [];
    } else {
        input = JSON.parse(localStorage.getItem("input"));
    }

    input.push(text);
    localStorage.setItem("input", JSON.stringify(input));

}

function changeLocalChecked(text) {
    let inputs = JSON.parse(localStorage.getItem("input"));

    const checked = inputs.filter((input) => {
        return input != text;
    })


    localStorage.setItem("input", JSON.stringify(checked));


}

function getTodos() {
    let todos;
    let checkedInputs = JSON.parse(localStorage.getItem("input"));
    let childs = todoList.childNodes;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoList.appendChild(todoDiv);

        const todoLi = document.createElement("li");
        todoLi.classList.add("todo-item");
        todoLi.innerText = todo;
        todoDiv.appendChild(todoLi);

        const checkedBtn = document.createElement("button");
        checkedBtn.classList.add("checked-btn");
        checkedBtn.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(checkedBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(deleteBtn);

    });


    childs.forEach((child) => {

        for (i = 0; i < checkedInputs.length; i++) {
            if (checkedInputs[i] == child.innerText) {
                child.classList.add("completed");
            }
        }

    });


}

function deleteLocalTodo(todo) {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteLocalChecked(todo) {
    let input;

    if (localStorage.getItem("input") === null) {
        input = [];
    } else {
        input = JSON.parse(localStorage.getItem("input"));
    }



    if (input.includes(todo)) {
        console.log(input.indexOf(todo));
        input.splice(input.indexOf(todo), 1);
    }

    localStorage.setItem("input", JSON.stringify(input));
}
