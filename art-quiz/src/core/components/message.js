import OAG from '../game/one_author'

export default class Message {
    static vars = {
        next: 'next',
        confirm: 'confirm',
        rightMessage: 'You are right!',
        wrongMessage: 'You are wrong :(',
        endGameMessage: 'Hurra! Finish!'
    }

    static container = document.createElement('div')

    constructor() {
        Message.container.classList.add('message');
        Message.container.innerHTML = `
        <div class="message-container">
            <div class="message__content">
                <p class="message__content__text"></p>
            </div>
            <div class="button-block"></div>
        </div>`;
    }

    static genNextButton() {
        const buttonContainer = Message.container.querySelector('.button-block');
        const button = document.createElement('button');

        button.classList.add('default-button', 'dark', 'next');
        button.innerText = 'Next';

        button.addEventListener('click', () => {
            if (OAG.gameVars.activeRound < 10) {
                OAG.gameVars.activeRound += 1
            }
            OAG.setQuestion();
            OAG.setPaginationDotStatus('active');
            Message.container.classList.toggle('visible');
        });

        if (!buttonContainer.hasChildNodes()) {
            buttonContainer.append(button);
        }
    }

    static showResult() {
        const buttonContainer = Message.container.querySelector('.button-block');
        buttonContainer.innerHTML = '';
        const result = OAG.gameVars.gameScore.reduce((total, item) => total + item.result, 0);
        const resultMess = document.createElement('p');
        resultMess.innerText = `You result: ${result}/10`
        buttonContainer.append(resultMess)
    }

    static addCloseButton() {
        const closeButton = document.createElement('button')
        closeButton.classList.add('.close');
        closeButton.addEventListener('click', () => {
            this.container.classList.remove('visible');
        })
        Message.container.prepend(closeButton);
    }

    static setMessageText(str) {
        const messageText = Message.container.querySelector('.message__content__text');
        messageText.innerText = str;
    }

    // static addConfirmButtons() {
    //     const buttonBlock = document.querySelector('.button-block');
    //     const buttonNo = document.createElement('button');
    //     const buttonYes = document.createElement('button');

    //     buttonNo.classList.add('default-button', 'dark', 'rejection');
    //     buttonYes.classList.add('default-button', 'dark', ' confirmation');

    //     buttonBlock.append(buttonNo, buttonYes);
    // }

    render() {
        return Message.container;
    }

}