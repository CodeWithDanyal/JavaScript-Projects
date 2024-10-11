let input = document.querySelector("#input");
let addBtn = document.querySelector(".addBtn");
let todoList = document.querySelector(".todoList");

let errorMsg = document.createElement("p");
errorMsg.innerText = "**Error";
errorMsg.style.color = "red";

// Load existing tasks from localStorage on page load
window.addEventListener("load", loadTasksFromLocalStorage);

// Add task when clicking the add button
addBtn.addEventListener("click", () => {
  addTask();
  input.value = "";
});

function addTask() {
  errorMsg.remove();
  let text = input.value.trim();
  
  if (text !== "") {
    let li = createTaskElement(text);
    todoList.append(li);

    // Save task to localStorage
    saveTaskToLocalStorage(text, false);
  } else {
    document.querySelector(".form").before(errorMsg);
    input.focus();
  }
}

// Create task HTML structure
function createTaskElement(taskText, isCompleted = false) {
  let li = document.createElement("li");
  let complete = document.createElement("input");
  let removeBtn = document.createElement("button");
  let para = document.createElement("p");

  complete.type = "checkbox";
  removeBtn.innerText = "X";
  removeBtn.classList.add("removeBtn");
  para.innerText = taskText;

  if (isCompleted) {
    complete.checked = true;
    para.classList.add("completed");
  }

  // Event listeners for remove and complete actions
  removeTask(removeBtn, li, taskText);
  completed(complete, para, taskText);

  li.append(complete, para, removeBtn);
  return li;
}

function removeTask(removeBtn, li, taskText) {
  removeBtn.addEventListener("click", () => {
    li.remove();
    removeTaskFromLocalStorage(taskText);
  });
}

function completed(checkBox, para, taskText) {
  checkBox.addEventListener("change", (e) => {
    if (e.target.checked) {
      para.classList.add("completed");
      updateTaskStatusInLocalStorage(taskText, true);
    } else {
      para.classList.remove("completed");
      updateTaskStatusInLocalStorage(taskText, false);
    }
  });
}

// Local Storage Functions

function saveTaskToLocalStorage(taskText, isCompleted) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: isCompleted });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatusInLocalStorage(taskText, isCompleted) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task => {
    if (task.text === taskText) {
      task.completed = isCompleted;
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    let li = createTaskElement(task.text, task.completed);
    todoList.append(li);
  });
}
