const shownTimer = document.getElementById('countdown-timer');

// Buttons:
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// Variable called to start and stop the timer:
let myTimer;

// Variables declared for work duration per period:
const chosenTimerDuration = 3;
let countDownTimer = 0;
let countDownLeft = chosenTimerDuration;

// Variables declard for number of breaks and break duration:
const breaksNumber = 2;
const chosenBreakDuration = 2;
let breaksLeft = breaksNumber;
let breakDurationLeft = chosenBreakDuration;

// Function that shows counter in HTML:

function timerInHtml(minutes, seconds) {
    if (minutes < 10) {
        if (seconds < 10) {
            countDownTimer = '0' + minutes + ':' + '0' + seconds;
            shownTimer.innerHTML = countDownTimer;
        } else {
            countDownTimer = '0' + minutes + ':' + seconds;
            shownTimer.innerHTML = countDownTimer;
        }
    } else {
        countDownTimer = minutes + ':' + seconds;
        shownTimer.innerHTML = countDownTimer;
    }
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
            countDownLeft = chosenTimerDuration;
            if (breaksLeft === 0) {
                startButton.removeAttribute("disabled", "disabled");
                breaksLeft = breaksNumber;
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
            breakDurationLeft = chosenBreakDuration;
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
    countDownLeft = chosenTimerDuration;
    breakDurationLeft = chosenBreakDuration;

    const seconds = countDownLeft % 60;
    const minutes = Math.floor((countDownLeft - seconds) / 60);

    timerInHtml(minutes, seconds);
}

// Buttons behaviour:
startButton.addEventListener('click', function() {
    startButton.setAttribute("disabled", "disabled");
    startCount();    
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