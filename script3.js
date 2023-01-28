const url = 'wss://echo-ws-service.herokuapp.com';
const inputMess = document.querySelector('#input');
const btnSend = document.querySelector('#button_send');
const btnGeo = document.querySelector('#button_geo');
const resultDiv = document.querySelector('.result');
let websocket;
let textAnchor;

document.addEventListener('DOMContentLoaded', () => {
    websocket = new WebSocket(url);
    /*websocket.onopen = function(evt) {
        resultDiv.innerHTML += `CONNECTED`;
    };
    websocket.onclose = function(evt) {
        resultDiv.innerHTML += `DISCONNECTED`;
    };*/
    websocket.onmessage = function(evt) {
        writeResultServer(evt.data);
    };
    websocket.onerror = function(evt) {
        resultDiv.innerHTML = `ERROR: ${evt.data}`;
    };
});
function writeResultClient(message){
    resultDiv.innerHTML += `<div class = 'div_client'>${message}</div>`
}
function writeResultServer(message){
    if (message !== textAnchor)
        resultDiv.innerHTML += `<div class = 'div_server'>${message}</div>`
}
btnSend.addEventListener('click', () => {
    const message = inputMess.value;
    writeResultClient(message);
    websocket.send(message);
});
btnGeo.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            textAnchor = `https://www.openstreetmap.org/#map=12/${coords.latitude}/${coords.longitude}`;
            resultDiv.innerHTML += `
                <div class="div_client">
                    <a href=${textAnchor} target='_blank'>${textAnchor}</a>
                </div>`;
            websocket.send(textAnchor);
        });
    }
})
