
function addNewTodo(event){
    // untuk mencegah form submit dijalankan
    if(event){
        event.preventDefault();
    }

    // mengambil data dari form
    const taskTitleInput = document.getElementById('task-title');
    const categorySelect = document.getElementById('category');
    const taskDescInput = document.getElementById('task-desc');
    const dueDateInput = document.getElementById('due-date');
    const prioritySelect = document.getElementById('priority');
    const reminderInput = document.getElementById('reminder');
    const notesInput = document.getElementById('notes');

    // mengambil nilai dari form
    const taskTitle = taskTitleInput.value;
    const category = categorySelect.value;
    const taskDesc = taskDescInput.value;
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;
    const reminder = reminderInput.value;
    const notes = notesInput.value;

    // validasi data
    if (!taskTitle || !category || !taskDesc) {
        alert('Please fill in all required fields.');
        return;
    }

    // membuat objek todo baru
    const newTodo = {
        id: Date.now(),
        title: taskTitle,
        category: category,
        description: taskDesc,
        dueDate: dueDate,
        priority: priority,
        reminder: reminder,
        notes: notes
    };
    
    // simpan ke local storage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));

    // kembali ke halaman utama
    window.location.href = '/index.html';
}

// tambah listener ke form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', addNewTodo);
});
