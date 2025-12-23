const input = document.getElementById("userInput");
const submitBtn = document.getElementById("submitBtn");
const container = document.getElementById("displayContainer");

// 1. LOAD: Runs every time the page is opened or refreshed
window.addEventListener("DOMContentLoaded", () => {
    const rawData = localStorage.getItem("myPrivateTodos");
    if (rawData) {
        const savedTodos = JSON.parse(rawData);
        savedTodos.forEach(todo => {
            createTodoElement(todo.text, todo.completed);
        });
    }
});

// 2. SAVE: Converts the list on screen into a text string for the browser memory
function saveToLocalStorage() {
    const todos = [];
    document.querySelectorAll(".item").forEach(item => {
        const text = item.querySelector("span").innerText;
        const isDone = item.querySelector(".task-checkbox").checked;
        todos.push({ text: text, completed: isDone });
    });
    localStorage.setItem("myPrivateTodos", JSON.stringify(todos));
}

// 3. UI BUILDER: Creates the HTML for each todo
function createTodoElement(text, isCompleted = false) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("item");

    const textSpan = document.createElement("span");
    textSpan.innerText = text;
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;
    checkbox.classList.add("task-checkbox");

    // Apply styles if the task was already completed
    if (isCompleted) {
        textSpan.style.textDecoration = "line-through";
        textSpan.style.opacity = "0.6";
    }

    checkbox.addEventListener("change", () => {
        textSpan.style.textDecoration = checkbox.checked ? "line-through" : "none";
        textSpan.style.opacity = checkbox.checked ? "0.6" : "1";
        saveToLocalStorage(); 
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", () => {
        newDiv.remove();
        saveToLocalStorage();
    });

    newDiv.appendChild(textSpan);
    newDiv.appendChild(checkbox);
    newDiv.appendChild(deleteBtn);
    container.appendChild(newDiv);
}

// 4. INTERACTION: When user clicks Submit
submitBtn.addEventListener("click", () => {
    if (input.value.trim() === "") return;
    createTodoElement(input.value);
    saveToLocalStorage(); 
    input.value = "";
});
