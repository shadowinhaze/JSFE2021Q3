import Screen from '../core/templates/screen';

export default class CatScreen extends Screen {
    static vars = {
        title: 'AQ | categories',
        templatePath: './pages/html/categories.html'
    };

    constructor(id) {
        super(id);
        this.setPageTitle(CatScreen.vars.title);
    }

    render() {
        return this.getContentFromHtmlСhunk(CatScreen.vars.templatePath);
    }
}