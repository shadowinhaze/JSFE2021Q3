import MainScreen from './main';
import CatScreen from './categories';
import OneAuthorGameScreen from './game_author';


export const ScreenIds = {
    main: 'main-screen',
    cats: 'categories-screen',
    oneAuthorGame: 'one-author-game'
}

export default class App {
    static container = document.body;

    static renderNewPage(pageID) {
        App.container.innerHTML = '';
        let screen = null;
        let readyForGame = false;
        switch (pageID) {
            case ScreenIds.main:
                screen = new MainScreen(pageID)
                break;
            case ScreenIds.cats:
                screen = new CatScreen(pageID)
                break;
            case ScreenIds.oneAuthorGame:
                screen = new OneAuthorGameScreen(pageID);
                readyForGame = true;
                break;
        }

        if (screen) {
            screen.render().then(templateOfThePage => {
                App.container.innerHTML = templateOfThePage;
                if (readyForGame) {
                    screen.setQuestion();
                    const main = document.querySelector('main');
                    main.append(screen.setMessage())
                }
            });
            App.container.dataset.page = pageID;
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
