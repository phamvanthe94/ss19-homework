let tasks = JSON.parse(localStorage.getItem(`tasks`)) || [
  {
    id: 1,
    content: "Learn Javascript Session 01",
    dueDate: "2023-04-17",
    status: "Pending",
    assignedTo: "Anh Bách",
  },
  {
    id: 2,
    content: "Learn Javascript Session 2",
    dueDate: "2023-04-17",
    status: "Pending",
    assignedTo: "Lâm th",
  },
  {
    id: 3,
    content: "Learn CSS Session 1",
    dueDate: "2023-04-17",
    status: "Pending",
    assignedTo: "Hiếu Cí ớt ớt",
  },
];

let editingId = null;

function saveToStorage() {
  localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

function renderTasks() {
  const tbody = document.getElementById(`taskList`);
  tbody.innerHTML = ``;

  tasks.forEach(function (task, index) {
    const tr = document.createElement(`tr`);
    tr.innerHTML = `
  <td>${index + 1}</td>
  <td>${task.content}</td>
  <td>${task.dueDate}</td>
  <td>${task.status}</td>
  <td>${task.assignedTo}</td>
  <td>
  <button class = "edit" onclick ="editTask(${task.id})">Sửa</button>
  <button class = "delete" onclick ="deleteTask(${task.id})">Xóa</button>
  </td>
  `;
    tbody.appendChild(tr);
  });
}

function resetForm() {
  document.getElementById(`taskForm`).reset();
  editingId = null;
}

document
  .getElementById(`taskForm`)
  .addEventListener(`submit`, function (event) {
    event.preventDefault();
    const content = document.getElementById(`content`).value.trim();
    const dueDate = document.getElementById(`dueDate`).value;
    const status = document.getElementById(`status`).value.trim();
    const assignedTo = document.getElementById(`assignedTo`).value.trim();

    if (!content || !dueDate || !status || !assignedTo) {
      alert(`Vui lòng nhập đủ thông tin!`);
      return;
    }

    if (editingId) {
      const task = tasks.find(function (t) {
        return t.id === editingId;
      });
      task.content = content;
      task.dueDate = dueDate;
      task.status = status;
      task.assignedTo = assignedTo;
    } else {
      let newTask = {
        id: Date.now(),
        content: content,
        dueDate: dueDate,
        status: status,
        assignedTo: assignedTo,
      };
      tasks.push(newTask);
    }

    saveToStorage();
    renderTasks();
    resetForm();
  });

function deleteTask(id) {
  if (confirm(` Bạn có chắc muốn xóa công việc này hay không ?`)) {
    tasks = tasks.filter(function (task) {
      return task.id !== id;
    });
    saveToStorage();
    renderTasks();
  }
}

function editTask(id) {
  let task = tasks.find(function (task) {
    return task.id === id;
  });
  document.getElementById(`content`).value = task.content;
  document.getElementById(`dueDate`).value = task.dueDate;
  document.getElementById(`status`).value = task.status;
  document.getElementById(`assignedTo`).value = task.assignedTo;
  editingId = id;
}
