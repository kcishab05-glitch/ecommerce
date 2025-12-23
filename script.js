const input = document.getElementById("userInput");
const submitBtn = document.getElementById("submitBtn");
const container = document.getElementById("displayContainer");

// --- NEW: Load saved todos from this browser's memory on startup ---
window.addEventListener("load", () => {
    const savedTodos = JSON.parse(localStorage.getItem("myPrivateTodos")) || [];
    savedTodos.forEach(todo => {
        createTodoElement(todo.text, todo.completed);
    });
});

// --- NEW: Function to save the current state to localStorage ---
function saveToLocalStorage() {
    const todos = [];
    document.querySelectorAll(".item").forEach(item => {
        todos.push({
            text: item.querySelector("span").innerText,
            completed: item.querySelector(".task-checkbox").checked
        });
    });
    localStorage.setItem("myPrivateTodos", JSON.stringify(todos));
}

// Function to build the UI element (Logic moved here to reuse for loading)
function createTodoElement(text, isCompleted = false) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("item");

    const textSpan = document.createElement("span");
    textSpan.innerText = text;
    if (isCompleted) {
        textSpan.style.textDecoration = "line-through";
        textSpan.style.color = "#55a630";
        textSpan.style.opacity = "0.6";
    }
    newDiv.appendChild(textSpan);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;
    checkbox.classList.add("task-checkbox");
    newDiv.appendChild(checkbox);

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            textSpan.style.textDecoration = "line-through";
            textSpan.style.color = "#55a630";
            textSpan.style.opacity = "0.6";
        } else {
            textSpan.style.textDecoration = "none";
            textSpan.style.color = "black";
            textSpan.style.opacity = "1";
        }
        saveToLocalStorage(); // Save change
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.classList.add("deleteBtn");
    newDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        container.removeChild(newDiv);
        saveToLocalStorage(); // Save change
    });

    container.appendChild(newDiv);
}

submitBtn.addEventListener("click", () => {
    if (input.value.trim() === "") return;
    
    createTodoElement(input.value);
    saveToLocalStorage(); // Save the new todo
    input.value = "";
});
    
