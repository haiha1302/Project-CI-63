import {BaseComponent} from '../BaseComponent.js'
import { verifyEmail, md5 } from '../utils.js'

class RegisterScreen extends BaseComponent {
    constructor() {
        super()

        this.state = {
            errors: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            },

            data: {
                name: '',
                email: '',
                password: '',
            },
        };
    }

    render() {
        this._shadowRoot.innerHTML = `
            <div class="register-screen">
                <form class="form-register">
                    <input-wrapper class="name" label="Username" type="text" error="${this.state.errors.name}" value="${this.state.data.name}"></input-wrapper>
                    <input-wrapper class="email" label="Email" type="email" error="${this.state.errors.email}" value="${this.state.data.email}"></input-wrapper>
                    <input-wrapper class="password" label="Password" type="password" error="${this.state.errors.password}" value="${this.state.data.password}"></input-wrapper>
                    <input-wrapper class="confirm-password" label="Confirm password" type="password" error="${this.state.errors.confirmPassword}"></input-wrapper>
                    <button class="btn-register">Register</button>
                    <a href="#/login">Already have an account? Login</a>              
                </form>
            </div>
        `

        this.$formRegister = this._shadowRoot.querySelector('.form-register')
        this.$formRegister.onsubmit = async (event) => {
            event.preventDefault()

            // lấy dữ liệu từ các input-wrapper
            let name = this._shadowRoot.querySelector('.name').value
            let email = this._shadowRoot.querySelector('.email').value 
            let password = this._shadowRoot.querySelector('.password').value 
            let confirmPassword = this._shadowRoot.querySelector('.confirm-password').value 

            // kiểm tra dữ liệu nhập vào, nếu có lỗi thì show ra
            let isPassed = true

            if (name == '') {
                isPassed = false
                this.state.errors.name = 'Input your name'
            }
            else {
                this.state.errors.name = ''
                this.state.data.name = name
            }

            if (email == '' || !verifyEmail(email)) {
                isPassed = false
                this.state.errors.email = 'Invalid email'
            }
            else {
                this.state.errors.email = ''
                this.state.data.email = email
            }

            if (password == '') {
                isPassed = false
                this.state.errors.password = 'Input your password'
            }
            else {
                this.state.errors.password = ''
                this.state.data.password = password
            }

            if (confirmPassword == '' || confirmPassword != password) {
                isPassed = false
                this.state.errors.confirmPassword = 'Your password confirmation is not correct!'
            }
            else {
                this.state.errors.confirmPassword = ''
            }

            // lưu dữ liệu vào firestore
            if (isPassed) {
                this.state.data.password = md5(this.state.data.password).toString()

                // check email trùng nhau
                const response = await firebase
                    .firestore()
                    .collection('users-accounts')
                    .where('email', '==', email)
                    .get()
                
                // add thêm vào firebase
                if (response.empty) {
                    await firebase.firestore().collection('users-accounts').add(this.state.data)
                    alert('Sign up successfully!')
                }
                else {
                    alert('Your email has already been used')
                }
            }

            this.setState(this.state)
        }
    }
}

window.customElements.define('register-screen', RegisterScreen)