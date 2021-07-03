import './utils.js'

import { Quiz } from './Quiz.js'

import './router.js'

import "./components/InputWrapper.js"
import "./screens/LoginScreen.js"
import "./screens/RegisterScreen.js"

import './components/StartScreen.js'
import "./components/MainPlayQuiz.js";
import './components/AdminScreen.js'
import './components/ResultScreen.js'

const listDatabase = []

export const getDatabase = async () => {
  
    const response = await firebase.firestore().collection('questions').get();
    response.docs.forEach((doc) => {
        const data = doc.data()
        const dataQuestion = new Quiz (doc.id, data.question, data.answer, data.a, data.b, data.c, data.d)
        
        // console.log(dataQuestion);
        listDatabase.push(dataQuestion)
       
    })
    // console.log(listDatabase[0]);
}

getDatabase()

