import { BaseComponent } from "../BaseComponent.js"

const style = `
    <style>
        * {
            font-family: 'Baloo 2', cursive;
        }

        .input-wrapper {
            width: 100%;
        }

        .input-wrapper > input {
            width: 100%;
            height: 40px;
            outline: none;
            font-size: 20px;
            padding: 0px 5px;
        }

        .input-label {
            font-size: 15px;
            display: block;
        }

        .input-main {
            border: 1px solid #FFCB6B;
            background: transparent;
            width: 100%;
        }

        .input-error {
            font-size: 13px;
            color: #DB5145;
        }
    </style>
`

class InputWrapper extends BaseComponent {
    constructor() {
        super()

        this.props = {
            label: '',
            type: 'text',
            error: '',
            value: '',
        }
    }

    static get observedAttributes() {
        return ['label', 'type', 'error', 'value']
    }

    render() {
        this._shadowRoot.innerHTML = `
            <div>
                <label class="input-label" for="input">${this.props.label}</label>
                <input class="input-main" type="${this.props.type}" value="${this.props.value}">
                <div class="input-error">${this.props.error}</div>
            </div>
        `
    }

    get value() {
        return this._shadowRoot.querySelector('.input-main').value
    }
}

window.customElements.define('input-wrapper', InputWrapper)