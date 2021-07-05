import { styleLink } from "../../style/styleLink.js"

const styleScreen = `
    <style>
    
    #mainBody
    {
        background-color: #3b4c9b !important;
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
    
    #quizBody
    {
        background-color: rgb(211, 209, 209);
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        padding: 10px 20px;
    }
    
    .btnFeature{
        display: flex;
        justify-content: space-between;
    }

    .btn-primary:hover {
        background-color : #ffdc62 !important;
        color : #3ccfcf
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
                        <div class="btnFeature">
                            <button class='btn btn-primary rstBtn' id="mainScreen">Re-Attempt Quiz</button>
                            <button class='btn btn-primary rankBtn' id="ranking">Ranking</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        this.shadow.innerHTML = template

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
            console.log(listResult);
            const sumResult = this.shadow.getElementById('sumResult')
            sumResult.innerHTML = listResult[18].result

            const percentResult = this.shadow.getElementById('percentResult')
            const percent = listResult[18].result / 10 / listDatabase.length * 100
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