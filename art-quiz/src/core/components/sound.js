export default class Sound {
    static tracks = {
        click: './assets/sounds/click.wav',
        right: './assets/sounds/correctanswer.mp3',
        wrong: './assets/sounds/wronganswer.mp3',
        end: './assets/sounds/endround.mp3',
    }
    
    static audio = null;

    static setAudioVar() {
        Sound.audio = document.getElementById('audio')
    }

    static setTrack(track) {
        Sound.audio.src = track
    }

    static play() {
        const method = Sound.audio.paused ? 'play' : 'pause';
        Sound.audio[method]();
    }

    static setVolume(value) {
        Sound.audio.volume = value;
    }
    
}