/*(function() {

    let navbarToggler = document.querySelector('#navbarToggler')
    let navbar = document.querySelector('#navbar')
    console.log('tlacitko', navbarToggler)
    console.log('navigace', navbar)

    navbarToggler.addEventListener('click', function(e) {
        navbar.classList.toggle('menu-show')
        e.stopPropagation()
        console.log('kliknuto')
    })

    document.addEventListener('click', function() {
        navbar.classList.remove('menu-show')
    })

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 27) {
            // 27 je escape
            navbar.classList.remove('menu-show')
        }
    })
})()*/

function myFunction(x) {
    x.classList.toggle("change")

    let navbarToggler = document.querySelector('#navbarToggler')
    let navbar = document.querySelector('#navbar')

    navbarToggler.addEventListener('click', function(e) {
        navbar.classList.toggle('menu-show')
        e.stopPropagation()
        console.log('kliknuto')
    })

    document.addEventListener('click', function() {
        navbar.classList.remove('menu-show')
    })

}