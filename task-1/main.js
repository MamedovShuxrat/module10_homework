const btn = document.querySelector('.btn')
const svgCircle = document.querySelector('.svg_is-fill')

btn.addEventListener('click', ()=>{
    svgCircle.classList.toggle('isToggle')
})