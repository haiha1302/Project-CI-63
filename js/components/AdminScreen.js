import { styleLink } from "../../style/styleLink.js"

const styleScreen = `
    <style>
        #mainPanel
        {
            background-color: blueviolet !important;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 300px;
            min-height: 650px;
        }
        
        #panelInner
        {
            width: 800px;
            height: 400px;
            background-color: #fff;
            display: grid;
            grid-template-rows: 60px auto;
            border-radius: 30px;
        }
        #panelInner
        {
            height: 650px;
            width: 1200px;
            grid-template-rows: 60px auto 62px;
        }
        
        #header{
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
        
        #questionsBody
        {
            background-color: rgb(211, 209, 209);
            padding: 10px 20px;
            overflow-y: auto;/*when we'll add questions then scroll bar will be needed*/
        }
        #delAllBtn, #addBtn
        {
            border-radius: 50%;
            font-size: 30px;
            padding: 8px 18px;
            margin: 1px 30px;
        }
        #addBtnDiv
        {
            display: flex;
            height: 65px;
            justify-content: center;
            align-items: center;
            box-shadow: 0 -2px 5px 1px rgba(0, 0, 0, 0.3);
            border-bottom-right-radius: 30px;
            border-bottom-left-radius: 30px;
            border-top-right-radius: 0;
            border-top-left-radius: 0;
        }
        .homeBtn
        {   
            border-radius: 20px;
            left: 70%;
            position: fixed;
            top: 40vh;
            padding: 10px 40px !important;
        }
        .panelLi
        {
            display: flex;
            flex-wrap: wrap;
            min-height: 42px;
            align-items: center;
            margin: 10px;
        }
        .liBtnAdd, .liBtnCancel, .liBtn
        {
            font-size: 25px !important;
            border-radius: 50% !important;
            padding: 5px 13px !important;
            margin: 0 20px;
            max-height: 50px;
        }
        .liBtnAdd
        {
            padding: 6px 13px 5px 13px !important;
        }
        .liBtnCancel
        {
            padding: 6px 13px 13px 13px !important;
        }
    </style>
`

class AdminScreen extends HTMLElement {
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
            <div id="mainPanel" >
                <div id="panelInner">
                    <div id="header">
                        <h3>Questions</h3>
                    </div>
                    <div id="questionsBody">
                        <ul id="questionsUl">

                        </ul>
                        <button class="btn btn-danger homeBtn" onclick="homePage()">Done</button>
                    </div>
                    <div id="addBtnDiv">
                        <button id="addBtn" class="btn btn-success fa fa-plus"></button>
                        <button id="delAllBtn" class="btn btn-danger fa fa-trash" onclick="dellAll()"></button>
                    </div>
                </div>
            </div>
        `

        this.shadow.innerHTML = template
        

        this.shadow.getElementById('addBtn').addEventListener('click', () => {
            const ulQuestion = document.getElementById('quesstionsUl')
            const appendUl = `
                ${styleLink}
                ${styleScreen}
                <li class="panelLi" style="background-color: grey; border-radius: 30px; padding: 10px 30px">
                <h3>Q:&nbsp</h3>
                <input type="text" class="form-control w-75">
                    <ul style="width: 1000px">
                        <li style="display: flex;" class="panelLi"><h3>Option 1:&nbsp</h3><input class="form-control w-50"></li>
                        <li style="display: flex;" class="panelLi"><h3>Option 2:&nbsp</h3><input class="form-control w-50"></li>
                        <li style="display: flex;" class="panelLi"><h3>Option 3:&nbsp</h3><input class="form-control w-50"></li>
                        <li style="display: flex;" class="panelLi"><h3>Option 4:&nbsp</h3><input class="form-control w-50"></li>
                        <li style="display: flex;"><h3>Answer:&nbsp</h3><input class="form-control w-50"></li>
                        <li style="display: flex; justify-content: center;">
                            <button class="btn btn-success liBtnAdd fa fa-plus" onclick="addRec(this)"></button>
                            <button class="btn btn-danger liBtnCancel fa fa-times" onclick="discardRec(this)"></button>
                        </li>
                    </ul>
                </li>
            `
            this.shadow.innerHTML = appendUl

            

        })
    } 
}

window.customElements.define('admin-screen', AdminScreen)