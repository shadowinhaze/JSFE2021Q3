import Screen from '../core/templates/screen';
import Game from '../core/game/one_author';
import Message from '../core/components/message';

export default class OneAuthorGameScreen extends Screen {
    static vars = {
        title: 'AQ | one author game',
        templatePath: './pages/html/game_author.html',
    };

    constructor(id) {
        super(id);
        this.setPageTitle(OneAuthorGameScreen.vars.title);
    }

    render() {
        return this.getContentFromHtmlСhunk(OneAuthorGameScreen.vars.templatePath);
    }

    start() {
        const main = document.querySelector('main');
        
        this.game = new Game();
        this.game.render();

        this.gameMessage = new Message();
        main.append(this.gameMessage.render());
    }
}