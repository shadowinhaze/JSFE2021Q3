import Screen from '../core/templates/screen';
import Sound from '../core/components/sound'

export default class Settings extends Screen {
    static vars = {
        title: 'AQ | settings',
        templatePath: './pages/html/settings.html',
    };

    constructor(id) {
        super(id);
        this.setPageTitle(Settings.vars.title);
    }

    static findSettings() {
        const settingsButton = document.getElementById('settings-button');
        settingsButton.addEventListener('click', () => {
            window.location.hash = '#settings'
        })
    }

    static setClose() {
        const settingsCloseButton = document.getElementById('settings-button');
        const settingsBackButton = document.querySelector('.back');

        const goBack = () => {
            Sound.play();
            window.history.back() 
        };
        settingsCloseButton.addEventListener('click', goBack)
        settingsBackButton.addEventListener('click', goBack)
    }

    static setVolume() {
        const rangeInput = document.querySelectorAll('.range-type-input');
        const audioVolume = document.getElementById('volume');
        const volumeControlFull = document.querySelector('.volume-control.full')
        const volumeControlMute = document.querySelector('.volume-control.mute')
        console.log(volumeControlFull, volumeControlMute)
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

    render() {
        return this.getContentFromHtmlСhunk(Settings.vars.templatePath);
    }
}