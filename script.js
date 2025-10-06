let todoArray = [];
const text = document.getElementById("text");
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

// ✅ Allow pressing Enter to add a task
text.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTaskButton.click();
  }
});

addTaskButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevents reload

  // Get todos from localStorage
  let todo = localStorage.getItem("todo");

  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }

  // Check if input is empty
  if (text.value.trim() === "") {
    alert("Please enter a todo before adding!");
    return;
  }

  // Add new todo
  todoArray.push(text.value.trim());
  text.value = "";

  // Save to localStorage
  localStorage.setItem("todo", JSON.stringify(todoArray));

  // Refresh display
  displayTodo();
});

// ✅ Display todos on page load
window.addEventListener("load", displayTodo);

function displayTodo() {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }

  let htmlCode = "";
  todoArray.forEach((list, ind) => {
    htmlCode += `<div class='flex mb-4 items-center'>
          <p class='w-full text-white font-bold'>${list}</p>
          <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 rounded text-white bg-green-600'>Edit</button>
          <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 rounded text-white bg-red-500'>Delete</button>
       </div>`;
  });
  listBox.innerHTML = htmlCode;
}

// ✅ Delete todo
function deleteTodo(index) {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  todoArray.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
}


function edit(index) {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  text.value = todoArray[index];
  saveInd.value = index;
  addTaskButton.style.display = "none";
  saveTaskButton.style.display = "block";
}


saveTaskButton.addEventListener("click", () => {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  let id = saveInd.value;

  if (text.value.trim() === "") {
    alert("Please enter something to save!");
    return;
  }

  todoArray[id] = text.value.trim();
  localStorage.setItem("todo", JSON.stringify(todoArray));
  text.value = "";
  addTaskButton.style.display = "block";
  saveTaskButton.style.display = "none";
  displayTodo();
});
