// Variables where the settings are stored:
const form = document.getElementById('form');
const sessionLength = document.getElementById('session-duration');
const breakLength = document.getElementById('break-duration');
const breaksNumber = document.getElementById('sessions-number');
const applyChanges = document.getElementById('apply-changes');

// Object that stores the settings chosen by the user, at first with the Pomodoro commonly used values:
const settings = {
    sessionLength: 1500,
    breaksNumber: 1,
    breakLength: 300
}

// HTML element that shows the timer
const shownTimer = document.getElementById('countdown-timer');

// Buttons:
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// Variable called to start and stop the timer:
let myTimer;

// Pomodoro commonly used values being used as input default values:

sessionLength.defaultValue = '25:00';
breaksNumber.defaultValue = '2';
breakLength.defaultValue = '05:00';

// Variable to store minutes and seconds converted to seconds:
let minPlusSec;

// Function and events that assign new values:
sessionLength.onkeyup = function(event) {
    settings.sessionLength = sessionLength.value;
    validateField({
        htmlElement: event.target, 
        regex: /^([0-5][0-9]):([0-5][0-9])$/, 
        key: 'sessionLength'
    });
    secondsConversion(sessionLength.value);
    settings.sessionLength = minPlusSec;
    timerInHtml(settings.sessionLength);
}

breakLength.onkeyup = function(event) {
    settings.breakLength = breakLength.value;
    validateField({
        htmlElement: event.target, 
        regex: /^([0-5][0-9]):([0-5][0-9])$/, 
        key: 'breakLength'
    });
    secondsConversion(settings.breakLength);
    settings.breakLength = minPlusSec;
}

breaksNumber.onkeyup = function(event) {
    settings.breaksNumber = breaksNumber.value - 1;
    validateField({
        htmlElement: event.target, 
        regex: /^([0-9])+$/, 
        key: 'breaksNumber'
    });
}

function setValues() {
    chosenSessionLength = settings.sessionLength;
    chosenBreaksNumber = settings.breaksNumber;
    chosenBreaksLength = settings.breakLength;
}

// Function that converts to seconds:

function secondsConversion(inputValue) {
    let min = inputValue.substring(0,2);
    let sec = inputValue.substring(3);

    // Convert string to number:
    min = parseInt(min);
    sec = parseInt(sec);

    minPlusSec = min * 60 + sec;
}

// function setValue(key, value, targetElement){
//     paymentDetails[key] = value;
// }

// sessionLength.onkeyup = function(event) {
//     setValue('sessionLength', targetElement.value);
// }

// Variables declared for work duration per period with a default value assigned:
let countDownTimer;
let chosenSessionLength = settings.sessionLength;

// Variables declard for number of breaks and break duration with their default values assigned:
let chosenBreaksNumber = settings.breaksNumber;
let chosenBreaksLength = settings.breakLength;

// Function that shows counter in HTML and its necessary variables:
let minutes;
let seconds;

function timerInHtml(totalSeconds) {

    seconds = totalSeconds % 60;
    minutes = Math.floor((totalSeconds - seconds) / 60);

    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    countDownTimer = minutes + ':' + seconds;
    shownTimer.innerHTML = countDownTimer;
}

// Initial timer value;

timerInHtml(settings.sessionLength);

// Function to count time left to work during one period:
function startCount() {
    myTimer = setInterval(timer, 1000);

    function timer() {
        
        if (settings.sessionLength <= 0) {
            shownTimer.innerHTML = '00:00';
            clearInterval(myTimer);
            settings.sessionLength = chosenSessionLength;
            if (settings.breaksNumber === 0) {
                startButton.removeAttribute('disabled', 'disabled');
                settings.breaksNumber = chosenBreaksNumber;
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
            shownTimer.innerHTML = '00:00';
            clearInterval(myTimer);
            settings.breakLength = chosenBreaksLength;
            settings.breaksNumber--;
            startCount();
            return;
        } else {
            timerInHtml(settings.breakLength);
        }
        settings.breakLength--;
    }
}

// Function to reset the timer:

function resetTimer() {
    settings.sessionLength = chosenSessionLength;
    settings.breakLength = chosenBreaksLength;
    settings.breaksNumber = chosenBreaksNumber; 

    timerInHtml(settings.sessionLength);
}

// Buttons behaviour:
startButton.addEventListener('click', function() {
    startButton.setAttribute('disabled', 'disabled');
    document.getElementById('apply-changes').disabled = true;
    if (chosenBreaksLength < settings.breakLength) {
        breaks();
    } else {
        startCount();
    }
})

stopButton.addEventListener('click', function() {
    clearInterval(myTimer);
    startButton.removeAttribute('disabled', 'disabled');
})

resetButton.addEventListener('click', function() {
    clearInterval(myTimer);
    resetTimer();
    startButton.removeAttribute('disabled', 'disabled');
    applyChanges.disabled = false;
})

applyChanges.addEventListener('click', function() {
    setValues();
})

// Object for later validation:

const isDataValid = {
    sessionLength: true,
    breaksNumber: true,
    breakLength: true   
}

// Function for validation:

function validateField(config){
    const validationResult = config.regex.test(settings[config.key]);
    console.log(validationResult);
    if (settings[config.key] == '') {
        config.htmlElement.classList.remove('error');
        return true;
    } else if(validationResult === false) {
        config.htmlElement.classList.add('error');
        isDataValid[config.key] = false;
        return false;
    } else {
        config.htmlElement.classList.remove('error');
        isDataValid[config.key] = true;
    }
}

// If all data is valid, enable apply-changes button:
applyChanges.disabled = true;

form.addEventListener('focusout', function() {
    if (isDataValid.sessionLength && isDataValid.breaksNumber && isDataValid.breakLength) {
        applyChanges.style.backgroundColor = 'green';
        applyChanges.style.border = 'green';
        applyChanges.disabled = false;
    } else {
        applyChanges.style.backgroundColor = '';
        applyChanges.style.border = '';
        applyChanges.disabled = true;
    }
})

// Disable start button when data is modified but user hasn't clicked "apply-changes" yet.

// If the count isn't running, the stop button doesn't appear.

// If the count is running, the start button and the reset button don't appear AND the "apply-changes" button is disabled.

// Disable "apply changes" while the counter is running.