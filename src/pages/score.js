import Screen from '../core/templates/screen';
import Loader from '../core/components/loader';

export default class Score extends Screen {
    static vars = {
        title: 'AQ | score',
        templatePath: './pages/html/score.html',
        dbUrl: './data.json',
        dbUrlForRecImg: 'https://raw.githubusercontent.com/shadowinhaze/image-data/master/img',
    };

    static entities = {
        activeCollection: [],
        covers: [],
    };

    static getActiveCat() {
        const collection = JSON.parse(localStorage.activeCat)
        Score.entities.activeCollection = collection;
    }

    static async getItemImageUrl(imgNum) {
        const response = await fetch(`${Score.vars.dbUrlForRecImg}/${imgNum}.jpg`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return url;
    }

    static async getActiveCatCovers() {
        for (let i = 0; i < Score.entities.activeCollection.cat.length; i++) {
            const cover = await Score.getItemImageUrl(Score.entities.activeCollection.cat[i].imageNum)
            Score.entities.covers.push(cover);
            if (Score.entities.covers.length === Score.entities.activeCollection.cat.length) Loader.endLoading();
        }
    }

    static getAccountScore() {
        return JSON.parse(localStorage.accountScore)[localStorage.mode];
    }

    async genCatItems() {
        await Score.getActiveCatCovers();
        const score = Score.getAccountScore();
        let results = []
        score.forEach(cat => {
            if (cat.category === Score.entities.activeCollection.index) {
                results = cat.score.sort((a, b) => a.round > b.round)
            }
        })
        const catsContainer = document.querySelector('.category-collection');
        Score.entities.activeCollection.cat.forEach((item, index) => {
            const catItem = document.createElement('div');
            if (results[index].result) {
                catItem.classList.add('category-card'); 
            } else {
                catItem.classList.add('category-card', 'unplayed');
            }
            catItem.innerHTML = `
                <div class="category-card__layout" style="background-image: url(${Score.entities.covers[index]})"></div>
            `

            const playAgainButton = document.createElement('div');
            playAgainButton.classList.add('category-card__info-badge');
            playAgainButton.innerHTML = `
            <div class="info-badge__content">
                <h3 class="info-badge-header">${item.name}</h3>
                <div>${item.author}, ${item.year}</div>
            </div>`;
            catItem.append(playAgainButton)

            catsContainer.appendChild(catItem);
        })
            
    }

    async render() {
        Score.getActiveCat()
        return this.getContentFromHtmlСhunk(Score.vars.templatePath);
    };

}