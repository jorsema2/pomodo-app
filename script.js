const shownTimer = document.getElementById('countdown-timer');

// Buttons:
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// Variable called to start and stop the timer:
let myTimer;

// Variables declared for work duration per period:
const chosenTimerDuration = 5;
let countDownTimer = 0;
let countDownLeft = chosenTimerDuration;

// Variables declard for number of breaks and break duration:
const breaksNumber = 1;
const chosenBreakDuration = 4;
let breaksLeft = breaksNumber;
let breakDurationLeft = chosenBreakDuration;

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
                return;
            }
            breaks();
            return;
        } if (minutes < 10) {
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
        } if (minutes < 10) {
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
        breakDurationLeft--;
    }
}

function resetTimer() {
    countDownLeft = chosenTimerDuration;
    breakDurationLeft = chosenBreakDuration;

    const seconds = countDownLeft % 60;
    const minutes = Math.floor((countDownLeft - seconds) / 60);

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