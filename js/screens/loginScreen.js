import { BaseComponent } from "../BaseComponent.js"
import {
  verifyEmail,
  md5,
  getDataFromDocs,
  saveCurrentUser,
} from "../utils.js"

class LoginScreen extends BaseComponent {
    constructor() {
        super()

        this.state = {
            errors: {
                email: "",
                password: "",
            },

            data: {
                email: "",
                password: "",
            },
        }
    }

    render() {
        this._shadowRoot.innerHTML = `
                <section class="login-screen">
                    <form class="form-login">
                        <input-wrapper class="email" label="Email" type="email" error="${this.state.errors.email}" value="${this.state.data.email}"></input-wrapper>
                        <input-wrapper class="password" label="Password" type="password" error="${this.state.errors.password}" value="${this.state.data.password}"></input-wrapper>
                        <button class="btn-login">Login</button>
                        <a href="#v/register">Not have an account? Register</a>
                    </form>
                </section>
            `

        this.$formLogin = this._shadowRoot.querySelector(".form-login");
        this.$formLogin.onsubmit = async (event) => {
        event.preventDefault();

        // lấy dữ liệu từ các input-wrapper
        let email = this._shadowRoot.querySelector(".email").value;
        let password = this._shadowRoot.querySelector(".password").value;

        // kiểm tra dữ liệu nhập vào, nếu có lỗi thì show ra
        let isPassed = true;

        if (email == "" || !verifyEmail(email)) {
            isPassed = false;
            this.state.errors.email = "Invalid email";
        } else {
            this.state.errors.email = "";
            this.state.data.email = email;
        }

        if (password == "") {
            isPassed = false;
            this.state.errors.password = "Input your password";
        } else {
            this.state.errors.password = "";
            this.state.data.password = password;
        }

        // kiểm tra dữ liệu người dùng
        if (isPassed) {
            let response = await firebase
            .firestore()
            .collection("users")
            .where("email", "==", email)
            .where("password", "==", md5(password))
            .get();

            if (response.empty) {
            alert("Email or password is not correct")
            } else {
            const currentUser = getDataFromDocs(response.docs)[0]
            console.log(currentUser)
            // lưu người dùng hiện tại
            saveCurrentUser(currentUser)
            // chuyển sang trang index
            router.navigate("/index")
            }
        }

        this.setState(this.state)
        }
    }
}

window.customElements.define("login-screen", LoginScreen)
