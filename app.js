import swal from 'sweetalert';

// Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");


// Load eventListeners
loadEventListeners();

function loadEventListeners() {

    // DOM load event listeners
    document.addEventListener("DOMContentLoaded", getTasks);
    // Add task event
    form.addEventListener("submit", addTask);
    // Remove task event
    taskList.addEventListener("click", removeTask);
    // Clear task event
    clearBtn.addEventListener("click", clearTask);
    // Filter task event
    filter.addEventListener("keyup", filterTask);

};

// Get Tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    };

    tasks.forEach(function (task) {
        // Create Li elements
        const li = document.createElement("li");
        li.className = "collection-item";
        // Create textNode and Append to li
        li.appendChild(document.createTextNode(task));
        // Create New Link Element
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = "<i class='fa fa-remove'></i>"

        li.appendChild(link);

        // Append Li to Ul
        taskList.appendChild(li);

    });
};

// Add Task
function addTask(e) {
    if (taskInput.value === "") {
        swal("Add a task");
    }

    // Create Li elements
    const li = document.createElement("li");
    li.className = "collection-item";
    // Create textNode and Append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create New Link Element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class='fa fa-remove'></i>"

    li.appendChild(link);

    // Append Li to Ul
    taskList.appendChild(li);

    // Store task in local storage
    storeTaskInLocalStorage(taskInput.value);


    // Clear Input
    taskInput.value = "";

    e.preventDefault();
};

// Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    };


    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    // e.preventDefault();
};

// Remove Tasks

function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {

        if (confirm("Are You Sure?")) {
            e.target.parentElement.parentElement.remove();
            alert("Task deleted");

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        };
    };

};

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    };
    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(taskItem);
};

// Clear Tasks
function clearTask(e) {
    // taskList.innerHTML = "";

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        // console.log("Task Cleared");
    };

    // Clear from LS
    clearTasksFromLocalStorage();
};
    // Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
};


// Filter Tasks
function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach
        (function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = "block";
            } else {
                task.style.display = "none";
            }
        });

};