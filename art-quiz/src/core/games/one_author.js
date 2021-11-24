import Message from '../components/message';
import Timer from '../components/timer';
import Sound from '../components/sound';

export default class AuthorGame {
    static vars = {
        dbUrl: './data.json',
        dbUrlForFullImg: 'https://raw.githubusercontent.com/shadowinhaze/image-data/master/full',
        quastion: 'Who is the author of this picture?'
    }

    static gameVars = {
        activeRound: 0,
        gameScore: [],
        gameCollection: [],
        allAuthors: [],
        allRoundsGames: []
    }
    
    static async getDataFromDB() {
        try {
            const response = await fetch(AuthorGame.vars.dbUrl);
            const data = await response.json();
            AuthorGame.getAuthors(data.collection);
        } catch (err) {
            console.warn('Something went wrong.', err);
        }    
    }

    static async genQuestionImage(imgNum) {
        const response = await fetch(`${AuthorGame.vars.dbUrlForFullImg}/${imgNum}full.jpg`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return url;
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
                if (AuthorGame.checkAnswer(quastionButton.dataset.author)) {
                    AuthorGame.gameVars.gameScore.push({ round: AuthorGame.gameVars.activeRound, result: 1});
                    quastionButton.classList.add('right');
                    AuthorGame.setPaginationDotStatus('right');
                    if (AuthorGame.gameVars.gameScore.length < AuthorGame.gameVars.gameCollection.length) {
                        Timer.params.stop = true;
                        Sound.setTrack(Sound.tracks.right)
                        Sound.play();
                        Message.genNewMessage(Message.requests.right);
                    } else {
                        Timer.params.stop = true;
                        Sound.setTrack(Sound.tracks.end)
                        Sound.play();
                        AuthorGame.saveScore();
                        Message.genNewMessage(Message.requests.end);
                    }
                } else {
                    AuthorGame.gameVars.gameScore.push({ round: AuthorGame.gameVars.activeRound, result: 0});
                    quastionButton.classList.add('wrong');
                    AuthorGame.setPaginationDotStatus('wrong');
                    if (AuthorGame.gameVars.gameScore.length < AuthorGame.gameVars.gameCollection.length) {
                        Timer.params.stop = true;
                        Sound.setTrack(Sound.tracks.wrong)
                        Sound.play();
                        Message.genNewMessage(Message.requests.fail)
                    } else {
                        Timer.params.stop = true;
                        Sound.setTrack(Sound.tracks.end)
                        Sound.play();
                        AuthorGame.saveScore();
                        Message.genNewMessage(Message.requests.end);
                    }
                }
            })

            answerButtons.push(quastionButton)
        }
        return answerButtons;
    }

    static genCloseQuestion() {
        const closeButton = document.querySelector('.game-timer__close-game');
        closeButton.addEventListener('click', () => {
            Message.genNewMessage(Message.requests.stopGame)
        })
    }

    static genPagination(num) {
        const paginationContainer = document.querySelector('.main-quastion__pagination');
        for (let i = 0; i < num; i++) {
            const pagDot = document.createElement('div');
            pagDot.classList.add('pagination-dot');
            pagDot.addEventListener('click', () => {
                if (pagDot.classList.contains('active') || pagDot.classList.contains('wrong')) {
                    return;
                }
                AuthorGame.gameVars.activeRound = i;
                AuthorGame.setPaginationDotStatus('active');
                AuthorGame.setQuestion();
            })
            paginationContainer.append(pagDot);
        }
    }

    static setPaginationDotStatus(status) {
        const pagintaionDots = document.querySelectorAll('.pagination-dot');
        pagintaionDots.forEach((item, index) => {
            if (index === AuthorGame.gameVars.activeRound) {
                switch (status) {
                    case 'active':
                        item.classList.add(status)
                        break;
                    case 'right':
                        item.classList.replace('active', 'right')
                        break;
                    case 'wrong':
                        item.classList.replace('active', 'wrong')
                        break;
                }
            } else {
                item.classList.remove('active')
            }
        })
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

    static getAuthors(data) {
        const dbAuthors = new Set();
        data.forEach(item => dbAuthors.add(item.author));
        AuthorGame.gameVars.allAuthors = [...dbAuthors];
    }

    static getUnicGroup(firstItem, arr, num) {
        let result = new Set();
        result.add(firstItem);
        while (result.size !== num) {
            result.add(AuthorGame.getRandomItem(arr))
        }
        return [...result];
    }

    static genGameCollection() {
        AuthorGame.gameVars.gameCollection = JSON.parse(localStorage.activeCat).cat
    }

    static async genQuestion(round) {
        const roundItem = AuthorGame.gameVars.gameCollection[round];
        const winner = roundItem.author
        const imageUrl = await AuthorGame.genQuestionImage(roundItem.imageNum);
        const roundAnswers = AuthorGame.getUnicGroup(roundItem.author, AuthorGame.gameVars.allAuthors, 4);
        const buttons = AuthorGame.genAnswers(roundAnswers);

        return { winner, imageUrl, buttons }
    }

    static async genAllRoundsGames() {
        for (let i = 0; i < AuthorGame.gameVars.gameCollection.length; i++) {
            const item = await AuthorGame.genQuestion(i)
            AuthorGame.gameVars.allRoundsGames.push(item)
        }
    }

    static checkAnswer(data) {
        return (data === AuthorGame.gameVars.allRoundsGames[AuthorGame.gameVars.activeRound].winner) ? true : false ;
    }

    static saveScore() {
        let score = JSON.parse(localStorage.accountScore);
        let activeCatNum = JSON.parse(localStorage.activeCat).index;
        if (score.length === 0 || !score.some(item => item.category === activeCatNum)) score.push({ category: activeCatNum, score: AuthorGame.gameVars.gameScore })
        score = score.map(item => {
            console.log(item)
            return (item.category === activeCatNum) ? { category: activeCatNum, score: AuthorGame.gameVars.gameScore } : item;
        })
        localStorage.accountScore = JSON.stringify(score)
    }

    static setQuestion() {
        const imageUrl = AuthorGame.gameVars.allRoundsGames[AuthorGame.gameVars.activeRound].imageUrl;
        const buttons = AuthorGame.gameVars.allRoundsGames[AuthorGame.gameVars.activeRound].buttons;
        const questionImg = document.querySelector('.question-img');
        const questionAnswers = document.querySelector('.answer-block');
        questionImg.src = imageUrl;
        questionAnswers.innerHTML = '';
        buttons.forEach(item => questionAnswers.prepend(item));
        setTimeout(() => {
            Timer.startTimer();
        }, 400);
    }

    async render() {
        AuthorGame.genGameCollection();
        await AuthorGame.getDataFromDB();
        await AuthorGame.genAllRoundsGames();
        
        AuthorGame.genCloseQuestion();
        Timer.genTimer();

        AuthorGame.setQuestion();
        AuthorGame.genPagination(10);
        AuthorGame.setPaginationDotStatus('active');
    }
}