class BaseComponent extends HTMLElement {
    props
    state
    Quiz 
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({
            mode: 'open'
        })
        this.props = {}
        this.state = {}
        this.Quiz = {}
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.props[name] = newValue
        this.Quiz[name] = newValue
        this.render()
    }

    setState(newState) {
        this.state = newState
        this.render()
    }

    render() {}

}

export {BaseComponent}