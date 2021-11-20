import '@scss/main.scss';
import Game from './pages/app';


const settingsButton = document.getElementById('settings');
settingsButton.addEventListener('click', function () {
    if (document.body.dataset.page === 'main-screen') {
        document.body.dataset.page = 'setting-screen';
    } else {
        document.body.dataset.page = 'main-screen';
    }
    this.classList.toggle('close');
})

const test = new Game();
test.init();