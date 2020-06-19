// Everything about the pomodoro app (timer, its buttons and its settings):

// Class that defines variables and objects necessary to make the pomodoro app:
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

  
  this.breaksNumber.onkeyup = function (event) {
    console.log('hey');
    settings.breaksNumber = breaksNumber.value - 1;
    validateField({
      htmlElement: event.target,
      regex: /^([0-9])+$/,
      key: "breaksNumber",
    });
  };
}

Pomodoro();

// Function that converts seconds to "mm:ss" format:
Pomodoro.prototype.timerInHtml = function (totalSeconds) {
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
};

// Initial timer value:
Pomodoro.prototype.timerInHtml(settings.sessionLength);

Pomodoro.prototype.startCount = function () {
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
      Pomodoro.prototype.breaks();
      return;
    } else {
      Pomodoro.prototype.timerInHtml(settings.sessionLength);
    }
    settings.sessionLength--;
  }
};

Pomodoro.prototype.start = function () {
  startButton.setAttribute("disabled", "disabled");
  document.getElementById("apply-changes").disabled = true;
  if (initialSettings.breakLength < settings.breakLength) {
    Pomodoro.prototype.breaks();
  } else {
    Pomodoro.prototype.startCount();
  }
};

// Function to count time left for break:
Pomodoro.prototype.breaks = function () {
  myTimer = setInterval(timer, 1000);

  function timer() {
    if (settings.breakLength <= 0) {
      shownTimer.innerHTML = "00:00";
      clearInterval(myTimer);
      settings.breakLength = initialSettings.breakLength;
      settings.breaksNumber--;
      Pomodoro.prototype.startCount();
      return;

    } else {
      Pomodoro.prototype.timerInHtml(settings.breakLength);
    }
    settings.breakLength--;
  }
}

// Function that resets all settings:
Pomodoro.prototype.reset = function () {
  clearInterval(myTimer);
  settings = JSON.parse(JSON.stringify(initialSettings));
  Pomodoro.prototype.timerInHtml(1500);
  startButton.removeAttribute("disabled", "disabled");
  applyChanges.disabled = false;
}

// Function that converts input to seconds:
function secondsConversion(inputValue) {
  let min = inputValue.substring(0, 2);
  let sec = inputValue.substring(3);

  // Convert string to number:
  min = parseInt(min);
  sec = parseInt(sec);

  minPlusSec = min * 60 + sec;
}

// Events that assign new values and validators:

sessionLength.onkeyup = function (event) {
  settings.sessionLength = sessionLength.value;
  validateField({
    htmlElement: event.target,
    regex: /^([0-5][0-9]):([0-5][0-9])$/,
    key: "sessionLength",
  });
  secondsConversion(sessionLength.value);
  settings.sessionLength = minPlusSec;
  Pomodoro.prototype.timerInHtml(settings.sessionLength);
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


// Function for validation:
function validateField (config) {
  const validationResult = config.regex.test(settings[config.key]);
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
};

// If all data is valid, enable apply-changes button:

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

// // Buttons behaviour:
startButton.addEventListener("click", function () {
  Pomodoro.prototype.start();
});

stopButton.addEventListener("click", function () {
  clearInterval(myTimer);
  startButton.removeAttribute("disabled", "disabled");
});

resetButton.addEventListener("click", function () {
  Pomodoro.prototype.reset();
});

applyChanges.addEventListener("click", function () {
  initialSettings = Object.assign({}, settings);
});


// Disable start button when data is modified but user hasn't clicked "apply-changes" yet.

// If the count isn't running, the stop button doesn't appear.

// If the count is running, the start button and the reset button don't appear AND the "apply-changes" button is disabled.

// Disable "apply changes" while the counter is running.

// Add divs at some point (I have to think when is better for UX) to explain what format should have the data inputted.
