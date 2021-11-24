export default class Loader {
    static loaderEl = null;
    
    static startLoading() {
        Loader.loaderEl = document.createElement('div')
        Loader.loaderEl.classList.add('loader')
        document.body.appendChild(Loader.loaderEl);
    }

    static endLoading() {
        document.body.removeChild(Loader.loaderEl)
    }
}