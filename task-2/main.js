const btn = document.querySelector('.btn')

function screenSize(){
    let screenW = window.innerWidth
    let screenH = window.innerHeight

    alert(`Размеры вашего экрана: по ширине ${screenW}px, по высоте ${screenH}px`)
}

btn.addEventListener('click', screenSize)