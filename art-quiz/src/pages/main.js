import Screen from '../core/templates/screen';

export default class MainScreen extends Screen {
    static vars = {
        title: 'Art-Quize game',
        templatePath: '../pages/html/main.html',
    };

    constructor(id) {
        super(id);
        this.setPageTitle(MainScreen.vars.title);
    }

    render() {
        return this.getContentFromHtmlСhunk(MainScreen.vars.templatePath);
    }
}