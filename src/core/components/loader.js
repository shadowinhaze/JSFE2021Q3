export default class Loader {
    static loaderEl = null;
    
    static startLoading() {
        Loader.loaderEl = document.createElement('div')
        Loader.loaderEl.classList.add('loader')
        Loader.loaderEl.innerHTML = `
        <div class="circles">
            <span class="circle circle-1"></span>
            <span class="circle circle-2"></span>
            <span class="circle circle-3"></span>
            <span class="circle circle-4"></span>
            <span class="circle circle-5"></span>
            <span class="circle circle-6"></span>
            <span class="circle circle-7"></span>
            <span class="circle circle-8"></span>
        </div>
        `
        document.body.appendChild(Loader.loaderEl);
    }

    static endLoading() {
        document.body.removeChild(Loader.loaderEl)
    }
}