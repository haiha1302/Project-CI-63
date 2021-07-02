const root = null;
const useHash = true; // Defaults to: false
const hash = "#"; // Defaults to: '#'
window.router = new Navigo(root, useHash, hash);

const $change = document.getElementById('change');

window.router.on('/start', () => {
    $change.innerHTML = `<start-screen></start-screen>`;
}).resolve();

window.router.on('/play', () => {
    $change.innerHTML = `<play-screen></play-screen>`;
}).resolve();

window.router.on('/admin', () => {
    $change.innerHTML = `<admin-screen></admin-screen>`;
}).resolve();

window.router.on('/result', () => {
    $change.innerHTML = `<result-screen></result-screen>`;
}).resolve();

window.router.on('/login', () => {
    $change.innerHTML = '<login-screen></login-screen>';
}).resolve();

window.router.on('/register', () => {
    $change.innerHTML = '<register-screen></register-screen>';
}).resolve();

window.router.notFound(() => {
    $change.innerHTML = 'Không tìm thấy trang này';
});