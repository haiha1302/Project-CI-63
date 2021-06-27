var root = null
var useHash = true
var hash= '#nani'
window.router = new Navigo(root, useHash, hash)

let $main = document.getElementById('main')

window.router.on('/login', () => {
    $main.innerHTML = '<login-screen></login-screen>'
}).resolve()

window.router.on('/register', () => {
    $main.innerHTML = '<register-screen></register-screen>'
}).resolve()

window.router.on('/index', () => {
    $main.innerHTML = '<index-screen></-screen>'
}).resolve()

window.router.notFound(() => {
    $main.innerHTML = 'Cannot find this website'
})