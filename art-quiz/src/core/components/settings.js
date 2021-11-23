import Sound from './sound'

export default class Settings {
    static vars = {
        templatePath: './pages/html/settings.html',
    };

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

        const toggleAudioVolumeIcon = () => {
            Sound.setVolume(audioVolume.value / 100);
            duoBg();
        };

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

        const button = document.querySelector('.reset');
        button.addEventListener('click', Sound.play)
        audioVolume.addEventListener('input', toggleAudioVolumeIcon);

    }
    

    static async render() {
        Settings.setContainer();
        await Settings.getContentFromHtmlTemplate(Settings.vars.templatePath);
        Settings.showHideSettings();
        Settings.setVolume();
    }

}