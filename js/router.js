const root = null;
const useHash = true; // Defaults to: false
const hash = "#"; // Defaults to: '#'
window.router = new Navigo(root, useHash, hash);

const $app = document.getElementById('change');

window.router.on('/start', () => {
    $app.innerHTML = `<start-screen></start-screen>`;
}).resolve();

window.router.on('/play', () => {
    $app.innerHTML = `<play-screen></play-screen>`;
}).resolve();

window.router.on('/admin', () => {
    $app.innerHTML = `<admin-screen></admin-screen>`;
}).resolve();

window.router.on('/result', () => {
    $app.innerHTML = `<result-screen></result-screen>`;
}).resolve();