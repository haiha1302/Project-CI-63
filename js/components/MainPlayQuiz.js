import { styleLink } from "../../style/styleLink.js"
import { Quiz } from "../Quiz.js"
import { newQuiz } from "./StartScreen.js"
import { listDatabase } from "../utils.js"

const styleScreen = `
    <style>
        #mainBody
        {
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center !important;  
            justify-content: center; 
            background-color:blueviolet !important
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
        
        #timer
        {
            color: white;
            padding: 18px;
            background-color: rgb(130, 18, 182);
            margin-right: -20px;
            border-top-right-radius: 27px;
            box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.3);
        }
        
        .option_group{
            margin-left: 0;
            padding-left: 0;
        }
        
        li
        {
            list-style-type: none;
        }
        
        .option
        {
            border: 3px solid transparent;
            border-radius: 50px;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 250px;
            height: 40px;
            margin: 10px 10px 10px 0;
            min-height: 42px;
            transition: 500ms;
        }
        
        .option:hover
        {
            cursor: pointer;
            border: 3px solid rgb(130, 18, 182);
        }
        
        .nxtBtn
        {
            background-color: rgb(130, 18, 182) !important;
            border-radius: 50px !important;
            padding: 15px !important;
            border: none !important;
            float: right;
        }
        
        .exitBtn
        {
            border-radius: 50px !important;
            width: 200px;
            height: 100px;
            margin-bottom: 20px;
            font-size: xx-large !important;
        }
        
        .nxtBtn:focus, .exitBtn:focus
        {
            outline: none !important;
            box-shadow: none !important;
        }
        
        .nxtBtn:hover, .exitBtn:hover
        {
            background-color: white !important;
            color: black !important;
            transition: 500ms;
        }
    </style>
`

class MainPlayQuiz extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({
            mode: 'open',
        });
    }

    static get observedAttributes() {}

    attributeChangedCallback(name, oldValue, newValue) {}

    connectedCallback() {
        const template = `
            ${styleLink}
            ${styleScreen}
            <div id="mainBody">
                <button class="btn btn-danger exitBtn" id="exitBtn">Finish Quiz</button>
            <div id="quiz">
                <div id="quizHeader">
                    <h3 class='quizHeader'>Q1/1</h3>
                        <span id='timer'>1:20</span>
                </div>
                    <div id="quizBody">
                        <h3 class="quizHeader" id="question">Q:1</h3>
                        <ul class='option_group' id='option_group'>
                            <li class='option' id="ansA">A</li>
                            <li class='option' id="ansB">A</li>
                            <li class='option' id="ansC">A</li>
                            <li class='option' id="ansD">A</li>
                        </ul>
                        <button class='btn btn-primary nxtBtn' onclick='nxtQuestion()'>Next question</button>
                    </div>
                </div>
            </div>
        `

        this.shadow.innerHTML = template

        const listDatabase = [];

        const getDatabase = async () => {
            const response = await firebase.firestore().collection('questions').get();
            response.docs.forEach((doc) => {
                listDatabase.push(doc.data());
                let index = 0
                const question = this.shadow.getElementById('question')
                const ansA = this.shadow.getElementById('ansA')
                const ansB = this.shadow.getElementById('ansB')
                const ansC = this.shadow.getElementById('ansC')
                const ansD = this.shadow.getElementById('ansD')
                const countAnswer = this.shadow.getElementById('quizHeader')
                question.textContent = listDatabase[index].question
                ansA.textContent = listDatabase[index].a
                ansB.textContent = listDatabase[index].b
                ansC.textContent = listDatabase[index].c
                ansD.textContent = listDatabase[index].d

                // countAnswer.textContent = `${index + 1} / ${newQuiz.sumQuestion}`
            });
        }

        getDatabase();

        this.shadow.getElementById('ansA').addEventListener('click', () => {
            
        })

        


        
        // let timeClock
        // this.shadow.getElementById('timer').textContent = newQuiz.timeAnswer
        // timeClock = setInterval(() => {
        //     newQuiz.clock()
        //     this.shadow.getElementById('timer').textContent = newQuiz.timeAnswer
        //     if(newQuiz.timeAnswer - 1 == 0) {
        //         setTimeout(() => {
        //             newQuiz.outClock()
        //             router.navigate('/result')
        //             clearInterval(timeClock)
        //         }, 1000)
        //     }
        // }, 1000)

    }
}

window.customElements.define('play-screen', MainPlayQuiz)