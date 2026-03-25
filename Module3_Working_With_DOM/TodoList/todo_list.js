const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Declare an empty array with a variable named tasks
let tasks = [];

//Step 3: Defining various functions to access data
// function to add task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText});
        taskInput.value = ""; // resetting the value of the taskInput field to an empty string after adding the task, clearing the input for the next task entry.
        displayTasks();
    }
}

function displayTasks() {
    taskList.innerHTML = ""; // to clear the existing content within the taskList element by setting its innerHTML to an empty string.
    tasks.forEach((task, index) => {
        const li = document.createElement("li"); // task.forEach iterates through the tasks array using forEach, creating a list item for each task.
        li.innerHTML = `<input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}> 
            <label for="task-${index}">${task.text}</label>`; // It constructs HTML content for each task by assigning it to li.innerHTML, which includes a checkbox, a label displaying the task text and corresponding IDs.
        li.querySelector("input").addEventListener("change", () => toggleTask(index)); // with the help of li.querySelector,it sets up an event listener for each checkbox within the task list <li> element.
        // When the checkbox statte changes, it triggers the toggleTask() function, which is defined below.
        taskList.appendChild(li); // Then appends the newly created list item containing the task details in the To-Do List interface using the appendChild method.
    });
}
/* This function toggles the completion status of a specific task in the tasks array based on the provided index.
It helps by selecting the checkbox regardless. If selected, then it will mark that particular task as completed.
For this, we need to call one more function called the clearCompletedTasks function. */
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    displayTasks();
    /* In the code above, the filter method filters the task array,
    which has the list of tasks entered bby users.
    task.filter(task => !task.completed); code filters the tasks array to retrieve only the tasks that are not marked as completed (task.completed is false),
    returning a new array excluding completed tasks. */
}

// Perform addEvemtListener for addTask and clearCompletedTasks button to listen for clicks after clicking the *Add Task* and *Clear Completed* buttons.
addTaskBtn.addEventListener("click", addTask);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);
// The funciton calls the displayTasks function to show the entered todo task after clicking the *Add Task* button.
displayTasks();
