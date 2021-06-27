const style = `
        <style>
            .content {
                width: 70%;
                margin: 100px auto;
            }
        </style>
    `

class IndexScreen extends BaseComponent {
    constructor() {
        super()
    }

    render() {
        this._shadowRoot.innerHTML = `
            ${style}
            <section class="index-screen">
                <div>
                    <p><b>Câu 1: </b>Bạn dễ chia sẻ với ai? Bạn bè hay Người thân</p>
                    <div>
                        <button>Bạn bè</button>
                        <button>Gia đình</button>
                    </div>
                </div>
            </section>
        `
    }
}

window.customElements.define('index-screen', IndexScreen)