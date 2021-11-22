import MainScreen from './main';
import CatScreen from './categories';
import OneAuthorGameScreen from './game_author';
import Score from './score';

export const ScreenIds = {
    main: 'main',
    cats: 'categories',
    oneAuthorGame: 'one-author-game',
    score: 'score'
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
                switch (pageID) {
                    case ScreenIds.oneAuthorGame:
                        screen.start();
                        break;
                    case ScreenIds.cats:
                        screen.genCatItems();
                        break;
                    case ScreenIds.score:
                        screen.genCatItems();
                        break;
                }
            });
            App.container.id = pageID;
        }
    }

    static addMoveContorol() {
        const catItems = document.querySelectorAll('.category-card');
        console.log(catItems)
        catItems.forEach(catItem => {
            catItem.addEventListener('click', () => {
                console.log('clicked')
                App.renderNewPage(ScreenIds.oneAuthorGame)
            })
        })
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
        if (!localStorage.accountScore) {
            localStorage.accountScore = JSON.stringify([]);
        }
    }
}
