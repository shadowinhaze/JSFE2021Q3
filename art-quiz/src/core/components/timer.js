import Message from "./message";

export default class Timer {
    static params = {
        isActivated: false,
        allTime: null,
        time: null,
        container: null,
        stop: false,
    }

    static getTimerFromLocal() {
        const data = JSON.parse(localStorage.userLocalSettings);
        if (data.timer) {
            Timer.params.isActivated = data.timer;
            Timer.params.allTime = data.timerTime;
            Timer.params.time = data.timerTime;
        }
    }

    static genTimer() {
        Timer.getTimerFromLocal();
        if (Timer.params.isActivated) {
            Timer.params.container = document.querySelector('.game-timer');
            const timeLine = document.createElement('div');
            timeLine.classList.add('game-timer__progress');
            timeLine.innerHTML = '<span class="progress__inner-line"></span>'
    
            const remainTime = document.createElement('div');
            remainTime.classList.add('game-timer__remaining-time');
            remainTime.innerText = `${Timer.params.allTime}`;
    
            Timer.params.container.append(timeLine, remainTime);
        }
    }

    static showTimerTime() {
        if (Timer.params.isActivated) {
            const remainTime = Timer.params.container.querySelector('.game-timer__remaining-time');
            const timeLine = Timer.params.container.querySelector('.progress__inner-line')
            const width = Timer.params.time / Timer.params.allTime * 100;
            timeLine.style.width = `${width}%`;
            remainTime.innerText = `${Timer.params.time}`
        }
    }

    static startTimer() {
        if (Timer.params.isActivated) {
            const countDown = () => {
                if (Timer.params.time > 0) {
                    Timer.params.time--
                    Timer.showTimerTime();
                    checkTimer();
                }
            }

            const checkTimer = () => {
                if (Timer.params.time === 0) {
                    clearInterval(countDonwInterval);
                    Message.genNewMessage(Message.requests.fail)
                } else if (Timer.params.stop) {
                    clearInterval(countDonwInterval);
                }
            }

            const countDonwInterval = setInterval(countDown, 1000);
        }
    }

}