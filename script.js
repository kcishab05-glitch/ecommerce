const input = document.getElementById("userInput");
const submitBtn = document.getElementById("submitBtn");
const container = document.getElementById("displayContainer");

// --- STEP A: LOAD DATA WHEN PAGE OPENS ---
window.addEventListener("DOMContentLoaded", () => {
    const data = localStorage.getItem("myTodoSession");
    if (data) {
        const savedTasks = JSON.parse(data);
        savedTasks.forEach(task => {
            createTodoElement(task.text, task.completed);
        });
    }
});

// --- STEP B: SAVE DATA TO LOCAL STORAGE ---
function saveSession() {
    const tasks = [];
    document.querySelectorAll(".item").forEach(item => {
        tasks.push({
            text: item.querySelector("span").innerText,
            completed: item.querySelector(".task-checkbox").checked
        });
    });
    localStorage.setItem("myTodoSession", JSON.stringify(tasks));
}

// --- STEP C: UI ELEMENT BUILDER ---
function createTodoElement(text, isDone = false) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("item");

    const textSpan = document.createElement("span");
    textSpan.innerText = text;
    if (isDone) {
        textSpan.style.textDecoration = "line-through";
        textSpan.style.opacity = "0.5";
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isDone;
    checkbox.classList.add("task-checkbox");
    
    checkbox.addEventListener("change", () => {
        textSpan.style.textDecoration = checkbox.checked ? "line-through" : "none";
        textSpan.style.opacity = checkbox.checked ? "0.5" : "1";
        saveSession(); // Save the checkmark state
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", () => {
        newDiv.remove();
        saveSession(); // Save the deletion
    });

    newDiv.appendChild(textSpan);
    newDiv.appendChild(checkbox);
    newDiv.appendChild(deleteBtn);
    container.appendChild(newDiv);
}

submitBtn.addEventListener("click", () => {
    if (input.value.trim() === "") return;
    createTodoElement(input.value);
    saveSession(); // Save the new item
    input.value = "";
});
