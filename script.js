// Everything about the pomodoro app (timer, its buttons and its settings):

// Variables where the settings are stored:
const form = document.getElementById("form");
const sessionLength = document.getElementById("session-duration");
const breakLength = document.getElementById("break-duration");
const breaksNumber = document.getElementById("sessions-number");
const applyChanges = document.getElementById("apply-changes");

// HTML element that shows the timer
const shownTimer = document.getElementById("countdown-timer");

// Buttons:
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

// Object that stores the initial settings:
let initialSettings = {
  sessionLength: 1500,
  breaksNumber: 1,
  breakLength: 300,
};

// Object that gets modified when the countdown is running:
let settings = JSON.parse(JSON.stringify(initialSettings));

// Pomodoro commonly used values being used as input default values:
sessionLength.defaultValue = "25:00";
breaksNumber.defaultValue = "2";
breakLength.defaultValue = "05:00";

// Variables declared for work duration per period with a default value assigned:
let countDownTimer;

// Function that shows counter in HTML and its necessary variables:
let minutes;
let seconds;

// Variable called to start and stop the timer:
let myTimer;

// Variable to store minutes and seconds converted to seconds:
let minPlusSec;

// Function and events that assign new values:
sessionLength.onkeyup = function (event) {
  settings.sessionLength = sessionLength.value;
  validateField({
    htmlElement: event.target,
    regex: /^([0-5][0-9]):([0-5][0-9])$/,
    key: "sessionLength",
  });
  secondsConversion(sessionLength.value);
  settings.sessionLength = minPlusSec;
  timerInHtml(settings.sessionLength);
};

breakLength.onkeyup = function (event) {
  settings.breakLength = breakLength.value;
  validateField({
    htmlElement: event.target,
    regex: /^([0-5][0-9]):([0-5][0-9])$/,
    key: "breakLength",
  });
  secondsConversion(settings.breakLength);
  settings.breakLength = minPlusSec;
};

breaksNumber.onkeyup = function (event) {
  settings.breaksNumber = breaksNumber.value - 1;
  validateField({
    htmlElement: event.target,
    regex: /^([0-9])+$/,
    key: "breaksNumber",
  });
};

// Function that converts to seconds:
function secondsConversion(inputValue) {
  let min = inputValue.substring(0, 2);
  let sec = inputValue.substring(3);

  // Convert string to number:
  min = parseInt(min);
  sec = parseInt(sec);

  minPlusSec = min * 60 + sec;
}

// Function that converts seconds to "mm:ss" format:
function timerInHtml(totalSeconds) {
  seconds = totalSeconds % 60;
  minutes = Math.floor((totalSeconds - seconds) / 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  countDownTimer = minutes + ":" + seconds;
  shownTimer.innerHTML = countDownTimer;
}

// Initial timer value:
timerInHtml(settings.sessionLength);

// Function that checks when to start work or when to continue break:

function start() {
  startButton.setAttribute("disabled", "disabled");
  document.getElementById("apply-changes").disabled = true;
  if (initialSettings.breakLength < settings.breakLength) {
    breaks();
  } else {
    startCount();
  }
}

// Function to count time left to work during one period:
function startCount() {
  myTimer = setInterval(timer, 1000);

  function timer() {
    if (settings.sessionLength <= 0) {
      shownTimer.innerHTML = "00:00";
      clearInterval(myTimer);
      settings.sessionLength = initialSettings.sessionLength;
      if (settings.breaksNumber === 0) {
        startButton.removeAttribute("disabled", "disabled");
        settings.breaksNumber = initialSettings.breaksNumber;
        return;
      }
      breaks();
      return;
    } else {
      timerInHtml(settings.sessionLength);
    }
    settings.sessionLength--;
  }
}

// Function to count time left for break:
function breaks() {
  myTimer = setInterval(timer, 1000);

  function timer() {
    if (settings.breakLength <= 0) {
      shownTimer.innerHTML = "00:00";
      clearInterval(myTimer);
      settings.breakLength = initialSettings.breakLength;
      settings.breaksNumber--;
      startCount();
      return;
    } else {
      timerInHtml(settings.breakLength);
    }
    settings.breakLength--;
  }
}

// Function that resets all settings:
function reset() {
  clearInterval(myTimer);
  settings = JSON.parse(JSON.stringify(initialSettings));
  timerInHtml(1500);
  startButton.removeAttribute("disabled", "disabled");
  applyChanges.disabled = false;
}

// Buttons behaviour:
startButton.addEventListener("click", function () {
  start();
});

stopButton.addEventListener("click", function () {
  clearInterval(myTimer);
  startButton.removeAttribute("disabled", "disabled");
});

resetButton.addEventListener("click", function () {
  reset();
});

applyChanges.addEventListener("click", function () {
  initialSettings = Object.assign({}, settings);
});

// Object for later validation:
const isDataValid = {
  sessionLength: true,
  breaksNumber: true,
  breakLength: true,
};

// Function for validation:
function validateField(config) {
  const validationResult = config.regex.test(settings[config.key]);
  console.log(validationResult);
  if (settings[config.key] == "") {
    config.htmlElement.classList.remove("error");
    return true;
  } else if (validationResult === false) {
    config.htmlElement.classList.add("error");
    isDataValid[config.key] = false;
    return false;
  } else {
    config.htmlElement.classList.remove("error");
    isDataValid[config.key] = true;
  }
}

// If all data is valid, enable apply-changes button:
applyChanges.disabled = true;

form.addEventListener("focusout", function () {
  if (
    isDataValid.sessionLength &&
    isDataValid.breaksNumber &&
    isDataValid.breakLength
  ) {
    applyChanges.style.backgroundColor = "green";
    applyChanges.style.border = "green";
    applyChanges.disabled = false;
  } else {
    applyChanges.style.backgroundColor = "";
    applyChanges.style.border = "";
    applyChanges.disabled = true;
  }
});

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
    startTask.addEventListener('click', start);
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