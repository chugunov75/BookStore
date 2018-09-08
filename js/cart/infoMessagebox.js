class InfoMessagebox extends Popup {
    constructor(options) {

        options = Object.assign({
            message: 'mesage',
            width: '500px',
            className: '',
            parent: null,
            onCloseCallback: function () {}

        }, options);

        super(options);

        // this.btnYes;
    }
    init(options) {

        let content = Popup.createElem('div', '');

        let msg = Popup.createElem('p', options.className, content);
        msg.textContent = options.message;
        let btnContainer = Popup.createElem('div', 'msg-btn-container', content);

        let buttons = [{ propName: 'btnYes', className: 'btn btn-bordered', text: 'Да' }, { propName: 'btnNo', className: 'btn btn-bordered', text: 'Нет' }];
        this.btnYes = Popup.createElem('button', 'btn btn-bordered', btnContainer);
        this.btnYes.textContent = 'OK';

        options.title = 'Сообщение';
        options.content = content;

        super.init(options);
        this.btnYes.focus();
    }
    setHandlers() {
        super.setHandlers();
        let self = this;
        this.btnYes.addEventListener('click', function (e) {
            self.close();
        });
    }

}