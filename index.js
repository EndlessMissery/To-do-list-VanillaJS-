let addToDoButton = document.getElementById("add-task");
let toDoContainer = document.getElementById("to-do-container");
let inputField = document.getElementById("input-field");

addToDoButton.addEventListener("click", addTodo);

inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

// Load task when refresh
window.addEventListener("load", loadTasks);

function addTodo() {
    var taskText = inputField.value.trim();
    if (taskText === "") {
        alert("Please write your task");
        return;
    }

//Buttons for delete/complete/failed/clear
    var paragraph = document.createElement("p");
    paragraph.classList.add("paragraph-styling");
    paragraph.innerText = taskText;

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("button-styling");

    var completeButton = document.createElement("button");
    completeButton.classList.add("complete-styling");

    var failedButton = document.createElement("button");
    failedButton.classList.add("failed-styling");

    var clearButton = document.createElement("button");
    clearButton.classList.add("clear-style");

    toDoContainer.appendChild(paragraph);
    paragraph.appendChild(completeButton);
    paragraph.appendChild(deleteButton);
    paragraph.appendChild(failedButton);
    paragraph.appendChild(clearButton);
    inputField.value = "";

    deleteButton.addEventListener("click", function () {
        showConfirmation(paragraph);
    });

    completeButton.addEventListener("click", function () {
        paragraph.style.color = "green";
        saveTasks();
    });

    failedButton.addEventListener("click", function () {
        paragraph.style.color = "red";
        saveTasks();
    });

    clearButton.addEventListener("click", function () {
        paragraph.style.color = "black";
        saveTasks();
    });

    saveTasks();
}

//alert window for delete confirmation
function showConfirmation(paragraph) {
    var confirmed = confirm("Are you sure you want to delete this task?");
    if (confirmed) {
        toDoContainer.removeChild(paragraph);
        saveTasks();
    }
}

function saveTasks() {
    // All tasks to Array
    var tasks = Array.from(document.querySelectorAll('.paragraph-styling')).map(function (task) {
        return task.innerText;
    });

    // Save tasks array to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    // Retrieve tasks array from local storage
    var savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        var tasks = JSON.parse(savedTasks);

        tasks.forEach(function (taskText) {
            var paragraph = document.createElement("p");
            paragraph.classList.add("paragraph-styling");
            paragraph.innerText = taskText;

            var deleteButton = document.createElement("button");
            deleteButton.classList.add("button-styling");

            var completeButton = document.createElement("button");
            completeButton.classList.add("complete-styling");

            var failedButton = document.createElement("button");
            failedButton.classList.add("failed-styling");

            var clearButton = document.createElement("button");
            clearButton.classList.add("clear-style");

            toDoContainer.appendChild(paragraph);
            paragraph.appendChild(completeButton);
            paragraph.appendChild(deleteButton);
            paragraph.appendChild(failedButton);
            paragraph.appendChild(clearButton);

            deleteButton.addEventListener("click", function () {
                showConfirmation(paragraph);
            });

            completeButton.addEventListener("click", function () {
                paragraph.style.color = "green";
                saveTasks();
            });

            failedButton.addEventListener("click", function () {
                paragraph.style.color = "red";
                saveTasks();
            });

            clearButton.addEventListener("click", function () {
                paragraph.style.color = "black";
                saveTasks();
            });
        });
    }
}