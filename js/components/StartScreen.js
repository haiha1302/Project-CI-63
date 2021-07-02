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
            flex-direction:column;
        }

        .startBtn, .adminBtn {
            font-size: xx-large !important;
            border-radius: 20px !important;
            padding: 10px 40px 10px 40px !important;
            border: none !important;
            margin-top: 10px !important;
            transition: 500ms;
            background-color: #1e90ff !important;
        }

        .header {
            display: flex;
            align-items: center;
            flex-direction: column;
            margin: 50px;
        }
        
        .nameGame {
            font-weight: 600;
            font-size: 55px;
        }

        .ruleGameTitle {
            font-size: 35px;
        }

        .ruleGameSub {
            color: red;
            list-style-type: none;
            font-size: 25px;
        }

        .ruleGameSub li {
            padding: 5px;
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
                <header class="header">
                    <h3 class="nameGame">😎Quiz về Tình Bạn Thú Vị Nhất!😎</h3>
                    <div class="ruleGame">
                        <h4 class="ruleGameTitle">Hướng dẫn: </h4>
                        <ul class="ruleGameSub">
                            <li>📝 Tạo tài khoản đăng nhập để tạo bộ câu hỏi.</li>
                            <li>🙆 Người chơi trả lời bất kỳ câu hỏi về bạn thân của mình.</li>
                            <li>🔥 Vậy là bạn của bạn có thể chơi được rồi.</li>
                            <li>🤔 Bạn của bạn phải cố đoán ra câu trả lời đúng.</li>
                            <li>👨‍❤️‍💋‍👨 Kiểm tra điểm của bạn bè bạn.</li>
                        </ul>
                    </div>
                </header>
                <div>
                    <button class="btn btn-success startBtn" id="btnStart">Start</button>
                    <button class="btn btn-success adminBtn" id="btnAdmin">Admin</button>
                </div>
            </div>
        `
        this.shadow.innerHTML = template

        this.shadow.getElementById('btnStart').addEventListener('click', () => {
            router.navigate('/play')
        })

        this.shadow.getElementById('btnAdmin').addEventListener('click', () => {
            router.navigate('/admin')
        })
    }
}

window.customElements.define('start-screen', StartScreen)