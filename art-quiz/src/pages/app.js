import MainScreen from './main';
import CatScreen from './categories';
import OneAuthorGameScreen from './game_author';


export const ScreenIds = {
    main: 'main',
    cats: 'categories',
    oneAuthorGame: 'one-author-game'
}

export default class App {
    static container = document.body;

    static renderNewPage(pageID) {
        App.container.innerHTML = '';
        let screen = null;
        let isReadyForGame = false;
        switch (pageID) {
            case ScreenIds.main:
                screen = new MainScreen(pageID)
                break;
            case ScreenIds.cats:
                screen = new CatScreen(pageID)
                break;
            case ScreenIds.oneAuthorGame:
                screen = new OneAuthorGameScreen(pageID);
                isReadyForGame = true;
                break;
        }

        if (screen) {
            screen.render().then(templateOfThePage => {
                App.container.innerHTML = templateOfThePage;
                if (isReadyForGame) {
                    screen.start();
                }
            });
            App.container.id = pageID;
        }
    }

    enableRouter() {
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
        this.enableRouter();
    }
}
