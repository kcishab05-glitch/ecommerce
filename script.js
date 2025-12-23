const input = document.getElementById("userInput");
const submitBtn = document.getElementById("submitBtn");
const container = document.getElementById("displayContainer");

submitBtn.addEventListener("click", () => {
    if (input.value.trim() === "") return;

    const newDiv = document.createElement("div");
    newDiv.classList.add("item");

    // 1. Create a span for the text (This is the secret!)
    const textSpan = document.createElement("span");
    textSpan.innerText = input.value;
    newDiv.appendChild(textSpan);

    // Inside your submitBtn event listener...
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    newDiv.appendChild(checkbox);

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            textSpan.style.textDecoration = "line-through";
            textSpan.style.color = "#55a630"; // Matches your green theme
            textSpan.style.opacity = "0.6";
        } else {
            textSpan.style.textDecoration = "none";
            textSpan.style.color = "black";
            textSpan.style.opacity = "1";
        }
    });

   
    // 3. Delete button logic
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.classList.add("deleteBtn");
    newDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        container.removeChild(newDiv);
    });

    container.appendChild(newDiv);
    input.value = "";
});