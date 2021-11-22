import Screen from '../core/templates/screen';
import { ScreenIds } from './app';

export default class Categories extends Screen {
    static vars = {
        title: 'AQ | categories',
        templatePath: './pages/html/categories.html',
        dbUrl: './data.json',
        dbUrlForRecImg: 'https://raw.githubusercontent.com/shadowinhaze/image-data/master/img',
    };

    static entities = {
        cats: [],
        covers: [],
    };

    constructor(id) {
        super(id);
        this.setPageTitle(Categories.vars.title);
    }

    static async getDataFromDB() {
        try {
            const response = await fetch(Categories.vars.dbUrl);
            const data = await response.json();
            Categories.genCatsList(data.collection, 10, [0, 12]);
        } catch (err) {
            console.warn('Something went wrong.', err);
        }    
    }

    static async genCatImage(imgNum) {
        const response = await fetch(`${Categories.vars.dbUrlForRecImg}/${imgNum}.jpg`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return url;
    }

    static genCatsList(data, perChunk, amount) {
        Categories.entities.cats = data.reduce((container, chunk, index) => {
            const chunkIndex = Math.floor(index / perChunk)
            if (!container[chunkIndex]) container[chunkIndex] = []
            container[chunkIndex].push(chunk)
            return container
        }, []).slice(amount[0], amount[1]);
    }

    static async getCatCovers() {
        for (let i = 0; i < Categories.entities.cats.length; i++) {
            const cover = await Categories.genCatImage(Categories.entities.cats[i][0].imageNum)
            Categories.entities.covers.push(cover);
        }
    }
    
    async genCatItems() {
        await Categories.getCatCovers();
        const catsContainer = document.querySelector('.category-collection');
        Categories.entities.cats.forEach((cat, index) => {
            const catItem = document.createElement('div');
            catItem.classList.add('category-card');
            catItem.innerHTML = `
                <div class="category-card__name">Part ${index + 1}</div>
                <div class="category-card__progress"></div>
                <div class="category-card__layout" style="background-image: url(${Categories.entities.covers[index]})"></div>
            `
            catItem.addEventListener('click', () => {
                localStorage.activeCat = JSON.stringify({ index, cat });
                window.location.hash = `#${ScreenIds.oneAuthorGame}`
            })
            catsContainer.appendChild(catItem);
        })
    }

    async render() {
        await Categories.getDataFromDB();
        return this.getContentFromHtmlСhunk(Categories.vars.templatePath);
    }
}