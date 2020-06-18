// Everything about the pomodoro app (timer, its buttons and its settings):

// // Function that converts to seconds:
// function secondsConversion(inputValue) {
//   let min = inputValue.substring(0, 2);
//   let sec = inputValue.substring(3);

//   // Convert string to number:
//   min = parseInt(min);
//   sec = parseInt(sec);

//   minPlusSec = min * 60 + sec;
// }

// // Function that converts seconds to "mm:ss" format:
// function timerInHtml(totalSeconds) {
//   seconds = totalSeconds % 60;
//   minutes = Math.floor((totalSeconds - seconds) / 60);

//   if (minutes < 10) {
//     minutes = "0" + minutes;
//   }
//   if (seconds < 10) {
//     seconds = "0" + seconds;
//   }
//   countDownTimer = minutes + ":" + seconds;
//   shownTimer.innerHTML = countDownTimer;
// }

// // Initial timer value:
// timerInHtml(settings.sessionLength);

// // Function that checks when to start work or when to continue break:

// function start() {
//   startButton.setAttribute("disabled", "disabled");
//   document.getElementById("apply-changes").disabled = true;
//   if (initialSettings.breakLength < settings.breakLength) {
//     breaks();
//   } else {
//     startCount();
//   }
// }

// // Function to count time left to work during one period:
// function startCount() {
//   myTimer = setInterval(timer, 1000);

//   function timer() {
//     if (settings.sessionLength <= 0) {
//       shownTimer.innerHTML = "00:00";
//       clearInterval(myTimer);
//       settings.sessionLength = initialSettings.sessionLength;
//       if (settings.breaksNumber === 0) {
//         startButton.removeAttribute("disabled", "disabled");
//         settings.breaksNumber = initialSettings.breaksNumber;
//         return;
//       }
//       breaks();
//       return;
//     } else {
//       timerInHtml(settings.sessionLength);
//     }
//     settings.sessionLength--;
//   }
// }

// // Function to count time left for break:
// function breaks() {
//   myTimer = setInterval(timer, 1000);

//   function timer() {
//     if (settings.breakLength <= 0) {
//       shownTimer.innerHTML = "00:00";
//       clearInterval(myTimer);
//       settings.breakLength = initialSettings.breakLength;
//       settings.breaksNumber--;
//       startCount();
//       return;
//     } else {
//       timerInHtml(settings.breakLength);
//     }
//     settings.breakLength--;
//   }
// }

// // Function that resets all settings:
// function reset() {
//   clearInterval(myTimer);
//   settings = JSON.parse(JSON.stringify(initialSettings));
//   timerInHtml(1500);
//   startButton.removeAttribute("disabled", "disabled");
//   applyChanges.disabled = false;
// }

// // Buttons behaviour:
// startButton.addEventListener("click", function () {
//   start();
// });

// stopButton.addEventListener("click", function () {
//   clearInterval(myTimer);
//   startButton.removeAttribute("disabled", "disabled");
// });

// resetButton.addEventListener("click", function () {
//   reset();
// });

// applyChanges.addEventListener("click", function () {
//   initialSettings = Object.assign({}, settings);
// });

function Pomodoro() {
  // Variables where the settings are stored:
  this.form = document.getElementById("form");
  this.sessionLength = document.getElementById("session-duration");
  this.breakLength = document.getElementById("break-duration");
  this.breaksNumber = document.getElementById("sessions-number");
  this.applyChanges = document.getElementById("apply-changes");

  // HTML element that shows the timer
  this.shownTimer = document.getElementById("countdown-timer");

  // Buttons:
  this.startButton = document.getElementById("start");
  this.stopButton = document.getElementById("stop");
  this.resetButton = document.getElementById("reset");

  // Object that stores the initial settings:
  this.initialSettings = {
    sessionLength: 1500,
    breaksNumber: 1,
    breakLength: 300,
  };

  // Object that gets modified when the countdown is running:
  this.settings = JSON.parse(JSON.stringify(this.initialSettings));

  // Pomodoro commonly used values being used as input default values:
  this.sessionLength.defaultValue = "25:00";
  this.breaksNumber.defaultValue = "2";
  this.breakLength.defaultValue = "05:00";

  // Variables declared for work duration per period with a default value assigned:
  this.countDownTimer;

  // Function that shows counter in HTML and its necessary variables:
  this.minutes;
  this.seconds;

  // Variable called to start and stop the timer:
  this.myTimer;

  // Variable to store minutes and seconds converted to seconds:
  this.minPlusSec;

  // Object for later validation:
  this.isDataValid = {
    sessionLength: true,
    breaksNumber: true,
    breakLength: true,
  };

  // Apply-changes button is disabled by default:
  this.applyChanges.disabled = true;
}

Pomodoro();

// Function that converts seconds to "mm:ss" format:
Pomodoro.prototype.timerInHtml = function (totalSeconds) {
  this.seconds = totalSeconds % 60;
  this.minutes = Math.floor((totalSeconds - this.seconds) / 60);

  if (this.minutes < 10) {
    this.minutes = "0" + this.minutes;
  }
  if (this.seconds < 10) {
    this.seconds = "0" + this.seconds;
  }
  
  this.countDownTimer = this.minutes + ":" + this.seconds;
  this.shownTimer.innerHTML = this.countDownTimer;
};

Pomodoro.prototype.startCount = function () {
  this.myTimer = setInterval(timer, 1000);
  const that = this;

  function timer() {
    if (that.settings.sessionLength <= 0) {
      that.shownTimer.innerHTML = "00:00";
      clearInterval(myTimer);
      that.settings.sessionLength = that.initialSettings.sessionLength;
      if (that.settings.breaksNumber === 0) {
        that.startButton.removeAttribute("disabled", "disabled");
        that.settings.breaksNumber = that.initialSettings.breaksNumber;
        return;
      }
      breaks();
      return;
    } else {
      that.timerInHtml(that.settings.sessionLength);
    }
    that.settings.sessionLength--;
  }
};

Pomodoro.prototype.start = function () {
  this.startButton.setAttribute("disabled", "disabled");
  document.getElementById("apply-changes").disabled = true;
  if (this.initialSettings.breakLength < this.settings.breakLength) {
    this.breaks();
  } else {
    this.startCount();
  }
};

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

Pomodoro.breakLength.onkeyup = function (event) {
  this.settings.breakLength = this.breakLength.value;
  validateField({
    htmlElement: event.target,
    regex: /^([0-5][0-9]):([0-5][0-9])$/,
    key: "breakLength",
  });
  secondsConversion(this.settings.breakLength);
  this.settings.breakLength = minPlusSec;
};

Pomodoro.prototype.breaksNumber.onkeyup = function (event) {
  this.settings.breaksNumber = this.breaksNumber.value - 1;
  validateField({
    htmlElement: event.target,
    regex: /^([0-9])+$/,
    key: "breaksNumber",
  });
};

// Function for validation:
function validateField (config) {
  const validationResult = config.regex.test(this.settings[config.key]);
  if (this.settings[config.key] == "") {
    config.htmlElement.classList.remove("error");
    return true;
  } else if (validationResult === false) {
    config.htmlElement.classList.add("error");
    this.isDataValid[config.key] = false;
    return false;
  } else {
    config.htmlElement.classList.remove("error");
    this.isDataValid[config.key] = true;
  }
};

// If all data is valid, enable apply-changes button:

// form.addEventListener("focusout", function () {
//   if (
//     isDataValid.sessionLength &&
//     isDataValid.breaksNumber &&
//     isDataValid.breakLength
//   ) {
//     applyChanges.style.backgroundColor = "green";
//     applyChanges.style.border = "green";
//     applyChanges.disabled = false;
//   } else {
//     applyChanges.style.backgroundColor = "";
//     applyChanges.style.border = "";
//     applyChanges.disabled = true;
//   }
// });

// Disable start button when data is modified but user hasn't clicked "apply-changes" yet.

// If the count isn't running, the stop button doesn't appear.

// If the count is running, the start button and the reset button don't appear AND the "apply-changes" button is disabled.

// Disable "apply changes" while the counter is running.

// Add divs at some point (I have to think when is better for UX) to explain what format should have the data inputted.
