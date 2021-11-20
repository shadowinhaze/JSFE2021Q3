export default class Message {
    static vars = {
        next: 'next',
        confirm: 'confirm'
    }

    static container = document.createElement('div')

    constructor() {
        Message.container.classList.add('message');
        Message.container.innerHTML = `
        <div class="message-container">
            <button class="close"></button>
            <div class="message__content">
                <p class="message__content__text"></p>
            </div>
            <div class="button-block"></div>
        </div>`;
    }

    static addNextButton() {
        const buttonBlock = Message.container.querySelector('.button-block');
        const button = document.createElement('button');

        button.classList.add('default-button', 'dark');
        button.innerText = 'Next';
        buttonBlock.append(button);
    }

    // static addConfirmButtons() {
    //     const buttonBlock = document.querySelector('.button-block');
    //     const buttonNo = document.createElement('button');
    //     const buttonYes = document.createElement('button');

    //     buttonNo.classList.add('default-button', 'dark', 'rejection');
    //     buttonYes.classList.add('default-button', 'dark', ' confirmation');

    //     buttonBlock.append(buttonNo, buttonYes);
    // }

    static addCloseAction() {
        const closeButton = Message.container.querySelector('.close');
        closeButton.addEventListener('click', () => {
            this.container.classList.remove('visible');
        })
    }
    
    static addMessageText(str) {
        const messageText = Message.container.querySelector('.message__content__text');
        messageText.innerText = str;
    }

    render() {
        Message.addCloseAction();
        Message.addMessageText('Продолжай');
        Message.addNextButton();

        // switch (str) {
        //     case MessageGame.vars.next:
        //         MessageGame.addNextButton();
        //         break;
        //     case MessageGame.vars.confirm:
        //         MessageGame.addConfirmButtons();
        //         break;
        // }
        return Message.container;
    }

}