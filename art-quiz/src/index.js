import '@scss/main.scss';
// import { visitFunctionBody } from 'typescript';
// import Test from '@modules/date_time.js';


const settingsButton = document.getElementById('settings');
settingsButton.addEventListener('click', function () {
    if (document.body.dataset.page === 'main-screen') {
        document.body.dataset.page = 'setting-screen';
    } else {
        document.body.dataset.page = 'main-screen';
    }
    this.classList.toggle('close');
})
