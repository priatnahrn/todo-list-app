// --- Helper untuk ambil & simpan ---


function loadTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function formateDate(tanggal) {
  if (!tanggal) return "";
  const date = new Date(tanggal);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// --- Render ke UI ---
function renderTodos() {
  const list = document.getElementById("todoList"); // <ul> bisa ganti jadi <div>
  const emptyState = document.getElementById("emptyState");

  list.innerHTML = "";
  const todos = loadTodos();

  if (todos.length === 0) {
    emptyState.style.display = "block";

    const addBtn = document.querySelector(".add-todo-btn"); // ambil 1 tombol
      addBtn.addEventListener("click", () => {
      window.location.href = "pages/add-todo.html";
    });

    return;
  } else {
    emptyState.style.display = "none";
  }

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos(todos);
      renderTodos();
    });

    const group = document.createElement("div");
    group.className = "todo-group";
    
    const content = document.createElement("div");
    content.className = "todo-content";
    
    const h3 = document.createElement("h3");
    h3.className = "todo-title";
    h3.textContent = todo.title;
    
    const p = document.createElement("p");
    p.className = "todo-category";
    p.textContent = todo.category;
    
    
    const meta = document.createElement("div");
    meta.className = "todo-meta";
    
    const date = document.createElement("p");
    date.className = "todo-date";
    date.textContent = formateDate(todo.dueDate);

    
    const priority = document.createElement("p");
    priority.className = "todo-priority";
    priority.textContent = todo.priority;

    // ketika tidak ada priority, maka dihilangkan saja
    if (todo.priority === "none") {
      priority.style.display = "none";
    }
    
    group.appendChild(checkbox);
    content.appendChild(h3);
    content.appendChild(p);
    group.appendChild(content);
    li.appendChild(group);
    meta.appendChild(date);
    meta.appendChild(priority);
    li.appendChild(meta);
    list.appendChild(li);

  });

  
}

// --- Clear All ---
function clearAllTodos() {
  localStorage.removeItem("todos");
  renderTodos();
}



// --- Go to Add Page ---
function goToAddPage() {
  const btn = document.createElement("button");
  btn.className = "add-todo-btn";
  btn.textContent = "Add New Todo";
  btn.addEventListener("click", () => {
    window.location.href = "pages/add-todo.html";
  });
  
  const list = document.getElementById("todoList");
  list.appendChild(btn);

}

// --- Clock ---
function updateClock() {
  const dayEl = document.getElementById("current-day");
  const timeEl = document.getElementById("current-time");

  const now = new Date();
  dayEl.textContent = now.toLocaleDateString("en-US", { weekday: "long" });
  timeEl.textContent = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTodos();
  updateClock();
  goToAddPage();
  setInterval(updateClock, 1000);
  document.getElementById("clear-all-btn").addEventListener("click", clearAllTodos);
  
});



