import { styleLink } from "../../style/styleLink.js"
import { Quiz } from "../Quiz.js"

const styleScreen = `
    <style>
        .start {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color:blueviolet !important
        }

        .startBtn, .adminBtn {
            font-size: xx-large !important;
            border-radius: 20px !important;
            padding: 10px 40px 10px 40px !important;
            border: none !important;
            margin: 20px !important;
            transition: 500ms;
        }
    </style>
`

export let newQuiz = null 

class StartScreen extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({
            mode: 'open',
        })
    }

    static get observedAttributes() {}

    attributeChangedCallback(name, oldValue, newValue) {}

    connectedCallback() {
        const template = `
            ${styleLink}
            ${styleScreen}
            <div class="start" id="start">
                <div>
                    <button class="btn btn-success startBtn" id="btnStart">Start</button>
                    <button class="btn btn-success adminBtn" id="btnAdmin">Admin</button>
                </div>
            </div>
        `
        this.shadow.innerHTML = template

        newQuiz = new Quiz (5, 30, 10)

        this.shadow.getElementById('btnStart').addEventListener('click', () => {
            router.navigate('/play')
        })

        this.shadow.getElementById('btnAdmin').addEventListener('click', () => {
            router.navigate('/admin')
        })
    }
}

window.customElements.define('start-screen', StartScreen)