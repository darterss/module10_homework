const btn = document.querySelector('button')

btn.addEventListener('click', () => {
    alert(`
    Ширина экрана: ${window.screen.width} px
    Высота экрага: ${window.screen.height} px
    `)
})