const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const addTodoButton = document.getElementById('addTodo');
const clearAllButton = document.getElementById('clear-all-btn');

function updateEmptyState() {
    if (todoList.children.length === 0) {
        emptyState.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';
    }
}

addTodoButton.addEventListener('click', () => {
    // Pindah ke halaman tambah todo
    window.location.href = 'pages/add-todo.html';
});

clearAllButton.addEventListener('click', () => {
    
    // Cek apakah ada tugas yang bisa dihapus
    if (todoList.children.length === 0) {
        alert('No tasks to clear.');
        return;
    }

    // Muncul pop up konfirmasi
    if (confirm('Are you sure you want to clear all tasks?')) {
        todoList.innerHTML = '';
        // Hapus di storage jika ada
        localStorage.removeItem('todos');
        updateEmptyState();
    } else {
        // User cancelled the action
        return;
    }
});

updateEmptyState();