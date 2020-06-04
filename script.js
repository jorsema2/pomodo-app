const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

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
    const myTimer = setInterval(timer, 1000);

    function timer() {
        const seconds = countDownLeft % 60;
        const minutes = Math.floor((countDownLeft - seconds) / 60);
        
        if (countDownLeft <= 0) {
            console.log('00:00');
            clearInterval(myTimer);
            countDownLeft = chosenTimerDuration;
            if (breaksLeft === 0) {
                return;
            }
            breaks();
            return;
        } if (minutes < 10) {
            if (seconds < 10) {
                countDownTimer = '0' + minutes + ':' + '0' + seconds;
                console.log(countDownTimer);
            } else {
                countDownTimer = '0' + minutes + ':' + seconds;
                console.log(countDownTimer);
            }
        } else {
            countDownTimer = minutes + ':' + seconds;
            console.log(countDownTimer);
        }
        countDownLeft--;
    }
}

// Function to count time left for break:
function breaks() {
    const myTimer = setInterval(timer, 1000);

    function timer() {
        const seconds = breakDurationLeft % 60;
        const minutes = Math.floor((breakDurationLeft - seconds) / 60);
        
        if (breakDurationLeft <= 0) {
            console.log('00:00');
            clearInterval(myTimer);
            breakDurationLeft = chosenBreakDuration;
            breaksLeft--;
            startCount(); 
            return;
        } if (minutes < 10) {
            if (seconds < 10) {
                countDownTimer = '0' + minutes + ':' + '0' + seconds;
                console.log(countDownTimer);
            } else {
                countDownTimer = '0' + minutes + ':' + seconds;
                console.log(countDownTimer);
            }
        } else {
            countDownTimer = minutes + ':' + seconds;
            console.log(countDownTimer);
        }
        breakDurationLeft--;
    }
}


startButton.addEventListener('click', function() {
    startCount();
})