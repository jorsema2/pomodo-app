// Variables where the settings are stored:
const sessionLength = document.getElementById('session-duration');
const breakLength = document.getElementById('break-duration');
const breaksNumber = document.getElementById('sessions-number');
const applyChanges = document.getElementById('apply-changes');

// Object that stores the settings chosen by the user:
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

// Function that assigns default values:

function defaultValue(key, value, targetElement) {
    sessionLength.defaultValue = settings.sessionLength;
    breaksNumber.defaultValue = settings.breaksNumber + 1;
    breakLength.defaultValue = settings.breakLength;
}

defaultValue();

// Function and events that assign new values:
sessionLength.onkeyup = function(event) {
    settings.sessionLength = sessionLength.value;
    chosenSessionLength = settings.sessionLength;
    timerInHtml(settings.sessionLength);
}

breakLength.onkeyup = function(event) {
    settings.breakLength = breakLength.value;
}

breaksNumber.onkeyup = function(event) {
    settings.breaksNumber = breaksNumber.value - 1;
}

function setValues() {
    chosenSessionLength = settings.sessionLength;
    chosenBreaksNumber = settings.breaksNumber;
    chosenBreaksLength = settings.breakLength;
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
})

applyChanges.addEventListener('click', function() {
    setValues();
})