class ConfirmMessagebox extends Popup {
    constructor(options) {

        options = Object.assign({
            message: 'mesage',
            width: '500px',
            className: '',
            parent: null,
            onCloseCallback: function (result) {}

        }, options);

        super(options);

        // this.btnYes;
        // this.btnNo;
        /*публичное свойство, содержащее true если была нажата кнопка подтвердить*/
        this.result = false;
        /*переменная для записи функции обратного вызова из внешнего кода*/
        this.onCloseCallback = () => {
            options.onCloseCallback(this.result);
        };
    }
    init(options) {

        let content = Popup.createElem('div', '');

        let msg = Popup.createElem('p', options.className, content);
        msg.textContent = options.message;
        let btnContainer = Popup.createElem('div', 'msg-btn-container', content);

        let buttons = [{ propName: 'btnYes', className: 'btn btn-bordered', text: 'Да' }, { propName: 'btnNo', className: 'btn btn-bordered', text: 'Нет' }];

        for (let i = 0; i < buttons.length; i++) {
            this[buttons[i].propName] = Popup.createElem('button', buttons[i].className, btnContainer);
            this[buttons[i].propName].textContent = buttons[i].text;
        }

        options.title = 'Подтверждение действия';
        options.content = content;

        super.init(options);
        this.btnNo.focus();
    }
    setHandlers() {
        super.setHandlers();
        let self = this;
        this.btnYes.addEventListener('click', function (e) {
            self.result = true;
            self.close();
        });
        this.btnNo.addEventListener('click', function (e) {
            self.result = false;
            self.close();
        });
    }

}