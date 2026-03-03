const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

let dragElement = null;
const tasks = document.querySelectorAll(".task");
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

function addDragEventColumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    progress.classList.add("hover-over");
  });
  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    progress.classList.remove("hover-over");
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
  });
}

addDragEventColumn(todo);
addDragEventColumn(progress);
addDragEventColumn(done);
