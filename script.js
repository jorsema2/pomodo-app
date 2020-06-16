const pomodoro = new Pomodoro();

// Disable start button when data is modified but user hasn't clicked "apply-changes" yet.

// If the count isn't running, the stop button doesn't appear.

// If the count is running, the start button and the reset button don't appear AND the "apply-changes" button is disabled.

// Disable "apply changes" while the counter is running.

// Add divs at some point (I have to think when is better for UX) to explain what format should have the data inputted.

// Everything about the to-do app (its list, its buttons...):

// Variables that store the button elements:
const taskList = document.getElementById('task-list');
const taskAdder = document.getElementById('add-task');

// Array that stores new tasks:
let tasks = [];

// Event listener that stores the new task and shows it:
taskAdder.addEventListener('click', (event)=> {
  const input = document.getElementById('input-task').value;
  if (input === '') {
    return;
  }
  tasks.push(input);
  taskList.innerHTML = '';
  tasks.forEach(function (tasks) {
    const taskDiv = document.createElement('div');
    const li = document.createElement('li');
    const buttonsDiv = document.createElement('div');
    const startTask = document.createElement('button');
    const completeTask = document.createElement('button');;
    const deleteTask = document.createElement('button');
    taskList.appendChild(taskDiv);
    taskDiv.appendChild(li);
    taskDiv.appendChild(buttonsDiv);
    buttonsDiv.appendChild(startTask);
    buttonsDiv.appendChild(completeTask);
    buttonsDiv.appendChild(deleteTask);
    startTask.innerHTML = 'Start';
    completeTask.innerHTML = 'Complete';
    deleteTask.innerHTML = 'Delete';
    startTask.addEventListener('click', () => pomodoro.start());
    completeTask.addEventListener('click', deleteMe);
    deleteTask.addEventListener('click', deleteMe);   
    li.innerHTML += tasks;
  });
});

// Variable that will store the innerHTML of a specific li element:
let liText;

function deleteMe() {
  const threeButtonsDiv = this.parentNode;
  liText = threeButtonsDiv.parentElement.childNodes[0].innerHTML;

  const deleteTasks = tasks.filter( (task) => {
    return task !== liText;
  })

  tasks = deleteTasks;

  const wholeTaskDiv= threeButtonsDiv.parentNode;
  wholeTaskDiv.parentNode.removeChild(wholeTaskDiv);
  reset();
};


// When count is initiated from the to-do app, stop button doesn't stop the countdown
// The start count of the to-do app doesn't get reseted when we click "stop"!
