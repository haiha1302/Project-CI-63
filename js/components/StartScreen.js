import { styleLink } from "../../style/styleLink.js"
import { Quiz } from "../Quiz.js"

const styleScreen = `
    <style>
        * {
            margin: 0;
            padding: 0;
            font-family: 'Times New Roman', Times, serif;
        }

        .container {
            width: 100%;
            height: 100%;
            background: #3b4c8b;
        }

        .menu ul {
            display: inline-flex;
            margin: 50px;
        }

        .menu ul li {
            list-style: none;
            margin: 0 20px;
            color: #fffdfd;
            cursor : pointer;
        }

        .logo {
            margin-top: -40px;
            border: 2px solid transparent;
            border-radius: 10px;
            background-image: linear-gradient(#ffdc62,#ffdc62), radial-gradient(circle at top left, #fd00da,#19d7f8);
            background-origin: border-box;
            background-clip: content-box,border-box;
        }

        .logo span {
            display: block;
            padding: 8px 22px;
            font-size: 25px;
            color: #4257b2;
        }

        .login-btn {
            top : 40px;
            right: 300px;
            position: absolute;
            color: #fff;
            text-decoration: none;
            border: 2px solid transparent;
            border-radius: 10px;
            background-image: linear-gradient(#4257b2,#4257b2), radial-gradient(circle at top left, #fd00da,#19d7f8);
            background-origin: border-box;
            background-clip: content-box,border-box;
        }

        .login-btn span {
            display: block;
            padding: 8px 22px;
            font-size: 25px;
        }

        .register-btn {
            top : 40px;
            right: 100px;
            position: absolute;
            text-decoration: none;
            border: 2px solid transparent;
            border-radius: 10px;
            background-image: linear-gradient(#ffdc62,#ffdc62), radial-gradient(circle at top left, #fd00da,#19d7f8);
            background-origin: border-box;
            background-clip: content-box,border-box;
        }

        .register-btn span {
            display: block;
            padding: 8px 22px;
            color :rgb(24, 8, 235);
            font-size : 25px;
        }

        .start {
            background-color: #1e90ff;
            width: 100vw;
            height: 100vh;
            display: flex;
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
            background-color: #ffdc62 !important;
            color :rgb(24, 8, 235)
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
            color :rgb(255, 255, 255)
        }

        .ruleGameTitle {
            font-size: 35px;
            color :rgb(255, 255, 255)
        }

        .ruleGameSub {
            color: rgb(255, 255, 255);
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
            <div class="container">
                <div class="menu">
                    <ul>
                        <li class="logo" id="logo-quiz"><span>Quiz App</span></li>
                        <li class="login-btn" id="btn-loginScreen"><span>Login</span></li>
                        <li class="register-btn" id="btn-registerScreen"><span>Register</span></li>
                    </ul>
                </div>
	        </div>
	        <div class="start" id="start">
                <header class="header">
                    <h3 class="nameGame">????Quiz v??? T??nh B???n Th?? V??? Nh???t!????</h3>
                    <div class="ruleGame">
                        <h4 class="ruleGameTitle">H?????ng d???n: </h4>
                        <ul class="ruleGameSub">
                            <li>???? T???o t??i kho???n ????ng nh???p ????? t???o b??? c??u h???i.</li>
                            <li>???? Ng?????i ch??i tr??? l???i b???t k??? c??u h???i v??? b???n th??n c???a m??nh.</li>
                            <li>???? V???y l?? b???n c???a b???n c?? th??? ch??i ???????c r???i.</li>
                            <li>???? B???n c???a b???n ph???i c??? ??o??n ra c??u tr??? l???i ????ng.</li>
                            <li>??????????????????????????? Ki???m tra ??i???m c???a b???n b?? b???n.</li>
                        </ul>
                    </div>
                </header>
                <div>
                    <button class="btn btn-success startBtn" id="btnStart">Start</button>
                    <button class="btn btn-success adminBtn" id="btnAdmin">Join with us?</button>
                </div>
            </div>
        `
        this.shadow.innerHTML = template

        this.shadow.getElementById('btnStart').addEventListener('click', () => {
            router.navigate('/play')
        })

        this.shadow.getElementById('btnAdmin').addEventListener('click', () => {
            router.navigate('/login')
        })
    }
}

window.customElements.define('start-screen', StartScreen)