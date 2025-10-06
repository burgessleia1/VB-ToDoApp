const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

let todos = [];

addBtn.addEventListener("click", addTodo);

function addTodo() {
  const text = input.value.trim();
  if (text === "") return;
  const todo = { text, done: false };
  todos.push(todo);
  input.value = "";
  renderTodos();
}

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${todo.done ? "done" : ""}" onclick="toggleDone(${index})">${
      todo.text
    }</span>
      <div>
        <button onclick="editTodo(${index})">Edit</button>
        <button onclick="deleteTodo(${index})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function toggleDone(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function editTodo(index) {
  const newText = prompt("Edit task:", todos[index].text);
  if (newText !== null && newText.trim() !== "") {
    todos[index].text = newText.trim();
    renderTodos();
  }
}
