// Selectinf Dom Elements
let container = document.querySelector(".container");
let titleBox = document.querySelector("#headingBox");
let noteBox = document.querySelector("#detailBox");
let dateBox = document.querySelector(".dateBox");
let addBtn = document.querySelector(".addBtn");
let resetBtn = document.querySelector(".removeBtn");

// Date Object
let date = new Date().toDateString();
dateBox.textContent = date;

// Funtion to Add Task
function addTask(title, notes) {
  let section = document.createElement("section");
  let titleBox = document.createElement("textarea");
  let dateBox = document.createElement("p");
  let noteBox = document.createElement("textarea");
  let lineBreak = document.createElement("hr");
  let editBtn = document.createElement("button");
  let deleteBtn = document.createElement("button");

  titleBox.value = title;
  dateBox.textContent = date;
  noteBox.value = notes;
  editBtn.innerText = "✏";
  deleteBtn.innerText = "☠";

  setAttributes(titleBox, noteBox, lineBreak);

  applyingClassList(
    section,
    titleBox,
    dateBox,
    noteBox,
    editBtn,
    deleteBtn,
    lineBreak
  );

  container.appendChild(section);
  section.append(titleBox, dateBox, lineBreak, noteBox, editBtn, deleteBtn);

  deleteTask(deleteBtn, section);
}

// Adding ClassList to Elements
function applyingClassList(
  section,
  titleBox,
  dateBox,
  noteBox,
  editBtn,
  deleteBtn,
  lineBreak
) {
  section.classList.add("taskContainer");
  section.style.backgroundColor = getRandomColor();
  titleBox.classList.add("titleBox");
  dateBox.classList.add("dateStyle");
  noteBox.classList.add("noteBox");
  editBtn.classList.add("button");
  deleteBtn.classList.add("button");
  lineBreak.classList.add("hr");
}

// Adding Attributes
function setAttributes(titleBox, noteBox, lineBreak) {
  titleBox.setAttribute("disabled", "true");
  titleBox.setAttribute("rows", "3");
  titleBox.setAttribute("cols", "10");
  noteBox.setAttribute("disabled", "true");
  noteBox.setAttribute("rows", "10");
  noteBox.setAttribute("cols", "20");
  lineBreak.setAttribute("class", "lineBreak");
}

// Event on Add button to Add the task
addBtn.addEventListener("click", () => {
  let getTitle = titleBox.value;
  let getNote = noteBox.value;

  if (getTitle.length && getNote.length) {
    addTask(getTitle.trim(), getNote.trim());
    titleBox.value = "";
    noteBox.value = "";
  } else {
    console.log("Error input Boxs are empty");
  }
});

// Event on Reset Button to reset inputs
resetBtn.addEventListener("click", () => {
  titleBox.value = "";
  noteBox.value = "";
});

// Function to Delete Task
function deleteTask(btn, element) {
  btn.addEventListener("click", () => element.remove());
}

// Random color for Task Container
function getRandomColor() {
  let colorvalue = ["#39ed69", "#f26659", "#69a0f8"];
  let randomIndex = Math.floor(Math.random() * 3);
  return colorvalue[randomIndex];
}
