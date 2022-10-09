let tg = window.Telegram.WebApp;

tg.expand();

let buttons = document.getElementsByTagName('button');
let callback = undefined;
let p = document.getElementsByTagName('p');
tg.MainButton.show();

[...buttons].forEach(button => {
    button.onclick = () => {
        callback = button.getAttribute('tg_callback');
        p.innerHTML = callback;
    }
});

Telegram.WebApp.onEvent("mainButtonClicked", () => {
   tg.sendData(callback);
});
