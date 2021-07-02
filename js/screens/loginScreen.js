import { BaseComponent } from "../BaseComponent.js"
import {
    verifyEmail,
    md5,
    getDataFromDocs,
    saveCurrentUser,
} from '../utils.js'


const style =`
    <style>
        .login-screen {
            width: 400px;
            margin: 0 auto 0;
            position: absolute;
            top : 50%;
            left: 50%;
            transform: translate(-70%, -70%);
            width: 400px;
            background : white;
            border-radius: 10px;
            height : 400px;
            line-height : 2;
            border : 1px solid grey;
        }

        .form-login {
            display: flex;
            vertical-align: middle;
            width: 100%;
            padding: 30px 0;
            left: 50%;
            flex-wrap: wrap;
            align-content: stretch;
            align-items: center;
            flex-direction: column;
            justify-content: space-evenly;
        }

        .section-head {
            text-transform: uppercase;
            font-size: 28px;
            margin: 0 0 45px;
            text-align: center;
        }

        .form-login .password {
            margin-left : -23px;
        }

        .btn-login {
            width: 80%;
            padding: 15px 0;
            border: none;
            background: green;
            text-transform: uppercase;
            color: #fff;
            font-size: 20px;
            border-radius : 30px;
            margin-top : 40px;
        }

        .btn-login:hover {
            background-color: #008489;
        }

        .form-login a {
            color: black;
        }

        .form-login a {
            margin-bottom: 20px;
        }
    </style>
`

class LoginScreen extends BaseComponent {
    constructor() {
        super()

        this.state = {
            errors: {
                email: '',
                password: '',
            },

            data: {
                email: '',
                password: '',
            },
        }
    }

    render() {
        this._shadowRoot.innerHTML = `
        ${style}
            <div class="login-screen">
                <form class="form-login">
                <h3 class="section-head">LOGIN</h3>
                    <input-wrapper class="email" label="Email" placeholder="username" type="email" error="${this.state.errors.email}" value="${this.state.data.email}"></input-wrapper>
                    <input-wrapper class="password" placeholder="password" label="Password" type="password" error="${this.state.errors.password}" value="${this.state.data.password}"></input-wrapper>
                    <button class="btn-login">Login</button>
                    <a href="#/register">You don't have an account? Register now!</a>
                </form>
            </div>
        `

        this.$formLogin = this._shadowRoot.querySelector('.form-login')
        this.$formLogin.onsubmit = async (event) => {
            event.preventDefault()

            // lấy dữ liệu từ input-wrapper
            let email = this._shadowRoot.querySelector('.email').value
            let password = this._shadowRoot.querySelector('.password').value

            // kiểm tra dữ liệu nhập vào, nếu có lỗi hiển thị ra
            let isPassed = true

            if (email == '' || !verifyEmail(email)) {
                isPassed = false
                this.state.errors.email = 'Invalid email'
            }
            else {
                this.state.errors.email = ''
                this.state.errors.email = email
            }

            if (password == '') {
                isPassed = false
                this.state.errors.password = 'Input your password'
            }
            else {
                this.state.errors.password = ''
                this.state.data.password = password
            }

            // kiểm tra dữ liệu người dùng
            if (isPassed) {
                let response = await firebase
                    .firestore()
                    .collection('users-accounts')
                    .where('email', '==', email)
                    .where('password', '==', md5(password))
                    .get()

                if (response.empty) {
                    alert('Email or password is not correct')
                }
                else {
                    const currentUser = getDataFromDocs(response.docs)[0]
                    console.log(currentUser)
                    saveCurrentUser(currentUser)
                    router.navigate('/start')
                }
            }

            this.setState(this.state)
        }
    }
}

window.customElements.define('login-screen', LoginScreen)