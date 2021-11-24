import OAG from '../games/one_author';
import Timer from './timer';
import endCongr from '@svg/end-game.svg'

export default class Message {
    static vars = {
        next: 'next',
        confirm: 'confirm',
        rightMessage: 'You are right!',
        wrongMessage: 'You are wrong :(',
        endGameMessage: 'Hurra! Finish!',
        dbUrlForRecImg: 'https://raw.githubusercontent.com/shadowinhaze/image-data/master/img'
    }

    static requests = {
        stopGame: 'Do you really want to quit the game?',
        fail: 'fail',
        right: 'right',
        end: 'end'
    }

    static container = null;

    static async getMessageCover(imgNum) {
        const response = await fetch(`${Message.vars.dbUrlForRecImg}/${imgNum}.jpg`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return url;
    }

    static genNextButton() {
        const buttonContainer = Message.container.querySelector('.button-block');
        const buttonNext = document.createElement('button');

        buttonNext.classList.add('default-button', 'dark', 'next');
        buttonNext.innerText = 'Next';

        buttonNext.addEventListener('click', () => {
            if (OAG.gameVars.activeRound < 10) {
                OAG.gameVars.activeRound += 1
            }
            Timer.params.stop = false;
            Timer.params.time = Timer.params.allTime;
            Timer.showTimerTime();
            OAG.setQuestion();
            OAG.setPaginationDotStatus('active');
            Message.container.classList.toggle('visible');
        });
        if (!buttonContainer.hasChildNodes()) {
            buttonContainer.append(buttonNext);
        }
    }

    static showResult() {
        const messContainer = Message.container.querySelector('.message__content');
        messContainer.innerHTML = '';
        const result = OAG.gameVars.gameScore.reduce((total, item) => total + item.result, 0);
        messContainer.innerHTML = `
        <div class="message-layout end" style="background-image: url(${endCongr});"></div>
        <h3 class="message-picture-name message__content__h">Congratulations!</h3>
        <div class="message-result">${result}/10</div>
        `
    }

    static addCloseButton() {
        const place = Message.container.querySelector('.message-container');
        const closeButton = document.createElement('button')
        closeButton.classList.add('close');
        closeButton.addEventListener('click', () => {
            Message.container.classList.remove('visible');
        })
        place.prepend(closeButton);
        
    }

    static genHomeButton() {
        const buttonContainer = Message.container.querySelector('.button-block');
        const buttonHome = document.createElement('button');
        buttonHome.classList.add('default-button', 'dark', 'home');
        buttonHome.innerText = 'Home';
        buttonHome.addEventListener('click', () => {
            window.location.hash = '#main'
        })
        buttonContainer.append(buttonHome);
    }

    static addConfirmButtons() {
        const buttonBlock = Message.container.querySelector('.button-block');
        const buttonNo = document.createElement('button');
        const buttonYes = document.createElement('button');

        buttonNo.classList.add('default-button', 'dark', 'cancel');
        buttonYes.classList.add('default-button', 'dark', 'confirm');

        buttonNo.innerText = 'Cancel';
        buttonYes.innerText = 'Yes';

        buttonNo.addEventListener('click', () => {
            Message.container.classList.remove('visible');
        })

        buttonYes.addEventListener('click', () => {
            window.location.hash = '#categories'
        })

        buttonBlock.append(buttonNo, buttonYes);
    }

    static setMessageBadge(bool) {
        const badge = Message.container.querySelector('.badge')
        if (bool) {
            badge.classList.add('right')
            badge.innerText = '+'
        } else {
            badge.classList.add('fail')
            badge.innerText = '×'
        }
    }

    static setMessageText(str) {
        const messageText = Message.container.querySelector('.message__content');
        messageText.innerHTML = `<h3 class="message__content__h">${str}</h3>`;
    }

    static async genNewMessage(request) {
        const main = document.querySelector('main');
        const prevMessage = main.querySelector('.message');
        if (prevMessage) {
            Message.container = prevMessage;
        } else {
            Message.container = document.createElement('div');
            Message.container.classList.add('message');
        }
        const roundItem = OAG.gameVars.gameCollection[OAG.gameVars.activeRound]
        const coverUrl = await Message.getMessageCover(roundItem.imageNum);

        Message.container.innerHTML = `
        <div class="message-container">
            <div class="message__content">
                <div class="message-layout" style="background-image: url(${coverUrl});"><span class="badge"></span></div>
                <h3 class="message-picture-name message__content__h">${roundItem.name}</h3>
                <div class="message-author">${roundItem.author}, ${roundItem.year}</div>
            </div>
            <div class="button-block"></div>
        </div>
        `;

        switch (request) {
            case Message.requests.stopGame:
                Message.setMessageText(Message.requests.stopGame);
                Message.addCloseButton();
                Message.addConfirmButtons();
                break;
            case Message.requests.fail:
                Message.setMessageBadge(0);
                Message.genNextButton();
                break;
            case Message.requests.right:
                Message.setMessageBadge(1);
                Message.genNextButton();
                break;
            case Message.requests.end:
                Message.showResult();
                Message.genHomeButton();
                break;
        }

        if (!prevMessage) {
            main.append(Message.container);
        }
        
        Message.container.classList.toggle('visible');
    }
    
}