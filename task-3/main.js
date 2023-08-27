let input = document.querySelector('.chat_sent-message')
let btn = document.querySelector('.chat_sent-btn')
let dialogWindow = document.querySelector('.dialog')
let clientMessage = document.querySelector('.client-message')
let geoBtn = document.querySelector('.geo-location-isHide')

const serverUrl = "wss://echo-ws-service.herokuapp.com/"
let websocket
btn.addEventListener('click', () => {
    if (!websocket || websocket.readyState !== WebSocket.OPEN) {
        websocket = new WebSocket(serverUrl)
        websocket.onopen = function (event) {
            console.log('Соедение установлено')
            let message = input.value
            websocket.send(message)
        }
        websocket.onmessage = function (event) {
            console.log(event.data)
            const message = event.data
            clientWrite(message)
            serverWrite(message)
            input.value = ''
            if (geoBtn.style.display = 'none') {
                geoBtn.style.display = 'block'
            }
        }
        websocket.onerror = function (event) {
            console.log(event.onerror)
        }
        websocket.onclose = function (event) {
            console.log("DISCONNECTED")
        }

    } else {
        let message = input.value
        websocket.send(message)
    }


})

geoBtn.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                let mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
                clientWrite(mapLink)
            }, error => {
                console.error('Ошибка геолокации', error)
            })
    }else{
        console.log('Геолакация не поддерживается')
    }
})

function serverWrite(str) {
    let serverMessage = document.createElement('p')
    serverMessage.innerHTML = str
    serverMessage.classList.add('server-message', 'window')
    dialogWindow.appendChild(serverMessage)

}

function clientWrite(str) {
    let clientMessage = document.createElement('p')
    if(str.startsWith('https://')){
        let link = document.createElement('a')
        link.href = str
        link.target = '_blank'
        link.textContent = 'Геолация'
        clientMessage.appendChild(link)
    }else{
        clientMessage.innerHTML = str
    }
    clientMessage.classList.add('client-message', 'window')
    dialogWindow.appendChild(clientMessage)
}





