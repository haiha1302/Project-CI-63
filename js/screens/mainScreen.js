class MainScreen extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({
            mode: 'open',
        })
    }

    static get observedAttributes() {}

    attributeChangedCallback(name, oldValue, newValue) {}

    connectedCallback() {
        const html = `
            
        `
    }
}