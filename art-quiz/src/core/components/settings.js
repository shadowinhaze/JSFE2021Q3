import Sound from './sound'

export default class Settings {
    static vars = {
        templatePath: './pages/html/settings.html',
    };

    static userSettings = {
        volume: 0.5,
        timer: false,
        timerTime: 10
    }

    static box = null;
    
    static setContainer() {
        Settings.box = document.createElement('section');
        Settings.box.id = 'settings';
        Settings.box.classList.add('hidden')
    }

    static async getContentFromHtmlTemplate(path) {
        try {
            const response = await fetch(path);
            const html = await response.text();
            Settings.box.innerHTML = html;
        } catch (err) {
            console.warn('Something went wrong.', err);
        }    
    }

    static showHideSettings() {
        const settingsButtons = document.querySelectorAll('.setting-button');
        settingsButtons.forEach(button => {
            button.addEventListener('click', () => {
                Settings.box.classList.toggle('hidden')
            })
        })
    }

    static setVolume() {
        const rangeInput = document.querySelectorAll('.range-type-input');
        const audioVolume = document.getElementById('volume');
        const volumeControlFull = document.querySelector('.volume-control.full')
        const volumeControlMute = document.querySelector('.volume-control.mute')
        
        const duoBg = () => {
            rangeInput.forEach(e => {
                let value = (e.value - e.min) / (e.max - e.min) * 100;
                e.style.background = 'linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ' + value + '%, #A4A4A4 ' + value + '%, #A4A4A4 100%)';
            })
        };
        duoBg();

        const toggleAudioVolume = () => {
            Sound.setVolume(audioVolume.value / 100);
            duoBg();
        };

        audioVolume.value = Settings.userSettings.volume * 100;
        duoBg();
        toggleAudioVolume();

        volumeControlMute.addEventListener('click', () => {
            audioVolume.value = 0;
            Sound.setVolume(0);
            duoBg();
        })

        volumeControlFull.addEventListener('click', () => {
            audioVolume.value = 100;
            Sound.setVolume(1);
            duoBg();
        })

        audioVolume.addEventListener('input', toggleAudioVolume);
    }
    
    static setTimer() {
        const switcher = document.querySelector('input[name="time-switcher"]');
        const switcherLabel = document.querySelector('label[for="time-switcher"]');
        const timeSelector = document.querySelector('.timer-quant-item');
        const timeSelectorButtons = document.querySelectorAll('.timer-quant-button');
        const timeSelectorInput = document.querySelector('input[name="timer-quant"]');
        
        Settings.turnTimer();

        switcher.addEventListener('change', function () {
            Settings.userSettings.timer = this.checked
            Settings.turnTimer()
        })

        timeSelectorButtons.forEach(button => {
            button.addEventListener('click', e => {
                if (e.target.classList.contains('decr')) {
                    timeSelectorInput.stepDown();
                } else {
                    timeSelectorInput.stepUp();
                }
                Settings.userSettings.timerTime = timeSelectorInput.value;
            })
        })
    }

    static turnTimer() {
        const switcher = document.querySelector('input[name="time-switcher"]');
        const switcherLabel = document.querySelector('label[for="time-switcher"]');
        const timeSelector = document.querySelector('.timer-quant-item');
        const timeSelectorInput = document.querySelector('input[name="timer-quant"]');

        if (Settings.userSettings.timer) {
            switcher.checked = true;
            switcherLabel.innerText = 'On'
            timeSelectorInput.value = Settings.userSettings.timerTime;
            timeSelector.classList.remove('hidden')
        } else {
            switcher.checked = false;
            switcherLabel.innerText = 'Off'
            timeSelector.classList.add('hidden')
        }
    }

    static getSettingsFromLocal() {
        if (!localStorage.userLocalSettings) {
            localStorage.userLocalSettings = JSON.stringify(Settings.userSettings)
        } else {
            Settings.userSettings = JSON.parse(localStorage.userLocalSettings)
        }
    }

    static setCheckpointSettings() {
        const defaultButton = document.querySelector('.def');
        const saveButton = document.querySelector('.save')
        

        defaultButton.addEventListener('click', () => {
            Settings.userSettings.volume = 0.5;
            Settings.userSettings.timer = false;
            Settings.userSettings.timerTime = 10;
            Settings.setVolume();
            Settings.turnTimer();
            localStorage.userLocalSettings = JSON.stringify(Settings.userSettings)
        })

        saveButton.addEventListener('click', () => {
            localStorage.userLocalSettings = JSON.stringify(Settings.userSettings)
        })
    }

    static async render() {
        Settings.getSettingsFromLocal();
        Settings.setContainer();
        await Settings.getContentFromHtmlTemplate(Settings.vars.templatePath);
        Settings.showHideSettings();
        Settings.setVolume();
        Settings.setTimer();
        Settings.setCheckpointSettings();
    }

}