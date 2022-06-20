import Screen from '../core/templates/screen';
import GameArtist from '../core/games/artist';
import GamePictures from '../core/games/pictures';

export default class GameController extends Screen {
    static params = {
        titleArtist: 'AQ | Artist game',
        titlePictures: 'AQ | Pictures game',
        templateArtistPath: './pages/html/game_author.html',
        templatePicturesPath: './pages/html/game_pictures.html',
    };

    constructor(id) {
        super(id);
        if (localStorage.mode === 'artist') {
            this.setPageTitle(GameController.params.titleArtist);
        } else {
            this.setPageTitle(GameController.params.titlePictures);
        } 
    }

    render() {
        if (localStorage.mode === 'artist') {
            return this.getContentFromHtmlСhunk(GameController.params.templateArtistPath);
        } else {
            return this.getContentFromHtmlСhunk(GameController.params.templatePicturesPath);
        } 
    }

    start() {
        if (localStorage.mode === 'artist') {
            this.game = new GameArtist();
            this.game.render();
        } else {
            this.game = new GamePictures();
            this.game.render();
        }
    }
}