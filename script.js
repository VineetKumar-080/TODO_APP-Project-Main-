document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById('inputBox');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    let editTodo = null;

    const addTodo = () => {
        const inputText = inputBox.value.trim();
        if (inputText.length <= 0) {
            alert("You must write something in your to-do list!");
            return false;
        }

        if (addBtn.value === "Edit") {
            editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
            editTodo.target.previousElementSibling.innerHTML = inputText;
            addBtn.value = "Add";
            inputBox.value = "";
        } else {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = inputText;
            li.appendChild(p);

            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
            inputBox.value = "";

            saveLocalTodos(inputText);
        }
    };

    const updateTodo = (e) => {
        if (e.target.classList.contains("deleteBtn")) {
            const todo = e.target.parentElement;
            deleteLocalTodos(todo);
            todo.remove();
        }

        if (e.target.classList.contains("editBtn")) {
            inputBox.value = e.target.previousElementSibling.innerHTML;
            inputBox.focus();
            addBtn.value = "Edit";
            editTodo = e;
        }
    };

    const saveLocalTodos = (todo) => {
        let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const getLocalTodos = () => {
        let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
        todos.forEach(todo => {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);

            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    };

    const deleteLocalTodos = (todo) => {
        let todos = JSON.parse(localStorage.getItem("todos"));
        const todoText = todo.children[0].innerHTML;
        todos = todos.filter(t => t !== todoText);
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const editLocalTodos = (oldTodo) => {
        let todos = JSON.parse(localStorage.getItem("todos"));
        const todoIndex = todos.indexOf(oldTodo);
        todos[todoIndex] = inputBox.value;
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    addBtn.addEventListener('click', addTodo);
    todoList.addEventListener('click', updateTodo);
    getLocalTodos();
});
