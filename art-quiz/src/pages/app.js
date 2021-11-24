import MainScreen from './main';
import HomeButtons from '../core/components/homebuttons';
import CatScreen from './categories';
import OneAuthorGameScreen from './game_author';
import Score from './score';
import Settings from '../core/components/settings';
import Sound from '../core/components/sound';

export const ScreenIds = {
    main: 'main',
    cats: 'categories',
    oneAuthorGame: 'one-author-game',
    score: 'score',
}

export default class App {
    static container = document.body;
    
    static renderNewPage(pageID) {
        App.container.innerHTML = '';
        let screen = null;

        switch (pageID) {
            case ScreenIds.main:
                screen = new MainScreen(pageID);
                break;
            case ScreenIds.cats:
                screen = new CatScreen(pageID);
                break;
            case ScreenIds.oneAuthorGame:
                screen = new OneAuthorGameScreen(pageID);
                break;
            case ScreenIds.score:
                screen = new Score(pageID)
                break;
        }

        if (screen) {
            screen.render().then(templateOfThePage => {
                App.container.innerHTML = templateOfThePage;
                const mainBlock = App.container.querySelector('main');
                switch (pageID) {
                    case ScreenIds.main:
                        HomeButtons.genHomeButtons();
                        Sound.setAudioVar();
                        Settings.render();
                        mainBlock.append(Settings.box);
                        break;
                    case ScreenIds.oneAuthorGame:
                        screen.start();
                        Sound.setAudioVar();
                        break;
                    case ScreenIds.cats:
                        screen.genCatItems();
                        Settings.render();
                        mainBlock.append(Settings.box);
                        Sound.setAudioVar();
                        break;
                    case ScreenIds.score:
                        screen.genCatItems();
                        Sound.setAudioVar();
                        Settings.render();
                        mainBlock.append(Settings.box);
                        break;
                }
            });
            App.container.id = pageID;
        }
    }

    static enableRouter() {
        const hash = window.location.hash.slice(1);
        if (hash !== '') {
            App.renderNewPage(hash);
        } else {
            App.renderNewPage(ScreenIds.main);
        }
        window.addEventListener('hashchange', () => {
            const newHash = window.location.hash.slice(1);
            App.renderNewPage(newHash);
        })
    }

    init() {
        App.enableRouter();
        if (!localStorage.accountScore) {
            localStorage.accountScore = JSON.stringify([]);
        }
    }
}
