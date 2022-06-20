export default class Page {
    constructor(id) {
        this.id = id;
    }

    async getContentFromHtmlСhunk(path) {
        try {
            const response = await fetch(path);
            const html = await response.text();
            return html;
        } catch (err) {
            console.warn('Something went wrong.', err);
        }    
    }

    setPageTitle(str) {
        document.title = str;
    }
}