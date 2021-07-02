import { styleLink } from "../../style/styleLink.js"

const styleScreen = `
    <style>
        #mainBody
        {
            background-color: blueviolet !important;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center !important;
            justify-content: center;   
        }
        
        #quiz
        {
            width: 800px;
            height: 400px;
            background-color: #fff;
            display: grid;
            grid-template-rows: 60px auto;
            border-radius: 30px;
        }
        
        #quizHeader
        {
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
        /* #quizHeader
        {
            width: 800px;
        } */
        
        #quizBody
        {
            background-color: rgb(211, 209, 209);
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;
            padding: 10px 20px;
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
        <div id="mainBody">
        <div id="quiz">
            <div id="quizHeader">
                <h3>Result</h3>
            </div>
            <div id="quizBody">
                <table class='table table-bordered'>
                    <thead class='thead-dark'>
                        <th>Q1</th>
                    </thead>
                    <tbody>
                        <td><img style='width:20px' src='./assets/check.png'></td>
                        <td><img style='width:20px' src='./assets/cancel.png'></td>
                    
                    </tbody>
                </table>
                <table  class='table table-bordered'>
                    <thead class='thead-dark'>
                        <th>Points</th>
                        <th>Percentage</th>
                        <th>Time Taken (mm:ss)</th>
                    </thead>
                    <tbody>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tbody>
                </table>
                <button class='btn btn-primary rstBtn' id="mainScreen">Re-Attempt Quiz</button>
            </div>
        </div>
    </div>
        `
        this.shadow.innerHTML = template


        this.shadow.getElementById('mainScreen').addEventListener('click', () => {
            router.navigate('/start')
        })
    }
}

window.customElements.define('result-screen', ResultScreen)