import Screen from '../core/templates/screen';
import { ScreenIds } from './app';
import Sound from '../core/components/sound';
import Loader from '../core/components/loader';

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
            if (localStorage.mode === 'artist') {
                Categories.genCatsList(data.collection, 10, [0, 12]);
            } else {
                Categories.genCatsList(data.collection, 10, [12]);
            }
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
            if (Categories.entities.covers.length === Categories.entities.cats.length) Loader.endLoading();
        }
    }

    static getAccountScore() {
        return JSON.parse(localStorage.accountScore); 
    }
    
    async genCatItems() {
        await Categories.getCatCovers();
        const catsContainer = document.querySelector('.category-collection');
        const score = Categories.getAccountScore()[localStorage.mode];
        const playedCats = score.map(cat => {
            const result = cat.score.reduce((total, e) => total + e.result, 0);
            return { category: cat.category, result: result }
        }).sort((a, b) => a.category > b.category)
        
        const checkInPlayed = (index) => {
            let result = false;
            let place = null;
            playedCats.forEach((cat, i) => {
                if (cat.category === index) {
                    result = true;
                    place = i;
                }
            })
            
            return [result, place];
        }

        Categories.entities.cats.forEach((cat, index) => {
            const catItem = document.createElement('div');
            const isPlayed = checkInPlayed(index)
            if (isPlayed[0]) {
                catItem.classList.add('category-card')
                catItem.addEventListener('click', () => {
                    localStorage.activeCat = JSON.stringify({ index, cat });
                    window.location.hash = `#${ScreenIds.score}`
                    location.reload();
                })
                catItem.innerHTML = `
                <div class="category-card__name">Part ${index + 1}</div>
                <div class="category-card__progress">${playedCats[isPlayed[1]].result} / 10</div>
                <div class="category-card__layout" style="background-image: url(${Categories.entities.covers[index]})"></div>
                `
                const playAgainButton = document.createElement('div');
                playAgainButton.classList.add('category-card__play-again-badge');
                playAgainButton.innerHTML = '<span></span> Play again';
                playAgainButton.addEventListener('click', (e) => {
                    localStorage.activeCat = JSON.stringify({ index, cat });
                    window.location.hash = `#${ScreenIds.game}`
                    location.reload();
                    e.stopPropagation()
                })
                catItem.append(playAgainButton)
            } else {
                catItem.classList.add('category-card', 'unplayed');
                catItem.innerHTML = `
                <div class="category-card__name">Part ${index + 1}</div>
                <div class="category-card__progress"></div>
                <div class="category-card__layout" style="background-image: url(${Categories.entities.covers[index]})"></div>
                `
                catItem.addEventListener('click', () => {
                    localStorage.activeCat = JSON.stringify({ index, cat });
                    window.location.hash = `#${ScreenIds.game}`
                    location.reload();
                })
            }
            catsContainer.appendChild(catItem);
        })
    }

    async render() {
        await Categories.getDataFromDB();
        return this.getContentFromHtmlСhunk(Categories.vars.templatePath);
    }
}