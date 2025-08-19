const input = document.getElementById(`todo-input`);
const addBtn = document.getElementById(`add-btn`);
const todoList = document.getElementById(`todo-list`);
const pendingTasks = document.getElementById(`pending-tasks`);
const clearBtn = document.getElementById(`clear-btn`);

var todos = JSON.parse(localStorage.getItem(`todos`)) || [];

function saveTodo() {
  localStorage.setItem(`todos`, JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = ``;
  todos.forEach(function (todo, index) {
    let li = document.createElement(`li`);
    li.textContent = todo;

    let deleteBtn = document.createElement(`button`);
    deleteBtn.textContent = "🗑️";
    deleteBtn.className = `delete-btn`;
    deleteBtn.onclick = function () {
      todos.splice(index, 1);
      saveTodo();
      renderTodos();
    };
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
  pendingTasks.textContent = `You have ${todos.length} pending tasks`;
}

addBtn.onclick = function () {
  let task = input.value.trim();
  if (task) {
    todos.push(task);
    input.value = ``;
    saveTodo();
    renderTodos();
  }
};

clearBtn.onclick = function () {
  todos = [];
  saveTodo();
  renderTodos();
};

window.onload = function () {
  renderTodos();
};
