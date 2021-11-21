import Message from '../components/message';

export default class AuthorGame {
    static vars = {
        dbUrl: './data.json',
        dbUrlForFullImg: 'https://raw.githubusercontent.com/shadowinhaze/image-data/master/full',
        quastion: 'Who is the author of this picture?'
    }

    static roundWinner = '';
    
    constructor() {
        localStorage.setItem('AGActiveRound', '0');
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

    static async genQuestionImage(imgNum) {
        const response = await fetch(`${AuthorGame.vars.dbUrlForFullImg}/${imgNum}full.jpg`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const quastionImg = document.createElement('img');
        quastionImg.classList.add('question-img');
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
            quastionButton.dataset.author = arr[i];
            
            quastionButton.addEventListener('click', function() {
                const message = document.querySelector('.message')
                message.classList.toggle('visible');
                if (AuthorGame.checkAnswer(quastionButton.dataset.author)) {
                    quastionButton.classList.add('right');
                    Message.setMessageText(Message.vars.rightMessage);
                    Message.genNextButton();
                } else {
                    quastionButton.classList.add('wrong');
                    Message.setMessageText(Message.vars.wrongMessage);
                    Message.genNextButton();
                }
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

    static async genQuestion() {
        const authors = await AuthorGame.getAuthors();
        const gameCollection = await AuthorGame.getGameCollection();
        const roundItem = gameCollection[+localStorage.AGActiveRound];
        AuthorGame.roundWinner = roundItem.author;
        
        const image = await AuthorGame.genQuestionImage(roundItem.imageNum);
        const roundQuestions = AuthorGame.getUnicGroup(roundItem.author, authors, 4);
        const buttons = AuthorGame.genAnswers(roundQuestions);

        return { image, buttons }
    }

    static checkAnswer(data) {
        if (data === AuthorGame.roundWinner) {
            return true;
        } else {
            return false;
        }
    }

    static async newRoundRender() {
        const { image, buttons } = await AuthorGame.genQuestion();
        const questionImg = document.querySelector('.question-img');
        const questionAnswers = document.querySelector('.answer-block');

        questionImg.src = image.src;
        questionAnswers.innerHTML = '';
        buttons.forEach(item => questionAnswers.prepend(item));
    }

    async render() {
        const { image, buttons } = await AuthorGame.genQuestion();
        const questionImg = document.querySelector('.main-quastion__layout');
        const questionAnswers = document.querySelector('.answer-block');
        
        questionImg.innerHTML = '<div class="main-quastion__pagination"></div>'
        questionImg.prepend(image);
        AuthorGame.genPagination(10);

        questionAnswers.innerHTML = '';
        buttons.forEach(item => questionAnswers.prepend(item));
    }
}