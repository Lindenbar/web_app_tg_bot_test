let tg = window.Telegram.WebApp;

tg.expand();

let buttons = document.getElementsByTagName('button');
let callback = undefined;
let p = document.getElementsByTagName('p');

[...buttons].forEach(button => {
    button.onclick = () => {
        callback = button.getAttribute('tg_callback');
        p.innerHTML = callback;
    }
});

tg.onEvent("mainButtonClicked", () => {
   tg.sendData(callback)
});