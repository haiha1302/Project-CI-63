import { styleLink } from "../../style/styleLink.js"
import { styleRank } from "../../style/rank.js"

const styleScreen = `
    <style>
        .result {
            display: flex;
        }
    
        .mainBody {
            background-color: #3b4c9b !important;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center !important;
            justify-content: center;   
        }
        
        #quiz {
            width: 800px;
            height: 400px;
            background-color: #fff;
            display: grid;
            grid-template-rows: 60px auto;
            border-radius: 30px;
        }
        
        #quizHeader {
            height: 60px;
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
            box-shadow: 0 2px 5px 1px rgba(0,0,0,0.3);
            z-index: 1;
        }
        
        #quizBody {
            background-color: rgb(211, 209, 209);
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;
            padding: 10px 20px;
        }
        
        .btn-primary:hover {
            background-color : #ffdc62 !important;
            color : #3ccfcf
        }

        .tableRank {
            margin-left: -75%;
        }
    </style>
`

class ResultScreen extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({
            mode: 'open'
        })
    }

    static get observedAttributes() {}

    attributeChangedCallback(name, oldValue, newValue) {}

    connectedCallback() {
        const template = `
            ${styleLink}
            ${styleScreen}
            ${styleRank}
            <div class="result">
                <div class="mainBody" id="mainResult">
                    <div id="quiz">
                        <div id="quizHeader">
                            <h3>Result</h3>
                        </div>
                        <div id="quizBody">
                            <table class='table table-bordered'>
                                <thead class='thead-dark'>
                                    <th>Q1</th>
                                </thead>
                                <tbody id='bodyCorrect'>
                                    
                                </tbody>
                            </table>
                            <table  class='table table-bordered'>
                                <thead class='thead-dark'>
                                    <th>Points</th>
                                    <th>Percentage</th>
                                    <th>Time Taken (mm:ss)</th>
                                </thead>
                                <tbody>
                                    <td id="sumResult"></td>
                                    <td id="percentResult"></td>
                                    <td></td>
                                </tbody>
                            </table>
                            <button class='btn btn-primary rstBtn' id="mainScreen">Re-Attempt Quiz</button>
                            <button class='btn btn-primary rstBtn' id="btnRank">Rank</button>
                        </div>
                    </div>
                </div>
                <div class="tableRank" id="tbRank">
                    <div class="menu">
                        <ul>
                            <li class="logo" id="btnStart"><span>Quiz App</span></li>
                        </ul>
                    </div>
                    <h2>Bảng xếp hạng</h2>
                    <table class="content-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Id</th>
                                <th>Point</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th><img src="https://cdn.discordapp.com/attachments/703878319007072378/861602731940380672/icon1.png" alt=""></th>
                                <th>Hien</th>
                                <th>123</th>
                                <th>8</th>
                            </tr>
                            <tr>
                                <th><img src="https://cdn.discordapp.com/attachments/703878319007072378/861602723018309662/icon2.png" alt=""></th>
                                <th>Ha lo</th>
                                <th>234</th>
                                <th>7</th>
                            </tr>
                            <tr>
                                <th><img src="https://cdn.discordapp.com/attachments/703878319007072378/861602729193635850/icon3.png" alt=""></th>
                                <th>Dat</th>
                                <th>577</th>
                                <th>6</th>
                            </tr>
                        </tbody>
                    </table>
                    <button id="btnReturn" class="btn btn-primary rstBtn">Quay lại</button>
                </div>             
            </div>
        `
        this.shadow.innerHTML = template

        this.shadow.getElementById('tbRank').style.visibility = "hidden"

        this.shadow.getElementById('btnRank').addEventListener('click', () => {
            this.shadow.getElementById('mainResult').style.visibility = "collapse"
            this.shadow.getElementById('tbRank').style.visibility = "visible"
        })

        this.shadow.getElementById('btnReturn').addEventListener('click', () => {
            this.shadow.getElementById('tbRank').style.visibility = "hidden"
            this.shadow.getElementById('mainResult').style.visibility = "visible"
        })

        this.shadow.getElementById('mainScreen').addEventListener('click', () => {
            router.navigate('/start')
        })

        const listResult = []
        const listDatabase = []
        const correctAnswer = []
        const getDatabase = async () => {
            const response = await firebase.firestore().collection('questions').get();
            response.docs.forEach((doc) => {
                const data = doc.data()
                listDatabase.push(data)
            })
        }
        getDatabase()

        const getResult = async () => {
            const response = await firebase.firestore().collection('result').get();
            response.docs.forEach((doc) => {
                const data = doc.data()
                listResult.push(data)
            })
            const sumResult = this.shadow.getElementById('sumResult')
            sumResult.innerHTML = listResult[2].result
            const percentResult = this.shadow.getElementById('percentResult')
            const percent = listResult[2].result / 10 / listDatabase.length * 100
            percentResult.innerHTML = `${percent.toFixed(0)}%`
        }
        getResult()    
        
        const getCorrectAns = async () => {
            const response = await firebase.firestore().collection('correctAns').get();
            response.docs.forEach((doc) => {
                const data = doc.data()
                correctAnswer.push(data)
            })
            const bodyCorrect = this.shadow.getElementById('bodyCorrect')
            const checkIcon = this.shadow.getElementById('checkIcon')
            const timesIcon = this.shadow.getElementById('timesIcon')
            console.log(correctAnswer[1].correct[1]);
            if(correctAnswer[1].correct[0] == 'true'){
                bodyCorrect.innerHTML=`<td id='checkIcon'><img style='width:20px' src='./assets/check_icon.png'></td>`
            }
            else{
                bodyCorrect.innerHTML=`<td id='timesIcon'><img style='width:20px' src='./assets/times_icon.png'></td>`
            }
        }
        getCorrectAns()
    }
}

window.customElements.define('result-screen', ResultScreen)