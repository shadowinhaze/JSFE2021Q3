import Screen from '../core/templates/screen';
import Game from '../core/game/one_author';
import Message from '../core/components/message';

export default class OneAuthorGameScreen extends Screen {
    static vars = {
        title: 'AQ | one author game',
        templatePath: '../pages/html/game_author.html',
    };

    constructor(id) {
        super(id);
        this.setPageTitle(OneAuthorGameScreen.vars.title);
    }

    render() {
        return this.getContentFromHtmlСhunk(OneAuthorGameScreen.vars.templatePath);
    }

    setQuestion() {
        const game = new Game();
        game.render();
    }

    setMessage() {
        const message = new Message();
        return message.render();
    }
}