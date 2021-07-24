export default class LoadNMoreBtn {
    constructor({ selector, hidden = false }) {
        this.refs = this.getRefs(selector);
        hidden && hide();
    }
    
    getRefs(selector) {
        const refs = {
            button: document.querySelector(selector),
            label: refs.button('.label'),
            // spinner: refs.button('.spinner)
        }
        return refs;
    }

    enable() {
        this.refs.button.disable = false;
        this.refs.label.textContent = 'Показать ещё';
        // this.refs.spinner.classList.add('is-hidden);
    }

    disable() {
        this.refs.button.disable = true;
        this.refs.label.textContent = 'Загружаем...'
        // this.refs.spinner.classList.remove('is-hidden);
    }

    show() {
        this.refs.button.classList.remove('is-hidden');
    }

    hide() {
        this.refs.button.classList.add('is-hidden');
    }
}