import Message from '../components/message';
import Timer from '../components/timer';
import Sound from '../components/sound';
import Loader from '../components/loader';

export default class PicturesGame {
    static urls = {
        dbUrl: './data.json',
        dbUrlForFullImg: 'https://raw.githubusercontent.com/shadowinhaze/image-data/master/full',
    }

    static params = {
        activeRound: 0,
        gameScore: [],
        gameCollection: [],
        allWorks: [],
        allRoundsGames: []
    }

    static async getDataFromDB() {
        try {
            const response = await fetch(PicturesGame.urls.dbUrl);
            const data = await response.json();
            PicturesGame.getImgs(data.collection);
        } catch (err) {
            console.warn('Something went wrong.', err);
        }    
    }

    static genCloseQuestion() {
        const closeButton = document.querySelector('.game-timer__close-game');
        closeButton.addEventListener('click', () => {
            Message.genNewMessage(Message.requests.stopGame)
        })
    }

    static genPagination(num) {
        const paginationContainer = document.querySelector('.question-pagination');
        for (let i = 0; i < num; i++) {
            const pagDot = document.createElement('div');
            pagDot.classList.add('pagination-dot');
            paginationContainer.append(pagDot);
        }
    }

    static setPaginationDotStatus(status) {
        const pagintaionDots = document.querySelectorAll('.pagination-dot');
        pagintaionDots.forEach((item, index) => {
            if (index === PicturesGame.params.activeRound) {
                switch (status) {
                    case 'active':
                        item.classList.add(status)
                        break;
                    case 'right':
                        item.classList.replace('active', 'right')
                        break;
                    case 'fail':
                        item.classList.replace('active', 'fail')
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

    static getUnicGroup(knownItem, arr, num) {
        let result = new Set();
        result.add(JSON.stringify(knownItem));
        while (result.size !== num) {
            const addible = PicturesGame.getRandomItem(arr)
            if (addible.author !== knownItem.author) result.add(JSON.stringify(addible))
        }
        return [...result].map(item => JSON.parse(item));
    }

    static getImgs(data) {
        data.forEach(item => PicturesGame.params.allWorks.push({ author: item.author, img: item.imageNum }));
    }

    static setPaginationDotStatus(status) {
        const pagintaionDots = document.querySelectorAll('.pagination-dot');
        pagintaionDots.forEach((item, index) => {
            if (index === PicturesGame.params.activeRound) {
                switch (status) {
                    case 'active':
                        item.classList.add(status)
                        break;
                    case 'right':
                        item.classList.replace('active', 'right')
                        break;
                    case 'fail':
                        item.classList.replace('active', 'fail')
                        break;
                }
            } else {
                item.classList.remove('active')
            }
        })
    }

    static getGameCollection() {
        PicturesGame.params.gameCollection = JSON.parse(localStorage.activeCat).cat
    }

    static async genAllRoundsGames() {
        for (let i = 0; i < PicturesGame.params.gameCollection.length; i++) {
            const item = await PicturesGame.genQuestion(i)
            PicturesGame.params.allRoundsGames.push(item)
        }
    }

    static async genQuestionImage(imgNum) {
        const response = await fetch(`${PicturesGame.urls.dbUrlForFullImg}/${imgNum}full.jpg`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return url;
    }

    static checkAnswer(data) {
        const checkable = new TextDecoder().decode(new Uint8Array(data.split(',').map(item => +item)));
        return (checkable === PicturesGame.params.gameCollection[PicturesGame.params.activeRound].author) ? true : false ;
    }

    static saveScore() {
        let data = JSON.parse(localStorage.accountScore)
        const activeCatNum = JSON.parse(localStorage.activeCat).index;

        if (data.pictures.length === 0 || !data.pictures.some(item => item.category === activeCatNum)) {
            data.pictures.push({ category: activeCatNum, score: PicturesGame.params.gameScore })
        }

        data.pictures = data.pictures.map(item => {
            return (item.category === activeCatNum) ? { category: activeCatNum, score: PicturesGame.params.gameScore } : item;
        })

        localStorage.accountScore = JSON.stringify(data)
    }

    static async genAnswers(arr) {
        let answers = [];
        arr = PicturesGame.shuffle(arr);
        for (let i = 0; i < arr.length; i++) {
            const questionButtonImg = await PicturesGame.genQuestionImage(arr[i].img);
            const questionButton = document.createElement('div');
            questionButton.classList.add('picture-button', 'answer-button');
            
            questionButton.style.background = `center / contain no-repeat url(${questionButtonImg})`;
            questionButton.dataset.author = new TextEncoder().encode(arr[i].author);

            const setRound = (mode) => {
                if (mode === 'right') {
                    PicturesGame.params.gameScore.push({ round: PicturesGame.params.activeRound, result: 1});
                } else {
                    PicturesGame.params.gameScore.push({ round: PicturesGame.params.activeRound, result: 0});
                }
                questionButton.classList.add(mode);
                PicturesGame.setPaginationDotStatus(mode);
            }

            const nextGame = (mode) => {
                Timer.params.stop = true;
                Sound.setTrack(Sound.tracks[mode])
                Sound.play();
                Message.genNewMessage(Message.requests[mode])
            }

            const endGame = () => {
                Timer.params.stop = true;
                Sound.setTrack(Sound.tracks.end)
                Sound.play();
                PicturesGame.saveScore();
                Message.genNewMessage(Message.requests.end);
            }

            const action = (mode) => {
                setRound(mode)
                const lengthChecker = PicturesGame.params.gameScore.length < PicturesGame.params.gameCollection.length;
                lengthChecker ? nextGame(mode) : endGame()
            }

            questionButton.addEventListener('click', () => {
                PicturesGame.checkAnswer(questionButton.dataset.author) ? action('right') : action('fail');
            })
            
            answers.push(questionButton)
        }

        return answers;
    }

    static async genQuestion(round) {
        const roundItem = PicturesGame.params.gameCollection[round];
        const wanted = roundItem.author
        const wantedImg = roundItem.imageNum
        const roundAnswers = PicturesGame.getUnicGroup({author: wanted, img: wantedImg}, PicturesGame.params.allWorks, 4);
        const answers = PicturesGame.genAnswers(roundAnswers);
        return { wanted, answers }
    }

    static async setQuestion() {
        const author = PicturesGame.params.allRoundsGames[PicturesGame.params.activeRound].wanted;
        const answers = await PicturesGame.params.allRoundsGames[PicturesGame.params.activeRound].answers;
        const questionStr = document.querySelector('.main-question');
        const answersContainer = document.querySelector('.answer-block');
       
        questionStr.innerText = `Which is ${author} picture?`
        answersContainer.innerHTML = '';

        answers.forEach(item => answersContainer.append(item));
        setTimeout(() => {
            Timer.startTimer();
        }, 400);
    }

    async render() {
        PicturesGame.getGameCollection();
        await PicturesGame.getDataFromDB();
        await PicturesGame.genAllRoundsGames();
        PicturesGame.genCloseQuestion();
        
        Timer.genTimer();

        PicturesGame.setQuestion();
        PicturesGame.genPagination(10);
        PicturesGame.setPaginationDotStatus('active');
        Loader.endLoading();
    }
} 