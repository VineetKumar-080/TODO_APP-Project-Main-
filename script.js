const inputBox = document.getElementById('inputBox')
const addButton = document.getElementById('addButton')
const todolist = document.getElementById('todoList')

let edit_Todo = null;


// Function to add TODO
const addTodo = () => {
    const inputText = inputBox.value.trim();

    //trim(): removes extra spaces from the start and end of the input.

    if(inputText.length <= 0){
        alert("Please write something in your TODO")
        return false;
    }

    if(addButton.value === "Edit"){
        edit_Todo.target.previousElementSibling.innerHTML = inputText;
        editLocalTodo(inputText)
        addButton.value = "Add"
        inputBox.value = ""
    }
    else{



    // creating p tag
    const li = document.createElement("li")
    const p = document.createElement("p")
    p.innerHTML = inputText;
    li.appendChild(p);
    
    // Creating edit button
    const editButton = document.createElement("button");
    editButton.innerText="Edit";
    editButton.classList.add("button", "editButton")
    li.appendChild(editButton);


    
    // Creating delete button    
    const deleteButton = document.createElement("button");
    deleteButton.innerText="Remove";
    deleteButton.classList.add("button","deleteButton")
    li.appendChild(deleteButton);
    
    todolist.appendChild(li);
    inputBox.value = "";

    saveLocalTodo(inputText);
    
    }
}
 

// Function to update (Edit/Delete) TODO
const updateTodo = (e) => {
    // console.log(e.target.innerHTML);

    if(e.target.innerHTML === "Remove"){
        todolist.removeChild(e.target.parentElement);
        deleteLocalTodo(e.target.parentElement)
    }
    
    if(e.target.innerHTML === "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addButton.value = "Edit"
        edit_Todo = e;
    }
}

//Function to save local todo
const saveLocalTodo = (todo) => {
    let todos = [];
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
    
}

// Function to get local todo
const getLocalTodo = (todo) => {
    let todos = [];
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
        todos.forEach(todo => {
            const li = document.createElement("li")
            const p = document.createElement("p")
            p.innerHTML = todo;
            li.appendChild(p);
            
            // Creating edit button
            const editButton = document.createElement("button");
            editButton.innerText="Edit";
            editButton.classList.add("button", "editButton")
            li.appendChild(editButton);
        
        
            
            // Creating delete button    
            const deleteButton = document.createElement("button");
            deleteButton.innerText="Remove";
            deleteButton.classList.add("button","deleteButton")
            li.appendChild(deleteButton);
            
            todolist.appendChild(li);
        });
    }
}


// Function to delete local todo
const deleteLocalTodo = ()=>{
    let todos = [];
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    let todoText = todos.childre[0].innerHTML;
    let todoIndex = todos.indexof(todoText)
    
    // We are using splice operations
    todos.splice(todoIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos)) 
}


// Function to edit todo
 const editLocalTodo = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexof(todo)
    todos[todoIndex] = inputBox.value
    localStorage.setItem("todos", JSON.st(todos))
 }


document.addEventListener('DOMContentLoaded',getLocalTodo); 



addButton.addEventListener('click', addTodo);
todolist.addEventListener('click',updateTodo)  