import { styleLink } from "../../style/styleLink.js"
import { Quiz } from "../Quiz.js"
// import listDatabase from "../main.js"
import { newQuiz } from "./StartScreen.js"

let innerQuiz = null

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
    
    .btn-danger {
        background-color: #ffdc62 !important;
        color :rgb(24, 8, 235) !important;
        border : none !important;
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
        background-color: #4257b2;
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
        border: 3px solid #4257b2;
    }
    
    .option:focus {
        outline: none !important;
        border: 3px solid #4257b2;
    }
    
    .nxtBtn
    {
        background-color: #4257b2 !important;
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
    
    </style>
`

class MainPlayQuiz extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({
            mode: 'open',
        });
        
        this.Quiz = {
            question: '',
            answer: '',
            a: '',
            b: '',
            c: '',
            d: ''
        }
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
                    <h3 class='quizSumQuestion'>${this.Quiz.question} / ${this.Quiz.sumQuestion}</h3>
                        <span id='timer'>1:20</span>
                </div>
                    <div id="quizBody">
                        <h3 class="quizQuestion" id="question">${this.Quiz.question}</h3>
                        <ul class='option_group' id='option_group'>
                            <li class='option' id="ansA">${this.Quiz.a}</li>
                            <li class='option' id="ansB">${this.Quiz.b}</li>
                            <li class='option' id="ansC">${this.Quiz.c}</li>
                            <li class='option' id="ansD">${this.Quiz.d}</li>
                        </ul>
                        <button class='btn btn-primary nxtBtn' id="btnNext">Next question</button>
                    </div>
                </div>
            </div>
        `;

        this.shadow.innerHTML = template

        var minutes = 0
        var seconds = 0
        var formattedMinutes = 0
        var formattedSeconds = 0
        var interval = 0

        const timer = this.shadow.getElementById('timer')

        innerQuiz = new Quiz(this.question, this.answer, this.a, this.b, this.c, this.d)

        interval = setInterval(function(){
            if(seconds<59) seconds++
            else{
                seconds=0
                if(minutes<59) minutes++
                else{
                    minutes=0
                    clearInterval(interval)
                }
            }
            formattedSeconds = seconds<10 ? `0${seconds}` : seconds
            formattedMinutes = minutes<10 ? `0${minutes}` : minutes
            timer.innerHTML = `${formattedMinutes}:${formattedSeconds}`
        }, 1000)
        
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
            console.log(listDatabase)
        }
        getDatabase()


        
        this.shadow.getElementById('btnNext').addEventListener('click', () => {
            index++
            if(index == listDatabase.length) {
                router.navigate('/result')
            }
            else {
                quizHeader.textContent = `Q${index + 1} / ${listDatabase.length}` 
                question.textContent = listDatabase[index].question
                ansA.textContent = listDatabase[index].a
                ansB.textContent = listDatabase[index].b
                ansC.textContent = listDatabase[index].c
                ansD.textContent = listDatabase[index].d
            }
        })

        this.shadow.getElementById('ansA').addEventListener('click', () => {
            if(listDatabase[index].answer == listDatabase[index].a) {
                console.log('true')
                sumResult+=10
                console.log(sumResult);
            }
            else {
                console.log('false');
            }
        })

        this.shadow.getElementById('ansB').addEventListener('click', () => {
            if(listDatabase[index].answer == listDatabase[index].b) {
                console.log('true-2');
                sumResult+=10
                console.log(sumResult);
            }
            else {
                console.log('false-2');
            }
        })

        this.shadow.getElementById('ansC').addEventListener('click', () => {
            if(listDatabase[index].answer == listDatabase[index].c) {
                console.log('true-3');
                sumResult+=10
                console.log(sumResult);
            }
            else {
                console.log('false-3');
            }
        })

        this.shadow.getElementById('ansD').addEventListener('click', () => {
            if(listDatabase[index].answer == listDatabase[index].d) {
                console.log('true-4');
                sumResult+=10
                console.log(sumResult);
            }
            else {
                console.log('false-4');
            }
        })

        this.shadow.getElementById('exitBtn').addEventListener('click', () => {
            router.navigate('/result')
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
    get id() {
        return this.getAttribute("id");
    }
    set id(val) {
        this.setAttribute("id", val);
    }

    get question() {
        return this.getAttribute("question");
    }
    set question(val) {
        this.setAttribute("question", val);
    }

    get answer() {
        return this.getAttribute("answer");
    }
    set answer(val) {
        this.setAttribute("answer", val);
    }

    get a() {
        return this.getAttribute("a");
    }
    set a(val) {
        this.setAttribute("a", val);
    }

    get b() {
        return this.getAttribute("b");
    }
    set b(val) {
        this.setAttribute("b", val);
    }

    get c() {
        return this.getAttribute("c");
    }
    set c(val) {
        this.setAttribute("c", val);
    }
    
    get d() {
        return this.getAttribute("d");
    }
    set d(val) {
        this.setAttribute("d", val);
    }
}

window.customElements.define('play-screen', MainPlayQuiz)