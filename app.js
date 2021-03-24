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
    console.log(item.classList)

    if (item.classList[0] === "delete-btn") {

        const todo = item.parentElement;
        todo.classList.add("fall");
        //delete local.stroge
        deleteTodo(todo);

        todo.addEventListener("transitionend", () => {
            todo.remove();
        });

    }



    if (item.classList[0] === "checked-btn") {

        const todo = item.parentElement;
        todo.classList.toggle("completed");
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


function getTodos() {
    let todos;

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


}

function deleteTodo(todo) {
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




