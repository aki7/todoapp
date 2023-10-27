// DOM elements
const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector(".todos");
const totalTasks = document.querySelector("#total-tasks");
const remainingTasks = document.querySelector("#remaining-tasks");
const completedTasks = document.querySelector("#completed-tasks");
const mainInput = document.querySelector("#todo-form input");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = mainInput.value;

  if (inputValue == "") {
    return;
  }

  const task = {
    id: new Date().getTime(),
    name: inputValue,
    isCompleted: false,
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  createTask(task);
});

function createTask(task) {
  const taskEl = document.createElement("li");

  taskEl.setAttribute("id", task.id);

  if (task.isCompleted) {
    taskEl.classList.add("complete");
  }

  const taskElMarkup = `
    <div>
    <input type="checkbox" name="tasks" id="${task.id}" ${
    task.isCompleted ? "checked" : ""
  }>
    <span ${!task.isCompleted ? "contenteditable" : ""}>${task.name}</span>
    </div>
    <button title="Remove the "${task.name}" task"
    class="remove-task">
    <svg viewBox="0 0 24 24" fill="none">
    <path d="M17.25 17.25L6.75 6.75" stroke="#A4D0E3"
    stroke-width="1.5" stroke-linecap="round"
    stroke-linejoin="round"/>
    <path d="M17.25 6.75L6.75 17.25" stroke="#A4D0E3"
    stroke-width="1.5" stroke-linecap="round"
    stroke-linejoin="round"/>
    </svg>
    </button>
    `;

  taskEl.innerHTML = taskElMarkup;

  todoList.appendChild(taskEl);
}
