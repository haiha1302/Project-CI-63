import { styleLink } from "../../style/styleLink.js"
import { Quiz } from "../Quiz.js"
import { newQuiz } from "./StartScreen.js"

const styleScreen = `
    <style>
        #mainBody {
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
        
        .btn-danger {
            background-color: #ffdc62 !important;
            color :rgb(24, 8, 235) !important;
            border : none !important;
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
        
        #timer {
            color: white;
            padding: 18px;
            background-color: #4257b2;
            margin-right: -20px;
            border-top-right-radius: 27px;
            box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.3);
        }
        
        .option_group {
            margin-left: 0;
            padding-left: 0;
        }
        
        li {
            list-style-type: none;
        }
        
        .option {
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
        
        .option:hover {
            cursor: pointer;
            border: 3px solid #4257b2;
        }
        
        .option:focus {
            outline: none !important;
            border: 3px solid #4257b2;
        }
        
        .nxtBtn {
            background-color: #4257b2 !important;
            border-radius: 50px !important;
            padding: 15px !important;
            border: none !important;
            float: right;
        }
        
        .exitBtn {
            border-radius: 50px !important;
            width: 200px;
            height: 100px;
            margin-bottom: 20px;
            font-size: xx-large !important;
        }
        
        .nxtBtn:focus, .exitBtn:focus {
            outline: none !important;
            box-shadow: none !important;
        }
    </style>
`

class MainPlayQuiz extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({
            mode: 'open',
        })
    }

    static get observedAttributes() {
        // return ['id', 'question', 'answer', 'a', 'b', 'c', 'd']
    }

    attributeChangedCallback(name, oldValue, newValue) {}

    connectedCallback() {
        let template = `
            ${styleLink}
            ${styleScreen}
            <div id="mainBody">
                <button class="btn btn-danger exitBtn" id="exitBtn">Finish Quiz</button>
            <div id="quiz">
                <div id="quizHeader">
                    <h3 class='quizSumQuestion'></h3>
                        <span id='timer'>1:20</span>
                </div>
                    <div id="quizBody">
                        <h3 class="quizQuestion" id="question"></h3>
                        <ul class='option_group' id='option_group'>
                            <li class='option' id="ansA"></li>
                            <li class='option' id="ansB"></li>
                            <li class='option' id="ansC"></li>
                            <li class='option' id="ansD"></li>
                        </ul>
                        <button class='btn btn-primary nxtBtn' id="btnNext">Next question</button>
                    </div>
                </div>
            </div>
        `

        this.shadow.innerHTML = template

        let correctAns = []

        // var minutes = 0
        // var seconds = 0
        // var formattedMinutes = 0
        // var formattedSeconds = 0
        // var interval = 0
        // const timer = this.shadow.getElementById('timer')
        // interval = setInterval(function(){
        //     if(seconds<59) seconds++
        //     else{
        //         seconds=0
        //         if(minutes<59) minutes++
        //         else{
        //             minutes=0
        //             clearInterval(interval)
        //         }
        //     }
        //     formattedSeconds = seconds<10 ? `0${seconds}` : seconds
        //     formattedMinutes = minutes<10 ? `0${minutes}` : minutes
        //     timer.innerHTML = `${formattedMinutes}:${formattedSeconds}`
        // }, 1000)
        
        let index=0
        let sumResult = 0
        let listDatabase = []
        const quizHeader = this.shadow.getElementById('quizHeader')
        const question = this.shadow.getElementById('question')
        const ansA = this.shadow.getElementById('ansA')
        const ansB = this.shadow.getElementById('ansB')
        const ansC = this.shadow.getElementById('ansC')
        const ansD = this.shadow.getElementById('ansD')
        const getDatabase = async () => {
            const response = await firebase.firestore().collection('questions').get();
            response.docs.forEach((doc) => {
                const data = doc.data()
                listDatabase.push(data)   
            })
            quizHeader.textContent = `Q${index + 1} / ${listDatabase.length}` 
            question.textContent = listDatabase[index].question
            ansA.textContent = listDatabase[index].a
            ansB.textContent = listDatabase[index].b
            ansC.textContent = listDatabase[index].c
            ansD.textContent = listDatabase[index].d
        }
        getDatabase()
        
        this.shadow.getElementById('btnNext').addEventListener('click', () => {
            index++
            if(index != listDatabase.length) {
                quizHeader.textContent = `Q${index + 1} / ${listDatabase.length}` 
                question.textContent = listDatabase[index].question
                ansA.textContent = listDatabase[index].a
                ansB.textContent = listDatabase[index].b
                ansC.textContent = listDatabase[index].c
                ansD.textContent = listDatabase[index].d
                console.log(index);
            }
            else {
                router.navigate('/result')
                firebase.firestore().collection("result").add({
                    result: sumResult
                })
            }
            console.log(correctAns);
            firebase.firestore().collection("correctAns").add({
                correct: correctAns
            })
        })

        this.shadow.getElementById('ansA').addEventListener('click', () => {
            if(listDatabase[index].answer == listDatabase[index].a) {
                console.log('true')
                sumResult += 10
                console.log(sumResult);
                correctAns.push(true)
            }
            else {
                console.log('false');
                correctAns.push(false)
            }
        })
        this.shadow.getElementById('ansB').addEventListener('click', () => {
            if(listDatabase[index].answer == listDatabase[index].b) {
                console.log('true-2');
                sumResult+=10
                console.log(sumResult);
                correctAns.push(true)
            }
            else {
                console.log('false-2');
                correctAns.push(false)
            }
        })
        this.shadow.getElementById('ansC').addEventListener('click', () => {
            if(listDatabase[index].answer == listDatabase[index].c) {
                console.log('true-3');
                sumResult+=10
                console.log(sumResult);
                correctAns.push(true)
            }
            else {
                console.log('false-3');
                correctAns.push(false)
            }
        })
        this.shadow.getElementById('ansD').addEventListener('click', () => {
            if(listDatabase[index].answer == listDatabase[index].d) {
                console.log('true-4');
                sumResult+=10
                console.log(sumResult);
                correctAns.push(true)
            }
            else {
                console.log('false-4');
                correctAns.push(false)
            }
        })


        
        this.shadow.getElementById('exitBtn').addEventListener('click', () => {
            router.navigate('/result')
        })
    }
}

window.customElements.define('play-screen', MainPlayQuiz)