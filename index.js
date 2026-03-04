const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const toggleModal = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");
const addTaskButton = document.querySelector("#add-new-task");
let tasksData = {};

let dragElement = null;
const tasks = document.querySelectorAll(".task");
const columns = [todo, progress, done];

// crete/add task elemnt
function addTaskElement(title, desc, column) {
  const div = document.createElement("div");

  div.classList.add("task");
  div.setAttribute("draggable", "true");

  div.innerHTML = `<h2>${title}</h2>
              <p>${desc}</p>
              <button>Delete</button>`;
  column.appendChild(div);
  div.addEventListener("drag", (e) => {
    dragElement = div;
  });

  const deleteBtn = div.querySelector("button");
  deleteBtn.addEventListener("click", () => {
    div.remove();
    updateTasksData();
  });
  return div;
}
// crete/add task elemnt END

// Initial Local Storage
if (localStorage.getItem("Tasks")) {
  const data = JSON.parse(localStorage.getItem("Tasks"));
  console.log("data", data);
  for (const col in data) {
    console.log(col, data[col]);
    const column = document.querySelector(`#${col}`);
    data[col].forEach((task) => {
      addTaskElement(task.title, task.description, column);
    });

    const tasks = column.querySelectorAll(".task");
    const count = column.querySelector(".right");
    count.innerText = tasks.length;
  }
}
// Initial Local Storage End

tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
    // console.log("dragging", e);
    dragElement = task;
  });
});

// progress.addEventListener("dragenter", (e) => {
//   progress.classList.add("hover-over");
// });
// progress.addEventListener("dragleave", (e) => {
//   progress.classList.remove("hover-over");
// });

// Dragging Events
function addDragEventColumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });
  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  });
  // itne code likhne se kisi or jgha pr drop kr skte hai
  // drop krne  me help krega
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  column.addEventListener("drop", (e) => {
    e.preventDefault();
    // console.log("droped", dragElement, column);
    column.appendChild(dragElement);
    column.classList.remove("hover-over");
    updateTasksData();
  });
}
// Dragging Events End

addDragEventColumn(todo);
addDragEventColumn(progress);
addDragEventColumn(done);

// Task Data
function updateTasksData() {
  columns.forEach((col) => {
    const task = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

    tasksData[col.id] = Array.from(task).map((t) => {
      return {
        title: t.querySelector("h2").innerText,
        description: t.querySelector("p").innerText,
      };
    });

    count.innerText = task.length;
  });

  localStorage.setItem("Tasks", JSON.stringify(tasksData));
  console.log(tasksData);
}
// Task Data End

// Modal Logic
toggleModal.addEventListener("click", () => {
  modal.classList.toggle("active");
});
modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

addTaskButton.addEventListener("click", () => {
  const taskTitle = document.querySelector("#task-title-ip").value;
  const taskDesc = document.querySelector("#task-desc-ip").value;

  addTaskElement(taskTitle, taskDesc, todo);
  updateTasksData();
  modal.classList.remove("active");
  document.querySelector("#task-title-ip").value = "";
  document.querySelector("#task-desc-ip").value = "";
});
// Modal Logic End
