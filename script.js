// I have created an js class named Task
class Task {
    constructor(name, description, dueDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = false;
    }
}

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];// used an array to store the tasks
let currentTaskIndex = null;
// I have created nearly 8 elements
const taskname = document.getElementById('taskname');
const taskdesc = document.getElementById('taskdesc');
const taskdue = document.getElementById('taskdue');
const tasklist = document.getElementById('tasklist');
const addtask = document.getElementById('addtask');
const edittask = document.getElementById('edittask');
const search = document.getElementById('search');
const filterselect = document.getElementById('filterselect');

// Render tasks to the front-end page
const renderTasks = () => {
    tasklist.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (filterselect.value === 'completed tasks') return task.completed;
        if (filterselect.value === 'pending tasks') return !task.completed;
        return true; // For "all tasks"
    }).filter(task => task.name.toLowerCase().includes(search.value.toLowerCase()));

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <div>
                <strong>${task.name}</strong> <br>
                <span>${task.description}</span> <br>
                <span>Due: ${task.dueDate}</span> <br>
                <span>Status: ${task.completed ? 'Completed' : 'Pending'}</span>
            </div>
            <div>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleTaskStatus(${index})">${task.completed ? 'Mark as Pending' : 'Mark as Completed'}</button>
            </div>
        `;
        tasklist.appendChild(li);
    });
};

// Add a new task
const addTask = () => {
    const name = taskname.value.trim();
    const description = taskdesc.value.trim();
    const dueDate = taskdue.value;

    if (name === '' || description === '' || dueDate === '') {
        alert('Please fill in all fields.');
        return;
    }

    const newTask = new Task(name, description, dueDate);
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    clearInputs();
};

// Edit an existing task
const editTask = (index) => {
    currentTaskIndex = index;
    const task = tasks[index];
    taskname.value = task.name;
    taskdesc.value = task.description;
    taskdue.value = task.dueDate;
    addtask.style.display = 'none';
    edittask.style.display = 'block';
};

// Update the task
const updateTask = () => {
    const name = taskname.value.trim();
    const description = taskdesc.value.trim();
    const dueDate = taskdue.value;

    if (name === '' || description === '' || dueDate === '') {
        alert('Please fill all the fields.');
        return;
    }

    tasks[currentTaskIndex] = new Task(name, description, dueDate);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    clearInputs();
    addtask.style.display = 'block';
    edittask.style.display = 'none';
};

// Delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
};

// Toggle task status
const toggleTaskStatus = (index) => {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
};

// Clear input fields
const clearInputs = () => {
    taskname.value = '';
    taskdesc.value = '';
    taskdue.value = '';
};

// I have addes 4 Event listeners
addtask.addEventListener('click', addTask);
edittask.addEventListener('click', updateTask);
search.addEventListener('input', renderTasks);
filterselect.addEventListener('change', renderTasks);
renderTasks();