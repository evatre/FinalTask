// COUNTDOWN TIMER


function getTimeRemaining(endtime) {
    const currentTime = new Date().getTime();
    const remainingTime = endtime - currentTime;
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime / (1000 * 60 * 60) % 24));
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const seconds = Math.floor((remainingTime / 1000) % 60);

    return {
        remainingTime,
        days,
        hours,
        minutes,
        seconds
    }
}

function initializeTimer(id, endtime) {
    const timer = document.getElementById(id);
    const daysSpan = timer.querySelector(".days");
    const hoursSpan = timer.querySelector(".hours");
    const minutesSpan = timer.querySelector(".minutes");
    const secondsSpan = timer.querySelector(".seconds");

    function updateTimer() {
        const t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
        minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

        if (t.remainingTime <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateTimer();
    const timeinterval = setInterval(updateTimer, 1000);
}

const summmitTime = new Date("October 14, 2022 09:00:00").getTime();
initializeTimer("countdown-timer", summmitTime);