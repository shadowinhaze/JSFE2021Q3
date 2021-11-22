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

    static getAccountScore() {
        return (localStorage.accountScore) ? JSON.parse(localStorage.accountScore) : []; 
    }
    
    async genCatItems() {
        await Categories.getCatCovers();        
        const catsContainer = document.querySelector('.category-collection');
        const score = Categories.getAccountScore();

        Categories.entities.cats.forEach((cat, index) => {
            const catItem = document.createElement('div');
            let resultScore = null;

            if (score.length !== 0) {
                score.forEach(item => {
                    if (item.category === index) {
                        catItem.classList.add('category-card')
                        resultScore = item.score.reduce((total, e) => total + e.result, 0);
                        catItem.addEventListener('click', () => {
                            localStorage.activeCat = JSON.stringify({ index, cat });
                            window.location.hash = `#${ScreenIds.score}`
                        })
                    } else {
                        catItem.classList.add('category-card', 'unplayed');
                        catItem.addEventListener('click', () => {
                            localStorage.activeCat = JSON.stringify({ index, cat });
                            window.location.hash = `#${ScreenIds.oneAuthorGame}`
                        })
                    }
                })
            } else {
                catItem.classList.add('category-card', 'unplayed');
                catItem.addEventListener('click', () => {
                    localStorage.activeCat = JSON.stringify({ index, cat });
                    window.location.hash = `#${ScreenIds.oneAuthorGame}`
                })
            }
            
            catItem.innerHTML = `
                <div class="category-card__name">Part ${index + 1}</div>
                <div class="category-card__progress">${(resultScore !== null) ? `${resultScore} / 10` : '' }</div>
                <div class="category-card__layout" style="background-image: url(${Categories.entities.covers[index]})"></div>
            `

            if (resultScore !== null) {
                const playAgainButton = document.createElement('div');
                playAgainButton.classList.add('category-card__play-again-badge');
                playAgainButton.innerHTML = '<span></span> Play again';
                playAgainButton.addEventListener('click', (e) => {
                    localStorage.activeCat = JSON.stringify({ index, cat });
                    window.location.hash = `#${ScreenIds.oneAuthorGame}`
                    e.stopPropagation()
                })
                catItem.append(playAgainButton)
            }
            
            catsContainer.appendChild(catItem);
        })
    }

    async render() {
        await Categories.getDataFromDB();
        return this.getContentFromHtmlСhunk(Categories.vars.templatePath);
    }
}