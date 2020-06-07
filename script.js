// Variables where the settings are stored:
const sessionLength = document.getElementById('session-duration');
const breaksNumber = document.getElementById('break-duration');
const breakLength = document.getElementById('sessions-number');


// Object that stores the settings chosen by the user:
const settings = {
    sessionLength: 2,
    breaksNumber: 4,
    breakLength: 1
}

// Function that assigns default values:

function defaultValue(key, value, targetElement) {
    sessionLength.defaultValue = settings.sessionLength;
    breaksNumber.defaultValue = settings.breaksNumber + 1;
    breakLength.defaultValue = settings.breakLength;
}

defaultValue();

// Function and events that assign new values:

// function setValue(key, value, targetElement){
//     paymentDetails[key] = value;
// }

// sessionLength.onkeyup = function(event) {
//     setValue('sessionLength', targetElement.value);
// }


// HTML element that shows the timer
const shownTimer = document.getElementById('countdown-timer');

// Buttons:
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// Variable called to start and stop the timer:
let myTimer;

// // Variables declared for work duration per period:
let countDownTimer;
let countDownLeft = settings.sessionLength;

// // Variables declard for number of breaks and break duration:
let breaksLeft = settings.breaksNumber;
let breakDurationLeft = settings.breakLength;

// Function that shows counter in HTML:

function timerInHtml(minutes, seconds) {
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    countDownTimer = minutes + ':' + seconds;
    shownTimer.innerHTML = countDownTimer;
}

// Initial timer value;

function initialTimer() {
    const seconds = countDownLeft % 60;
    const minutes = Math.floor((countDownLeft - seconds) / 60);

    timerInHtml(minutes, seconds);
}

// Show initial value in timer onload:
initialTimer();

// Function to count time left to work during one period:
function startCount() {
    myTimer = setInterval(timer, 1000);

    function timer() {
        const seconds = countDownLeft % 60;
        const minutes = Math.floor((countDownLeft - seconds) / 60);
        
        if (countDownLeft <= 0) {
            shownTimer.innerHTML = "00:00";
            clearInterval(myTimer);
            countDownLeft = settings.sessionLength;
            if (breaksLeft === 0) {
                startButton.removeAttribute("disabled", "disabled");
                breaksLeft = settings.breaksNumber;
                return;
            }
            breaks();
            return;
        } else {
            timerInHtml(minutes, seconds);
        }
        countDownLeft--;
    }
}

// Function to count time left for break:
function breaks() {
    myTimer = setInterval(timer, 1000);

    function timer() {
        const seconds = breakDurationLeft % 60;
        const minutes = Math.floor((breakDurationLeft - seconds) / 60);
        
        if (breakDurationLeft <= 0) {
            shownTimer.innerHTML = "00:00";
            clearInterval(myTimer);
            breakDurationLeft = settings.breakLength;
            breaksLeft--;
            startCount();
            return;
        } else {
            timerInHtml(minutes, seconds);
        }
        breakDurationLeft--;
    }
}

function resetTimer() {
    countDownLeft = settings.sessionLength;
    breakDurationLeft = settings.breakLength;
    breaksLeft = settings.breaksNumber;    

    const seconds = countDownLeft % 60;
    const minutes = Math.floor((countDownLeft - seconds) / 60);

    timerInHtml(minutes, seconds);
}

// Buttons behaviour:
startButton.addEventListener('click', function() {
    startButton.setAttribute("disabled", "disabled");
    if (breakDurationLeft < settings.breakLength) {
        breaks();
    } else {
        startCount();
    }    
})

stopButton.addEventListener('click', function() {
    clearInterval(myTimer);
    startButton.removeAttribute("disabled", "disabled");
})

resetButton.addEventListener('click', function() {
    clearInterval(myTimer);
    resetTimer();
    startButton.removeAttribute("disabled", "disabled");    
})