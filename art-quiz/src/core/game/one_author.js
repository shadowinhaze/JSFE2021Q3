import Message from '../components/message';

export default class AuthorGame {
    static vars = {
        dbUrl: './data.json',
        dbUrlForFullImg: 'https://raw.githubusercontent.com/shadowinhaze/image-data/master/full',
        quastion: 'Who is the author of this picture?'
    }

    constructor() {
        this.activeRound = 0;
    }

    static async getDataFromDB() {
        try {
            const response = await fetch(AuthorGame.vars.dbUrl);
            const data = await response.json();
            return data.collection;
        } catch (err) {
            console.warn('Something went wrong.', err);
        }    
    }

    static async genQuastionImage(imgNum) {
        const response = await fetch(`${AuthorGame.vars.dbUrlForFullImg}/${imgNum}full.jpg`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const quastionImg = document.createElement('img');
        quastionImg.src = url;
        return quastionImg;
    }

    static genAnswers(arr) {
        let answerButtons = [];
        arr = AuthorGame.shuffle(arr);
        for (let i = 0; i < arr.length; i++) {
            const quastionButton = document.createElement('button');
            quastionButton.classList.add('default-button', 'answer-button');
            quastionButton.innerText = arr[i];
            quastionButton.addEventListener('click', () => {
                document.querySelector('.message').classList.toggle('visible');
            })
            answerButtons.push(quastionButton)
        }
        return answerButtons;
    }

    static genPagination(num) {
        const paginationContainer = document.querySelector('.main-quastion__pagination');
        for (let i = 0; i < num; i++) {
            const pagDot = document.createElement('div');
            pagDot.classList.add('pagination-dot');
            paginationContainer.append(pagDot)
        }
    }

    static shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr
    }

    static getRandomItem(arr) {
        return arr[Math.floor(Math.random()*arr.length)];
    }

    static async getAuthors() {
        const dbPull = await AuthorGame.getDataFromDB();
        const dbAuthors = new Set();
        dbPull.forEach(item => dbAuthors.add(item.author))
        return [...dbAuthors];
    }

    static getUnicGroup(firstItem, arr, num) {
        let result = new Set();
        result.add(firstItem);
        while (result.size !== num) {
            result.add(AuthorGame.getRandomItem(arr))
        }
        return [...result];
    }

    static async getGameCollection() {
        const dbPull = await AuthorGame.getDataFromDB();
        return dbPull.splice(0, 10);
    }

    static async genQuastion(active) {
        const authors = await AuthorGame.getAuthors();
        const gameCollection = await AuthorGame.getGameCollection();
        const roundItem = gameCollection[active];
        
        const image = await AuthorGame.genQuastionImage(roundItem.imageNum);
        const roundQustioins = AuthorGame.getUnicGroup(roundItem.author, authors, 4);
        const buttons = AuthorGame.genAnswers(roundQustioins);

        return { image, buttons }
    }

    async render() {
        const { image, buttons } = await AuthorGame.genQuastion(this.activeRound);
        const quastionImg = document.querySelector('.main-quastion__layout');
        const quastionAnswers = document.querySelector('.answer-block');
        
        quastionImg.prepend(image);
        buttons.forEach(item => quastionAnswers.prepend(item));
        AuthorGame.genPagination(10);
    }

}